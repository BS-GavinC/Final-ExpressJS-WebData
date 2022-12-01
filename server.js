require('dotenv').config()
const express = require('express')
const router = require('./routers/router')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(router)



app.listen(process.env.PORT)