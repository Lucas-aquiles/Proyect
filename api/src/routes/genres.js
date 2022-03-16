const axios = require('axios');
const server = require("express").Router();

const { Videogame, Genders, Intermedio } = require('../db');






server.get('/', async (req, res) => {
    ruta = "https://api.rawg.io/api/genres?key=9f6776564ff3496c9da52ae39b57a613";
    const dateEsperada = await axios.get(ruta);
    const dateMapeada = dateEsperada.data.results
    const apiDat = dateMapeada.map(el => {
        return {
            name: el.name,
        }
    });

    apiDat.forEach(el => {
        Genders.findOrCreate({
            where: { name: el.name }
        })
    })
    const allGenders = await Genders.findAll();
    res.status(200).send(allGenders);
})


module.exports = server;