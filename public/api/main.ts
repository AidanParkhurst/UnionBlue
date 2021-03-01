const path = require('path')

const inventory = require('./data/items.json')

const express = require('express')
const app = express()
const PORT = 3001

const cors = require('cors')
const bodyParser = require('body-parser')

app.get('/api/items', cors(), (req,res) => {
  res.send(inventory.items)
})

app.use(bodyParser.json());

app.post('/api/contact', (req, res) => {
  const itemName = req.body
  console.log(itemName)
})

app.use('/img', express.static(path.join(__dirname,'/img')))

app.listen(PORT, () => {
  console.log(`API listening on ${PORT}`)
})

