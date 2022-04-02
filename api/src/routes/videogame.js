require('dotenv').config();

const axios = require('axios');
const server = require("express").Router();

const {
    API_KEY
} = process.env;
const { gamesNameAll, gamesAll, getDbInfo, getAllVideoGames, createVideoGamesValidation } = require("./function");

const { Videogame, Genders, Intermedio } = require('../db');





server.get('/plat', async (req, res, next) => {

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
    } catch (err) {
        next(err);
        // console.log(err)
        // res.status(500).send('Ocurrio un error')

    }



})

server.get('/', async (req, res, next) => {

    const name = req.query.name
    try {
        let videogames = await getAllVideoGames()

        if (name) {
            let videogameBd = await getDbInfo(); // me trae los juegos de bd 

            let videoNameBd = videogameBd.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
            if (videoNameBd.length === 1) { return res.status(200).send(videoNameBd) };

            let total = await gamesNameAll(name);// me trae los juegos de api
            console.log(total)
            if (total) { res.status(200).send(total) }

        } else { res.status(200).json(videogames) }
    } catch (err) {
        next(err);
        // console.log(err)
        // res.status(500).send('Ocurrio un error')

    }



});

server.post('/', async (req, res, next) => {
    try {
        const resultado = await createVideoGamesValidation(req.body);
    } catch (error) {
        return res.status(200).send("error")
    }

    try {
        let { name, description, rating, released, platforms, createdInBd, genres } = req.body;
        let nameChange = name.trim().charAt().toLocaleUpperCase() + name.trim().slice(1,)
        // if (name === " " || description === " " || rating === " " || released === " " || platforms === [] || genres === []) {
        //     return res.status(404).send("No se enviaron datos")
        // }

        if (nameChange) {
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
            res.status(200).send("Creado con exitooooo");


        }
    } catch (err) {
        // console.log(err)
        // res.status(500).send('Ocurrio un error en el post')
        next(err);
    }

});



server.get('/:id', async (req, res, next) => {



    const id = req.params.id;
    try {
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
    } catch (err) {
        // console.log(err)
        // res.status(500).send('Ocurrio un error')
        next(err);
    }
})




function handleErrors(err, req, res, next) {
    console.log(err);
    res.status(500).send('Something broke!');
};


server.use(handleErrors)
// server.use((error, req, res, next) => {
//     res.status(400).json({
//         status: "error",
//         message: error.message,
//     });
// });


module.exports = server;