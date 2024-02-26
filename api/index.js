require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const searchRoutes = require('./routes/search');

const app = express();
const port = process.env.PORT || 4000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.get('/', (req, res) => {
      res.send('Hello There, API is up and running!')
    });

    app.get('/:id', (req, res) => { 
        res.send(`<h1>${req.params.id}</h1>`); 
    }); 

    app.use('/search', searchRoutes);

    app.listen(port, () => {
      console.log(`\nBTECH image id finder app listening on port ${port} and successfully connected to MongoDB!${process.env.MONGODB_URI}\n`)
    });
  })
  .catch(err => console.error(err));
