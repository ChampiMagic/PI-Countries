const { Router } = require('express');
// Importar todos los routers;
const countriesRoutes = require('./countries.js');
const activitiesRoutes = require('./activities.js');


const router = Router();

// Configurar los routers
router.use('/countries', countriesRoutes);
router.use('/activities', activitiesRoutes);

module.exports = router;
