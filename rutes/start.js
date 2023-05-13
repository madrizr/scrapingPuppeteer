const { Router } = require('express');
const scraper  = require('../controllers/scraper')

const start = Router()


start.get('/', scraper);

module.exports = start