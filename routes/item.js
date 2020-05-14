const router = require('express').Router();
const itemController = require('../controllers/itemController');
const multer = require('multer');
const multerConfig = require('../config/multer');

router.post('/', multer(multerConfig).array("imagens"), itemController.cadastrarItem);
router.get('/', itemController.buscarTodosItens);
router.get('/:id', itemController.buscarItem);
router.put('/edit/:id', multer(multerConfig).array("imagens"), itemController.atualizarItem);
router.put('/deactivate/:id', itemController.desativarItem);

module.exports = router;