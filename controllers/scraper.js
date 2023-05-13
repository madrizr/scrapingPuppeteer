const { response } = require('express');
const titles = require('../json/titles.json')
const Errores = { 
    ErrorInesperado: {ok: false, msg: 'error inesperado'}
}

const scraper = async (req, res = response) => {

    try{
        
        res.json({
            ok: true,
            titles
        })

    }catch(error){
        console.log(error);
        res.status(500).json(Errores.ErrorInesperado)
    }
}

module.exports = scraper;