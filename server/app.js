const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

// Load env
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// Sample route
app.get('/', (req, res) => {
  res.send('Architect App API is live')
})

module.exports = app
