const User = require('../models/user.model');
const Product = require('../models/product.model');
const JWT  = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const errors = [];

function slugify(string) {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')
  
    return string.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
}


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
        let randNumber = Date.now().toString();

        let user = new User({
            firstName: body.firstName,
            lastName: body.lastName,
            password: bcrypt.hashSync(body.password, 10),
            email: body.email,
            role: body.role,
            url: slugify(`${body.firstName} ${body.lastName}`) + `-${randNumber.substring(randNumber.length - 4)}`
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

function profile(req, res) {
    User.findOne({url: req.params.url}, async (err, userDB) => {
        if(err) {
            return res.json({
                status: false,
                msg: 'Error al buscar el usuario'
            })
        } else if(userDB) {
            
            
            const count = await Product.countDocuments({
                "userInfo.email": userDB.email
            });
            Product.find({"userInfo.email": userDB.email}).sort({ _id: -1 }).limit(6).exec((err, productsDB) => {
                if(err) {
                    return res.status(501).json({
                        status: false,
                        message: 'error al buscar los productos'
                    })
                } else if(productsDB) {
                    return res.json({
                        status: 'ok',
                        productsDB,
                        userDB,
                        count
                    })
                }
            })
            
        }
    })
}

function getUserInfo(req, res) {
    User.findOne({url: req.params.url}, (err, userDB) => {
        if(err) {
            return res.json({
                status: false,
                msg: 'Error al buscar los productos'
            })
        } else if(userDB) {
            res.json({
                status: 'ok',
                userDB,
            })
        }
    })
}

function editUserInfo(req, res) {

    User.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, userDB) => {
        // console.log(userDB);
        if(err) {
            return res.status(501).json({
                status: false
            })
        } else {
            res.json({
                status: 'ok'
            })
        }
    })
}

function updatePassword(req, res) {
    if(req.body.newPassword == req.body.newPassword2) {
        User.findById(req.body._id, (err, userDB) => {
            
            if(err) {
                return res.status(501).json({
                    status: false,
                    msg: 'Error interno en el sistema, favor de intentar mas tarde'
                })
            }

            if(bcrypt.compareSync(req.body.currentPassword, userDB.password)) {
                req.body.newPassword = bcrypt.hashSync(req.body.newPassword, 10)
                User.findByIdAndUpdate(req.body._id, {
                    password: req.body.newPassword
                }, {new: true}, (err, userDB) => {
                    if(err) {
                        return res.status(501).json({
                            status: false
                        })
                    } else {
                        res.json({
                            status: 'ok',
                            msg: 'contraseña cambiada correctamente'
                        })
                    }
                })
            } else {
                res.json({
                    status: false,
                    msg:'la contraseña actual no coincide con la proporcionada'
                })
            }
        })

    } else {
        return res.status(401).json({
            status: false,
            msg: 'las contraseñas nuevas proporcionadas no coinciden'
        })
    }


}

module.exports = {
    userSignUp, 
    checkEmail,
    example,
    login,
    profile,
    getUserInfo,
    editUserInfo,
    updatePassword
}