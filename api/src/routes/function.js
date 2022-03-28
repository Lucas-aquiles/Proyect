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
            genres: el.genres.map(e => e.name).join(" , ")
        }
    });
    return apiData;

}
// const gamesAll = () => {

//     let pagApi = [];
//     for (let i = 1; i <= 5; i++) {
//         var ruta = `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`
//         const apiUrl = axios.get(ruta, { responseType: 'json' });
//         const apiResult = apiUrl.then((res) => res.data.results.map(el => {
//             return {
//                 id: el.id,
//                 name: el.name,
//                 img: el.background_image,
//                 rating: el.rating,
//                 genres: el.genres.map((g) => g.name).join(" , "),
//                 platforms: el.platforms.map((p) => p.platform.name).join(", "),
//             }
//         }));
//         pagApi = pagApi.concat(apiResult)
//     }
//     console.log(pagApi)

//     return Promise.all(pagApi).then(r => r)
// };


const gamesAll = async () => {
    try {
        let pagApi = [];
        for (let i = 1; i <= 5; i++) {
            var ruta = `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`
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
        res.sendStatus(400).json({ message: "ERROR: GAME NOT FOUNT" });

    }



}


const getAllVideoGames = async () => {
    const apiInfo = await gamesAll();
    const dbInfo = await getDbInfo();
    const infoAll = apiInfo.concat(dbInfo)
    return infoAll;
}

module.exports = {
    gamesNameAll,
    gamesAll,
    getDbInfo,
    getAllVideoGames

};