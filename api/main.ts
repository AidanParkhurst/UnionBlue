const path = require('path')

const inventory = require('./data/items.json')
let products = inventory

const contactData = require('./data/contacts.json')
let contacts = contactData

const express = require('express')
const app = express()
const PORT = 3001

const cors = require('cors')
const bodyParser = require('body-parser')

const auth = require('./auth.json')
const nodemailer = require('nodemailer')

const {nanoid} = require('nanoid')

const bcrypt = require('bcrypt')
const {encode, decode} = require('jwt-simple')
const JWT_ALGORITHM = "HS512"

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

const createToken = () => {
  const issued = Date.now()
  const thirtyMins = 30 * 60 * 1000
  const expires = issued + (thirtyMins)
  const data = {
    "status": "admin",
    issued: issued,
    expires: expires
  }
  return encode(data, auth.data.jwtSig, JWT_ALGORITHM)
}

const verifyToken = (token) => {
  if(!token) {
    return false
  }
  try {
    let result = decode(token, auth.data.jwtSig, false, JWT_ALGORITHM)
    let now = Date.now()
    return (result.expires > now)
  }
  catch (_e) {
    return false
  }
}

app.get('/api/inventory', cors(), (req,res) => {
  res.send(products)
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
  let token = addData.token
  if (!verifyToken(token)) {
    return res.status(403).send('Invalid token')
  }
  
  let product = products.find((x) => {return x.id == addData.productId})
  if(!product) {
    return res.status(409).send('Error adding item: Could not find product type')
  }
  let prevLen = product.items.length

  let newId = nanoid(8)

  product.items.push({
    'id': newId,
    'name': addData.name,
    'desc': addData.desc,
    'img': addData.img
  })
  contacts[newId] = addData.contact

  if(prevLen < product.items.length) {
    res.send('Item added!')
  } else {
    res.status(409).send('Could not add item')
  }
})

app.post('/api/editItem', (req, res) => {
  const editData = req.body
  let token = editData.token
  if (!verifyToken(token)) {
    return res.status(403).send('Invalid token')
  }

  let product = products.find((x) => {return x.id == editData.productId})
  if(!product) {
    return res.status(409).send('Error editing item: Could not find product type')
  }
  let edited = false

  for(let i of product.items) {
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
  let token = deleteData.token
  if (!verifyToken(token)) {
    return res.status(403).send('Invalid token')
  }

  let product = products.find((x) => {return x.id == deleteData.type})
  if(!product) {
    return res.status(409).send('Error deleting item: Could not find product type')
  }
  let prevLen = product.items.length

  product.items = product.items.filter((x) => {return x.id !== deleteData.id})
  
  if(prevLen > product.items.length) {
    res.send('Item deleted!')
  } else {
    res.status(409).send('Could not find item')
  }
})

app.post('/api/login', (req, res) => {
  const loginData = req.body
  bcrypt.compare(loginData.pass, auth.data.adminKey, function(err, result) {
    if (result) {
      const adminToken = createToken()
      res.status(201).json(adminToken)
    }
    else {
      res.status(403).send('Invalid pass')
    }
  })
})

app.use('/img', express.static(path.join(__dirname,'/img')))

app.listen(PORT, () => {
  console.log(`API listening on ${PORT}`)
})

