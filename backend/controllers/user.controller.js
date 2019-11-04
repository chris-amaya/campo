const User = require('../models/user.model');
const JWT  = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const errors = [];
function userSignUp(req, res) {
    const body = req.body;
    // console.log(body);

    validateEmail(body.email);

    if(errors.length > 0) {
        // responder false y / error
        res.status(401).json({
            msg: 'error en los datos enviados',
            status: false,
            errors: this.errors
        })
    } else {

        let user = new User({
            firstName: body.firstName,
            lastName: body.lastName,
            password: bcrypt.hashSync(body.password, 10),
            email: body.email,
            role: body.role
        })

        user.save((err, user) => {

            if(err) {
                console.error(err);
                return res.status(401).json({
                    msg: 'error en el registro',
                    status: false
                })
            } else {
                // TODO: enviar token
                let token = JWT.sign({
                    user
                }, process.env.SEED, {expiresIn: process.env.TOKEN_EXPIRATION})

                res.json({
                    msg: 'usuario registrado correctamente',
                    status: 'ok',
                    user,
                    token
                })
                
            }

        });
    }
}

function login(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    console.log({
        email,
        password
    })

    User.findOne({email}, (err, userDB) => {
        // console.log(userDB)
        if(err) {
            return res.status(501).json({
                msg: 'error al procesar el login',
                status: false
            })
        } else if(!userDB) {
            return res.status(404).json({
                msg: 'usuario o contraseña incorrectos',
                status: false
            })
        } else if(userDB) {

            if(bcrypt.compareSync(password, userDB.password)) {
                let token = JWT.sign({
                    userDB
                }, process.env.SEED, {expiresIn: process.env.TOKEN_EXPIRATION})
                res.json({
                    status: 'ok',
                    userDB,
                    token
                })
            } else {
                return res.status(404).json({
                    msg: 'usuario o contraseña incorrectos'
                })
            }
        }
    })
}

function checkEmail(req, res) {
    // req.body.params
    const email = req.params.email;
    User.findOne({email}, (err, user) => {
        if(err) {
            console.error(err);
        } else if(user) {
            res.status(403).json({
                msg: 'correo existente',
                status: false
            })
        } else {
            res.json({
                status: true
            })
        }
    })
}
 

function validateEmail(email) {
    if(email.lenght == 0 || email == '') {
        errors.push('El email es obligatorio');
    }

    if (!/^(?!.*[Ã±Ã‘])(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
    {  
       errors.push('por favor escribe un email válido'); 
    }

    User.findOne({email}, (err, email) => {
        if(email) {
            errors.push('ya se ha registrado anteriormente con el mismo correo, puede intentar ingresar con el ya registrado o crear una nueva cuenta con otro correo')
        }
    })
}

const EXCLUDE_PARAM_PASSWORD = 'firstName lastName email estado'

function example(req, res) {
    
}

module.exports = {
    userSignUp, 
    checkEmail,
    example,
    login
}