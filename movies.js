import express from 'express';
// import { StatusCodes } from 'http-status-codes';
import axios from 'axios'
import { load } from 'cheerio'
import consts from './consts.js'

let router = express.Router()

async function get_imdb_top_movies(req, res) {
    const response = await axios.get(consts.IMDB_TOP_MOVIES_URL, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'
        }
       })
    const html = response.data
    const $ = load(html)
    const topGamesList = []
    $('.ipc-title-link-wrapper', html).map((i, elem) => {
        const titleAndRank = elem.children[0].children[0].data
        const splitString = titleAndRank.split(' ');
        const rank = parseInt(splitString[0].replace('.', ''), 10);
        const title = splitString.slice(1).join(' ');
        topGamesList.push({
            "title": title,
            "rank": rank
        })
    })
    res.send(topGamesList)
}

router.get('/top/imdb', (req, res) => { get_imdb_top_movies(req, res) })

export default router;