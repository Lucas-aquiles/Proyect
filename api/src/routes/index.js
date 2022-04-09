
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







module.exports = router;
