const express = require('express')
const app = express()
const test = require('./routes/test')
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello There, API is up and running!')
})
app.get('/:id', (req, res) => { 
    res.send(`<h1>${req.params.id}</h1>`); 
}); 
app.use('/user', test);


app.listen(port, () => {
  console.log(`BTECH image id finder app listening on port ${port}`)
})