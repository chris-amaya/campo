const mongoose = require('mongoose');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'SELLER_ALONE_ROLE', 'SELLER_TEAM_ROLE', 'BUYER_ROLE'],
    message: '{VALUE} no es un rol válido'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    lastName: {
        type: String,
        required: [false, 'El apellido es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    role: {
        type: String,
        enum: rolesValidos,
        required: [true, 'el rol es obligatorio'],
    },
    estado: {
        type: Boolean,
        default: true
    },
    pic: {
        type: String,
        default: '/uploads/default-user.png'
    },

    facebook: {
        required:false,
        type: Boolean
    },

    google: {
        required: false,
        type: Boolean
    },

    phone: {
        type: String,
        required: false
    },
    Opinions: {
        type: Number,
        required: false
    },
    url: {
        type: String,
        required: [true, 'la url del usuario es obligatoria']
    },
    address: {
        type: Object,
        required: false
    },
    // cp: {
    //     type: Number,
    //     required: false
    // },
});

usuarioSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}


module.exports = mongoose.model('User', usuarioSchema);