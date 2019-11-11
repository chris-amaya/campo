const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productSchema = new Schema({
    title: {
        type: String,
        required: [true, 'El titulo es necesario']
    },
    description: {
        type: String,
        required: [true, 'La descripción es necesaria']
    },
    pics: {
        type: Array,
        required: [true, 'al menos una imagen es necesaria']
    },
    prize: {
        type: Number,
        required: [true, 'El precio es necesario']
    },
    category: {
        type: Object,
        required: [true, 'La categoría es necesaria']
    },
    userInfo: {
        type: Object,
        required: [true, 'Falta la información del usuario']
    },
    mainImg: {
        type: String,
        required: [true, 'Falta de seleccionar la imagen principal']
    },
    url: {
        type: String,
        required: [true, 'Url faltante']
    }
    // author: {
    //     type: String,
    //     required: [true, 'Falta el autor']
    // },
    // _idAuthor: {
    //     required: [true, 'falta el id del autor']
    // },
    

});

module.exports = mongoose.model('Product', productSchema);