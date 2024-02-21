const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello There, API is up and running!')
})


app.listen(port, () => {
  console.log(`BTECH image id finder app listening on port ${port}`)
})