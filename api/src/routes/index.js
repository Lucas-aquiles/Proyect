
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');




const videoGameRouter = require('./videogame.js');
const gendersRouter = require('./genres.js');
const router = Router()


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', videoGameRouter)
router.use('/genres', gendersRouter)



// Obtener todos los tipos de géneros de videojuegos posibles
// En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
//  https://api.rawg.io/api/genres?key=9f6776564ff3496c9da52ae39b57a613






// [ ] POST /videogame:
// Recibe los datos recolectados desde el formulario controlado
//  de la ruta de creación de videojuego por body
// Crea un videojuego en la base de datos

// ] Un formulario controlado con JavaScript con los siguientes campos:
// Nombre
// Descripción
// Fecha de lanzamiento
// Rating
// [ ] Posibilidad de seleccionar/agregar varios géneros
// [ ] Posibilidad de seleccionar/agregar varias plataformas




// [ X ] GET /videogames:
// Obtener un listado de los primeras 15 videojuegos
// Debe devolver solo los datos necesarios para la ruta principal
// server.get("/", async (req, res, next) => {
//     try {
//         const gamesDbAll = await Videogame.findAll({ include: [Genre] });
//         const select = gamesDbAll.map((e) => {
//             return {
//                 id: e.id,
//                 name: e.name,
//                 description: e.description,
//                 rating: e.rating,
//                 platforms: e.platforms,
//                 released: e.released,
//                 genres: e.genres.map((g) => g.name).join(", "),
//                 source: "Created",
//             };
//         });
//         let gamesApi;
//         let pagesApi = [];
//         for (let i = 1; i <= 5; i++) {
//             await axios
//                 .get(`${GAMES_ALL}?key=${API_KEY}&page=${i}`)
//                 .then((g) => {

//                     gamesApi = g.data.results.map((game) => {
//                         return {
//                             id: game.id,
//                             name: game.name,
//                             image: game.background_image,
//                             rating: game.rating,
//                             released: game.released,
//                             platforms: game.platforms.map((p) => p.platform.name).join(", "),
//                             genres: game.genres.map((g) => g.name).join(", "),
//                             source: "Api",
//                         };
//                     });
//                     pagesApi = pagesApi.concat(gamesApi);
//                 })
//                 .catch((err) => next(err));
//         }


//         res.status(200).send([...pagesApi, ...select]);
//     } catch (err) {
//         next(err);
//     }
// });





module.exports = router;
// previous
// next 
// https://api.rawg.io/api/games?key=9f6776564ff3496c9da52ae39b57a613
// https://api.rawg.io/api/games?key=9f6776564ff3496c9da52ae39b57a613&page=2
// https://api.rawg.io/api/games?key=9f6776564ff3496c9da52ae39b57a613&page=3
// https://api.rawg.io/api/games?key=9f6776564ff3496c9da52ae39b57a613&page=4