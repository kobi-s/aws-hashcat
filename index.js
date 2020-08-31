require('dotenv').config()
require('express-async-errors')
const express = require('express')
const error = require('./middlewares/error')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 8080

app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

require('./routes/aws')(app)

app.use(error)

app.listen(port, ()=> console.log("Start server on port:", port))

// const instances = ['i-0c0db6fc977ac8fa5']
