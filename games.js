import express from 'express';
// import { StatusCodes } from 'http-status-codes';
import axios from 'axios'
import { load } from 'cheerio'
import consts from './consts.js'

let router = express.Router()

async function get_imdb_top_games(req, res) {
    const response = await axios.get(consts.IMDB_TOP_GAMES_URL)
    const html = response.data
    const $ = load(html)
    const topGamesList = []
    $('#main h3.lister-item-header a', html).map((i, elem) => {
        const title = elem.children[0].data
        topGamesList.push({
            "title": title,
            "rank": i+1
        })
    })
    res.send(topGamesList)
}

async function get_metacritic_top_games(req, res) {
    const response = await axios.get(consts.METACRITIC_TOP_GAMES_URL)
    const html = response.data
    const $ = load(html)
    const topGamesList = []
    $('.c-finderProductCard_info', html).map((i, elem) => {
        topGamesList.push({
            "title": elem.children[0].attribs["data-title"],
            "rank": i+1
        })
    })
    res.send(topGamesList)
}

router.get('/top/imdb', (req, res) => { get_imdb_top_games(req, res) })
router.get('/top/metacritic', (req, res) => { get_metacritic_top_games(req, res) })

export default router;