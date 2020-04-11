const router = require('express').Router();
const loginController = require('../controllers/loginController');
const tokenController = require('../controllers/tokenController');

router.post('/', tokenController.validation, loginController.login);

module.exports = router;