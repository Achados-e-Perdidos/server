const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    }, 
    categoria: {
        type: Number,
        required: true
    },
    descricao: {
        type: String,
        required: true
    }, 
    dataAchadoPerdido: {
        required: true,
        type: Date,
    },
    imagens: {
        type: [],
    },
    isAtivo: {
        type: Boolean,
        default: true,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model('Item', ItemSchema)