const inventory = require('./data/items.json')

const express = require('express')
const app = express()
const PORT = 3001

const cors = require('cors')

app.get('/api/items', cors(), (req,res) => {
  res.send(inventory.items)
})

app.listen(PORT, () => {
  console.log(`API listening on ${PORT}`)
})

