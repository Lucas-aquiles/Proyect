const axios = require('axios');
const server = require("express").Router();

const { Videogame, Genders, Intermedio } = require('../db');


const gamesNameAll = async (name) => {
    var ruta = "9f6776564ff3496c9da52ae39b57a613"
    var url = `https://api.rawg.io/api/games?search=${name}}&key=${ruta}`
    const apiName = await axios.get(url, { responseType: 'json' });
    const apiResult = apiName.data.results

    const apiData = apiResult.map(el => {
        return {
            id: el.id,
            name: el.name,
            img: el.background_image,
            genres: el.genres.map(e => e.name).join(" , ")
        }
    });
    return apiData;

}

const gamesAll = async () => {
    // https://api.rawg.io/api/games?key=9f6776564ff3496c9da52ae39b57a613
    // https://api.rawg.io/api/games?key=9f6776564ff3496c9da52ae39b57a613&page=2
    let pagApi = [];
    for (let i = 1; i <= 5; i++) {
        var ruta = `https://api.rawg.io/api/games?key=9f6776564ff3496c9da52ae39b57a613&page=${i}`
        const apiUrl = await axios.get(ruta, { responseType: 'json' });
        const apiResult = apiUrl.data.results
        apiData = apiResult.map(el => {
            return {
                id: el.id,
                name: el.name,
                img: el.background_image,
                rating: el.rating,
                genres: el.genres.map((g) => g.name).join(" , "),
                platforms: el.platforms.map((p) => p.platform.name).join(", "),
            }
        });
        pagApi = pagApi.concat(apiData)
    }

    return pagApi
};


const getDbInfo = async () => {
    const dbInfo = await Videogame.findAll({
        include: {
            model: Genders,
            attributes: ["name"],
            through: {
                attributes: [],
            },
        }
    })
    const dbInfoNew = dbInfo.map((e) => {
        return {
            id: e.id,
            name: e.name,
            description: e.description,
            rating: e.rating,
            released: e.released,
            createdInBd: e.createdInBd,
            platforms: e.platforms.map(e => e),
            genres: e.genders.map(e => e.name).join(", ")
        }
    })

    return dbInfoNew

}


const getAllVideoGames = async () => {
    const apiInfo = await gamesAll();
    const dbInfo = await getDbInfo();
    const infoAll = apiInfo.concat(dbInfo)
    return infoAll;
}




server.get('/plat', async (req, res) => {
    const getPlatfo = await gamesAll();
    const mapeo = getPlatfo.map((e) => e.platforms).join("  ")
    // const replac = mapeo.map((e) => e.replaceAll(",", ""))
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
})

server.get('/', async (req, res) => {

    const name = req.query.name
    let videogames = await getAllVideoGames()

    if (name) {
        let videogameBd = await getDbInfo(); // me trae los juegos de bd 

        let videoNameBd = videogameBd.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
        if (videoNameBd.length) { res.status(200).send(videoNameBd) };

        let total = await gamesNameAll(name);// me trae los juegos de api
        if (total) { res.status(200).send(total) } else {
            res.status(404).send("no se encontro")
        };
    } else { res.status(200).json(videogames) }



});


server.post('/', async (req, res) => {
    let { name, description, rating, released, platforms, createdInBd, genres } = req.body;
    let nameChange = name.trim().charAt().toLocaleUpperCase() + name.trim().slice(1,)

    const usuario = await Videogame.findAll({
        where: { name: nameChange }
    })
    console.log(usuario.map(e => e.toJSON()))
    //     where: {
    //         name: nameChange
    //     }
    // }


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

    } else {
        res.status(404).send("Nombre ya usado");
    }

});




server.get('/:id', async (req, res) => {

    const id = req.params.id;


    if (id.length < 7) {
        let ruta = `https://api.rawg.io/api/games/${id}?key=9f6776564ff3496c9da52ae39b57a613`;

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
})






module.exports = server;