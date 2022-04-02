require('dotenv').config();

const axios = require('axios');
const server = require("express").Router();
const {
    API_KEY
} = process.env;
const { Videogame, Genders, Intermedio } = require('../db');


const gamesNameAll = async (name) => {
    var ruta = API_KEY
    var url = `https://api.rawg.io/api/games?search=${name}}&key=${ruta}`
    const apiName = await axios.get(url, { responseType: 'json' });
    const apiResult = apiName.data.results

    const apiData = apiResult.map(el => {
        return {
            id: el.id,
            name: el.name,
            img: el.background_image,
            genres: el.genres.map(e => e.name).join(" , "),
            rating: el.rating
        }
    });
    return apiData;

}


const gamesAll = async () => {
    try {
        let pagApi = [];
        for (let i = 1; i <= 5; i++) {
            var ruta = `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`
            const apiUrl = await axios.get(ruta, { responseType: 'json' });
            //         const apiResult = apiUrl.then((res) => res.data.results.map(el => {
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
    } catch (error) {
        console.log(error);
    }
};


const getDbInfo = async () => {

    try {
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
            // dbInfo.then((r ) =>  r.map((e) =>{  } ))
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
    } catch (error) {
        console.error(error);
        res.sendStatus(400);

    }
}


const getAllVideoGames = async () => {

    try {
        const apiInfo = await gamesAll();
        const dbInfo = await getDbInfo();
        const infoAll = apiInfo.concat(dbInfo)
        return infoAll;
    } catch (error) {
        console.log(error)
    }

}

const createVideoGamesValidation = async (data) => {
    const { name } = data
    if (typeof name !== 'string') {
        throw new Error('name must be a string');
    }
    if (name.length >= 13 && /^[a-z]+$/i.test(name)) {
        throw new Error('name must be at least 13 characters long')
    }

    let nameChange = name.trim().charAt().toLocaleUpperCase() + name.trim().slice(1,)

    console.log(nameChange)
    // .trim().charAt().toLocaleUpperCase() + name.trim().slice(1,)
    const see = await Videogame.findAll({
        where: {
            name: nameChange
        }
    });
    console.log(see.length)

    if (see.length === 1) {
        throw new Error('name is repeat')
    }

}

module.exports = {
    gamesNameAll,
    gamesAll,
    getDbInfo,
    getAllVideoGames,
    createVideoGamesValidation

};