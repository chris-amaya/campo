const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let categorySchema = new Schema({
    title: {
        type: String,
        required: [true, 'El titulo es necesario']
    },
    url: {
        type: String,
        required: [true, 'La url es obligatoria']
    },
    pic: {
        type: String,
        required: [true, 'La Imagen en obligatorias']
    }

});

module.exports = mongoose.model('Category', categorySchema);