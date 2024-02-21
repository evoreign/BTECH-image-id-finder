const express = require('express');
const router = express.Router();

// localhost:3000/yo/test
router.get('/test', (req, res) => {
  console.log('test route hit');
  res.send('test route hit')
});

module.exports = router;