const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cache = require('memory-cache');
const router = express.Router();

router.use(helmet()); // Use Helmet for basic security

router.use((req, res, next) => {
  next();
});

router.get('/', (req, res) => {
  res.send('Search home page');
});

router.get('/:ImageId', async (req, res) => { 
  try {
    const imageId = String(req.params.ImageId);

    // Validate ImageId
    if (!Number.isInteger(Number(imageId)) || Number(imageId) < 0) {
      return res.status(400).json({ error: 'Invalid ImageId' });
    }

    // Check cache
    const cacheKey = `ImageId:${imageId}`;
    const cacheValue = cache.get(cacheKey);
    if (cacheValue) {
      return res.json(cacheValue);
    }

    console.log(`Searching for image ID: ${imageId}`);
    console.log(`Current database: ${mongoose.connection.db.databaseName}`);
    const models = await mongoose.connection.db.collection('image_collection_test_big')
      .find({ [`data.${imageId}`]: { $exists: true } })
      .toArray();
    console.log(`Found ${models.length} models`);
    const results = models.map(model => ({
      model: model.model,
      data: model.data[imageId]
    }));
    console.log(`Results: ${JSON.stringify(results)}`);

    // Store results in cache
    cache.put(cacheKey, results, 60000); // Cache for 1 minute

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
}); 

module.exports = router;