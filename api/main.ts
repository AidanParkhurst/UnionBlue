const path = require('path')

const inventory = require('./data/items.json')
let items = inventory.items
let start = items.length

const contactData = require('./data/contacts.json')
let contacts = contactData

const express = require('express')
const app = express()
const PORT = 3001

const cors = require('cors')
const bodyParser = require('body-parser')

const auth = require('./auth.json')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({      
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: auth.data.email,
    pass: auth.data.pass,
    clientId: auth.data.clientId,
    clientSecret: auth.data.clientSecret,
    refreshToken: auth.data.refreshToken
  }
});

app.get('/api/items', cors(), (req,res) => {
  res.send(items)
})

app.use(bodyParser.json());

app.post('/api/contact', (req, res) => {
  const emailData = req.body
  var mailOptions = {
    from: auth.data.email,
    to: contacts[emailData.id],
    subject: emailData.subject,
    text: emailData.body + '\nRespond at: ' + emailData.email
  }

  transporter.sendMail(mailOptions, function(error, info) {
    if(error) {
      res.status(409).send(error)
    } else {
      res.send('Email sent: ' + info.response)
    }
  })
})

app.post('/api/addItem', (req, res) => {
  const addData = req.body
  let prevLen = items.length
  let newId = (start++).toString()

  items.push({
    'id': newId,
    'name': addData.name,
    'desc': addData.desc,
    'img': addData.img
  })
  contacts[newId] = addData.contact

  if(prevLen < items.length) {
    res.send('Item added!')
  } else {
    res.status(409).send('Could not add item')
  }
})

app.post('/api/editItem', (req, res) => {
  const editData = req.body
  let edited = false

  for(let i of items) {
    if(i.id == editData.id) {
      i.name = editData.name || i.name
      i.img = editData.img || i.img
      i.desc = editData.desc || i.desc
      contacts[i.id] = editData.contact || contacts[i.id]
      edited = true
    }
  }
  if(edited) {
    res.send("Item edited!")
  } else {
    res.status(409).send("Could not find item")
  }
})

app.post('/api/deleteItem', (req,res) => {
  const deleteData = req.body
  let prevLen = items.length

  items = items.filter((x) => {return x.id !== deleteData.id})
  
  if(prevLen > items.length) {
    res.send('Item deleted!')
  } else {
    res.status(409).send('Could not find item')
  }
})

app.use('/img', express.static(path.join(__dirname,'/img')))

app.listen(PORT, () => {
  console.log(`API listening on ${PORT}`)
})

