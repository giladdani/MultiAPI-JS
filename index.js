const consts = require('./consts')
const axios = require('axios')
const express = require('express')
const cheerio = require('cheerio')

const app = express()
const router = express.Router()

app.get('/api/imdb/topgames', async(req, res) => {
    const response = await axios.get(consts.IMDB_TOP_GAMES_LIST_URL)
    const html = response.data
    const $ = cheerio.load(html)
    const topGamesList = []
    $('#main h3.lister-item-header a', html).map((i, elem) => {
        const title = elem.children[0].data
        topGamesList.push({
            "title": title,
            "rank": i+1
        })
    })
    res.send(topGamesList)
})

app.listen(1111, () => {
    console.log('listening on port 1111');
})