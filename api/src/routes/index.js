const { Router } = require('express');
// Importar todos los routers;
const countriesRoutes = require('./countries.js');


const router = Router();

// Configurar los routers
router.use('/countries', countriesRoutes);


module.exports = router;
