const { registerValidation } = require('../validations/validations');
const tokenController = require('../controllers/tokenController');

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
    
    const data = req.body;
    
    const {error} = registerValidation(data);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    if(data.password !== data.confirmPassword){
        res.status(400).json({"message": "Senhas não conferem"});
    }

    const emailExist = await User.findOne({email: data.email});
    if(emailExist) {
        return res.status(400).json({"message": "Email já registrado"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(data.password, salt);

    const user = new User({
        name: data.name,
        phone: data.phone,
        email: data.email,
        password: hashPassword,
        gender: data.gender,
    });

    try {
        const savedUser = await user.save();
        const token = tokenController.generateToken(savedUser);
        res.status(200).json({"token": token});
    } catch (err){
        res.status(400).json({"message": "Erro ao registrar usaurio"});
    }

}