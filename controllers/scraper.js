const { response } = require('express');
// const titles = require('../json/titles.json');
const { extraerEnlacesIpadAmazon } = require('../services/scraper.service');
const Errores = { 
    ErrorInesperado: {ok: false, msg: 'error inesperado'}
}

const scraper = async (req, res = response) => {

    try{
        const titles = await extraerEnlacesIpadAmazon(5)

       return res.json({
            ok: true,
            titles
        })

    }catch(error){
        console.log(error);
        res.status(500).json(Errores.ErrorInesperado)
    }
}

module.exports = scraper;