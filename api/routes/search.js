const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.get('/', (req, res) => {
  res.send('Search home page');
});
//if you want to change db, change it in the .env file connection string to mongodb
router.get('/:ImageId', async (req, res) => { 
  const imageId = String(req.params.ImageId);
  console.log(`Searching for image ID: ${imageId}`);
  console.log(`Current database: ${mongoose.connection.db.databaseName}`);
  const models = await mongoose.connection.db.collection('image_collection_test_1')
    .find({ [`data.${imageId}`]: { $exists: true } })
    .toArray();
  console.log(`Found ${models.length} models`);
  const results = models.map(model => ({
    model: model.model,
    data: model.data[imageId]
  }));
  console.log(`Results: ${JSON.stringify(results)}`);
  res.json(results);
}); 
module.exports = router;