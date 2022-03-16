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
            genres: el.genres.map(e => e.name).join(", "),
        }
    });
    return apiData;

}



//https://api.rawg.io/api/genres&key=9f6776564ff3496c9da52ae39b57a613

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
                genres: el.genres.map((g) => g.name).join(", "),
                platforms: el.platforms.map((p) => p.platform.name).join(", "),
            }
        });
        pagApi = pagApi.concat(apiData)
    }
    return pagApi



};


const getDbInfo = async () => {
    return await Videogame.findAll({
        include: {
            model: Genders,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
}

const getAllVideoGames = async () => {
    const apiInfo = await gamesAll();
    const dbInfo = await getDbInfo();
    const infoAll = apiInfo.concat(dbInfo)
    return infoAll;
}
// router.get('/videogames?', async (req, res) => {
//     const name = req.query.name
//     let total = await gamesNameAll(name)
//     let traer = total.slice(0, 15);
//     res.status(200).send(traer)
// })


server.get('/', async (req, res) => {

    const name = req.query.name
    let videogames = await getAllVideoGames()


    if (name) {
        let videogameBd = await getDbInfo(); // me trae los juegos de bd 
        let videoNameBd = videogameBd.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
        if (videoNameBd.length) { res.status(200).send(videoNameBd) };

        let total = await gamesNameAll(name);// me trae los juegos de api
        if (total) { res.status(200).send(total); } else {
            res.status(404).send("no se encontro")
        };
    } else { res.status(200).send(videogames) }



});


server.post('/', async (req, res) => {
    let { name, description, rating, platforms, createdInBd, genres } = req.body;

    let gameCreat = await Videogame.create({
        name, description, rating, platforms, createdInBd
    })

    let generoDb = await Genders.findAll({
        where: {
            name: genres
        }
    })
    gameCreat.addGenders(generoDb)
    res.send("Games creado")
}
)
server.get('/:id', async (req, res) => {

    const id = req.params.id;
    let ruta = ` https://api.rawg.io/api/games/${id}?key=9f6776564ff3496c9da52ae39b57a613 `;

    const apiUrl = await axios.get(ruta, { responseType: 'json' });
    const obj = {
        name: apiUrl.data.name,
        description: apiUrl.data.description,
        img: apiUrl.data.background_image,
        rating: apiUrl.data.rating,
        released: apiUrl.data.released,
        platforms: (apiUrl.data.platforms.map(e => { return { name: e.platform.name } })),
        genres: (apiUrl.data.genres.map(e => { return { name: e.name } }))
    }

    res.status(200).send(obj)


})





module.exports = server;