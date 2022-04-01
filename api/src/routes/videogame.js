require('dotenv').config();

const axios = require('axios');
const server = require("express").Router();
const {
    API_KEY
} = process.env;
const { gamesNameAll, gamesAll, getDbInfo, getAllVideoGames } = require("./function");

const { Videogame, Genders, Intermedio } = require('../db');

server.get('/plat', async (req, res) => {

    try {
        const getPlatfo = await gamesAll();
        const mapeo = getPlatfo.map((e) => e.platforms).join("  ")
        const casi = mapeo.replaceAll(",", " ").split("  ")
        let newe = []
        for (let i = 0; casi.length > i; i++) {
            for (let j = 1; casi.length >= j; j++) {
                if (casi[i] === casi[j]) {
                    if (!newe.includes(casi[i])) {
                        newe.push(casi[i])
                    }
                }
            }
        }
        res.status(200).json(newe)

    } catch (error) {
        res.status(400)
    }

})

server.get('/', async (req, res) => {

    const name = req.query.name
    let videogames = await getAllVideoGames()
    try {
        if (name) {
            let videogameBd = await getDbInfo(); // me trae los juegos de bd 

            let videoNameBd = videogameBd.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
            if (videoNameBd.length === 1) { return res.status(200).send(videoNameBd) };

            let total = await gamesNameAll(name);// me trae los juegos de api
            if (total) { res.status(200).send(total) } else {
                res.status(404).send("no se encontro")
            };
        } else { res.status(200).json(videogames) }


    } catch (error) {
        res.status(404).send("error")

    }
});


server.post('/', async (req, res) => {
    let { name, description, rating, released, platforms, createdInBd, genres } = req.body;

    if (name === " " || description === " " || rating === " " || released === " " || platforms === [] || genres === []) {
        return res.status(404).send("No se enviaron datos")
    }

    try {
        let nameChange = name.trim().charAt().toLocaleUpperCase() + name.trim().slice(1,)
        const usuario = await Videogame.findAll({
            where: { name: nameChange }
        })

        // responder al usuario 

        if (usuario.length === 0) {
            let gameCreat = await Videogame.create({

                name: nameChange,
                description: description,
                released: released,
                rating: rating,
                platforms: platforms,
                createdInBd
            })
            let generoDb = await Genders.findAll({
                where: {
                    name: genres
                }
            })

            await gameCreat.addGenders(generoDb)
            res.status(200).send("Creado con exito");
            //mla practica , cambiar el status


        } else { res.status(200).send("Otro video games tiene ese nombre") }
        // cambiar el status a estado error 
        // no entra el en cathc


    } catch (error) {
        console.error(error)
        res.status(404)

    }


});





server.get('/:id', async (req, res) => {

    try {

        const id = req.params.id;

        if (id.length < 7) {
            let ruta = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`;

            const apiUrl = await axios.get(ruta, { responseType: 'json' });
            if (apiUrl) {
                const obj = {
                    name: apiUrl.data.name,
                    description: apiUrl.data.description.replace(/(<([^>]+)>)/ig, ''),
                    img: apiUrl.data.background_image,
                    rating: apiUrl.data.rating,
                    released: apiUrl.data.released,
                    platforms: (apiUrl.data.platforms.map((p) => p.platform.name).join(" , ")),
                    genres: (apiUrl.data.genres.map(e => e.name).join(" , ")),
                }
                res.status(200).json(obj)
            }
        }

        if (id.length > 7) {
            let infoBd = await getAllVideoGames()
            const idBd = infoBd.filter(e => e.id === id)

            if (idBd) {
                const objBd = {
                    name: idBd[0].name,
                    description: idBd[0].description,
                    rating: idBd[0].rating,
                    released: idBd[0].released,
                    platforms: (idBd[0].platforms.map((p) => p)).join(", "),
                    genres: (idBd[0].genres)
                }
                res.status(200).send(objBd)
            }
        }
    } catch (error) {
        console.error(error);

    }
})

module.exports = server;