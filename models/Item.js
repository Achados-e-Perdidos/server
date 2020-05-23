const mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

ItemSchema.virtual('_user', {
    ref: 'User', // The model to use
    localField: 'user', // Find people where `localField`
    foreignField: 'id', // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: true,
  });

module.exports = mongoose.model('Item', ItemSchema)