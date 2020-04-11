const router = require('express').Router();
const itemController = require('../controllers/itemController');

router.post('/', itemController.cadastrarItem);
router.get('/', itemController.buscarTodosItens);
router.get('/:id', itemController.buscarItem);
router.put('/edit/:id', itemController.atualizarItem);
router.put('/inactive/:id', itemController.desativarItem);

module.exports = router;