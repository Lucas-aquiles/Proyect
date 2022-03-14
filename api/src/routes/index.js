const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Videogame, Genders } = require('../db')

const router = Router();





// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



const gamesAll = async () => {
    var ruta = "https://api.rawg.io/api/games?key=9f6776564ff3496c9da52ae39b57a613"
    const apiUrl = await axios.get(ruta, { responseType: 'json' });
    const apiResult = apiUrl.data.results

    const apiData = apiResult.map(el => {
        return {
            id: el.id,
            name: el.name,
            img: el.background_image,
            genres: el.genres.map(e => { return { id: e.id, name: e.name } })
        }
    });
    return apiData;

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


router.get('/videogames', async (req, res) => {
    const name = req.query.name
    let videogames = await getAllVideoGames();
    if (name) {
        let videoName = await videogames.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        videoName.length ?
            res.status(200).send(videoName) :
            res.status(404).send("no esta el video Juegos")
    } else {
        res.status(200).send(videogames)
    }

})

// router.get('/', async (req, res) => {
//     let espera = await todosVJ()
//     res.json(espera)
// })

router.get('/', (req, res) => {
    let espera = gamesAll()
    res.json((espera))

})


// [ ] GET /videogames:
// Obtener un listado de los videojuegos
// Debe devolver solo los datos necesarios para la ruta principal
// [ ] GET /videogames?name="...":
// Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
// Si no existe ningún videojuego mostrar un mensaje adecuado
// [ ] GET /videogame/{idVideogame}:
// Obtener el detalle de un videojuego en particular
// Debe traer solo los datos pedidos en la ruta de detalle de videojuego
// Incluir los géneros asociados
// [ ] GET /genres:
// Obtener todos los tipos de géneros de videojuegos posibles
// En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
// [ ] POST /videogame:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
// Crea un videojuego en la base de datos








module.exports = router;


