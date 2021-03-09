const path = require('path')

const inventory = require('./data/items.json')

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
  res.send(inventory.items)
})

app.use(bodyParser.json());

app.post('/api/contact', (req, res) => {
  const emailData = req.body
  var mailOptions = {
    from: auth.data.email,
    to: 'bboccsgo@gmail.com',
    subject: emailData.subject,
    text: emailData.body + '\nRespond at: ' + emailData.email
  }

  transporter.sendMail(mailOptions, function(error, info) {
    if(error) {
      res.error(error)
    } else {
      res.send('Email sent: ' + info.response)
    }
  })
})

app.use('/img', express.static(path.join(__dirname,'/img')))

app.listen(PORT, () => {
  console.log(`API listening on ${PORT}`)
})

