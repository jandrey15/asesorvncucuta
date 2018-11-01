const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
require('dotenv').config()
const Mailchimp = require('mailchimp-api-v3')

const next = require('next')
const routes = require('./routes')
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handler = routes.getRequestHandler(app)
const port = process.env.PORT || 8080

const listId = process.env.LISTID || '12345'
const apiKey = process.env.API_KEY || '12345'
// const dc = apiKey.split('-')[1]
const mailchimp = new Mailchimp(apiKey)

// const { createServer } = require('http')
app.prepare().then(() => {
  const server = express()

  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: false }))

  server.post('/api/contact', (req, res) => {
    const url = 'https://www.google.com/recaptcha/api/siteverify'
    const recaptchaResponse = req.body['g-recaptcha-response']
    // console.log(recaptchaResponse)

    request.post(
      url,
      {
        form: {
          secret: process.env.SECRET_CAPTCHA,
          response: recaptchaResponse,
          remoteip: req.connection.remoteAddress
        }
      },
      function (error, response, body) {
        if (error) {
          res.status(500).send({ message: 'Algo salio mal :(', status: 500 })
        }

        body = JSON.parse(body)

        if (body.success !== undefined && !body.success) {
          return res.status(400).send({
            message: 'Captcha fallo recarga el sitio web.',
            status: 400
          })
        }

        mailchimp
          .post(`/lists/${listId}/members`, {
            email_address: req.body.email,
            status: 'subscribed',
            merge_fields: {
              FNAME: req.body.firstName,
              LNAME: ''
            }
          })
          .then(function (results) {
            // console.log(results)
            if (results.statusCode < 300) {
              res
                .status(200)
                .send({ message: 'Gracias por subscribirse.', status: 200 })
            } else {
              res.status(400).send({
                message: 'Algo salio mal intentalo mas tarde.',
                status: 400
              })
            }
          })
          .catch(function (err) {
            // console.log(err)
            if (err.status === 400) {
              res.status(400).send({
                message: 'El Correo electrónico ya existe.',
                status: 400
              })
            } else {
              res
                .status(500)
                .send({ message: 'Algo salio mal :(', status: 500 })
            }
          })
      }
    )
  })

  server.get('*', (req, res) => {
    return handler(req, res)
  })
  // createServer(handler).listen(port)

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
