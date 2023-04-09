const consts = require('./consts')
const axios = require('axios')
const express = require('express')
const cheerio = require('cheerio')

const app = express()
const router = express.Router()

app.listen(1111, () => {
    console.log('listening on port 1111');
})