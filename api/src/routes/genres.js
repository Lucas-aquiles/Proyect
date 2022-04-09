
require('dotenv').config();
const {
    API_KEY
} = process.env;

const axios = require('axios');
const server = require("express").Router();

const { Genders } = require('../db');



server.get('/', async (req, res) => {
    try {

        ruta = `https://api.rawg.io/api/genres?key=${API_KEY}`;
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

        res.status(200).json(allGenders);

    } catch (error) {
        res.status(400).send("error");
    }

})


module.exports = server;