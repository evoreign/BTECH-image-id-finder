const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://kopi:kopi@cluster0.apqobqt.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB Atlas");
});

const vehicleSchema = new mongoose.Schema({
  model: String,
  data: Object, // add this line
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

router.get('/:image_id', (req, res) => {
  console.log(`Searching for image_id: ${req.params.image_id}`);
  Vehicle.find({ [`data.${req.params.image_id}`]: { $exists: true } })
    .then(vehicles => {
      console.log(`Found ${vehicles.length} vehicles`);
      res.send(vehicles.map(vehicle => `<h1>${vehicle.model}</h1>`).join(''));
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('An error occurred while retrieving vehicles');
    });
});

module.exports = router;