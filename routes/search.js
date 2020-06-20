const router = require('express').Router();
const searchController = require('../controllers/searchController');

router.get('/', searchController.buscaPorTexto);
router.get('/advanced', searchController.buscaAvancada);

module.exports = router;