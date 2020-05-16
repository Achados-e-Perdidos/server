const tokenController = require('../controllers/tokenController');
const {loginValidation} = require('../validations/validations');
const {isEmail} = require('../validations/validations');

const User = require('../models/User');
const bcrypt = require('bcryptjs');


exports.login = async (req, res) => {
    const data = req.body;

    const isComplete = loginValidation(data);
    if(isComplete.error){
        return res.status(400).send(error.details[0].message);
    }

    let user;
    if(isEmail(data.email)){
        user = await User.findOne({"email": data.email});
    }

    if(!user) {
        return res.status(404).json({"message": "Este usuário não existe"});
    }

    const validPassword = await bcrypt.compare(data.password, user.password);
    if(!validPassword){
        return res.status(404).json({"message": "Senha incorreta"});
    }

    const token = tokenController.generateToken(user);
    res.status(200).json({"token": token});
};