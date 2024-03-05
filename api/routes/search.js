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

const getImageId = (req) => {
  const imageId = String(req.params.ImageId);

  if (!Number.isInteger(Number(imageId)) || Number(imageId) < 0) {
    throw new Error('Invalid ImageId');
  }

  return imageId;
};

const getModelsFromDb = async (imageId) => {
  console.log(`Searching for image ID: ${imageId}`);
  console.log(`Current database: ${mongoose.connection.db.databaseName}`);
  const models = await mongoose.connection.db.collection('image_collection_test_big')
    .find({ [`data.${imageId}`]: { $exists: true } })
    .toArray();
  console.log(`Found ${models.length} models`);

  return models;
};

const formatResults = (models, imageId) => {
  const results = models.map(model => ({
    model: model.model,
    ImageUrl: model.ImageUrl,
    data: model.data[imageId]
  }));
  console.log(`Results: ${JSON.stringify(results)}`);

  return results;
};
router.get('/all', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const cacheKey = `allModels-page:${page}-limit:${limit}`;
    const cacheValue = cache.get(cacheKey);
    if (cacheValue) {
      return res.json(cacheValue);
    }

    // Fetch all documents from the database
    const models = await mongoose.connection.db.collection('image_collection_test_big')
      .find({})
      .skip(skip)
      .limit(limit)
      .toArray();

    // Get the total number of models
    const totalModels = await mongoose.connection.db.collection('image_collection_test_big').countDocuments();

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalModels / limit);

    // Map over the documents and only return the model, ImageUrl fields and keys of data
    const results = models.map(model => ({
      model: model.model,
      ImageUrl: model.ImageUrl,
      data: Object.keys(model.data || {})
    }));

    const response = { results, totalPages };

    cache.put(cacheKey, response, 600000); // Cache for 10 minute

    // Send the results back to the client
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/:ImageId', async (req, res) => { 
  try {
    const imageId = getImageId(req);

    const cacheKey = `ImageId:${imageId}`;
    const cacheValue = cache.get(cacheKey);
    if (cacheValue) {
      return res.json(cacheValue);
    }

    const models = await getModelsFromDb(imageId);
    const results = formatResults(models, imageId);

    cache.put(cacheKey, results, 600000); // Cache for 10 minute

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;