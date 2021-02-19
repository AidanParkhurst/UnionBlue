const inventory = require('./data/items.json')

const express = require('express')
const app = express()
const PORT = 3001

const cors = require('cors')
app.get('/api/items', cors(), (req,res) => {
  res.send(inventory.items)
})

app.use(express.urlencoded({
  extended: true
}))
app.post('/api/contact', (req, res) => {
  const itemName = req.body
  console.log(itemName)
})
app.listen(PORT, () => {
  console.log(`API listening on ${PORT}`)
})

