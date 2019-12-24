const User = require('../models/user.model');
const Product = require('../models/product.model');
const JWT  = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID)

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
    console.log(body);

    validateEmail(body.email);

    if(errors.length > 0) {
        // responder false y / error
        console.log(body)
        console.log(errors)
        res.status(401).json({
            msg: 'error en los datos enviados',
            status: false,
            errors: this.errors
        })
    } else {
        let randNumber = Date.now().toString();

        // if(body.method != 'normal') {
        //     body.password = ':X'
        // }
        body.method != 'normal' ? body.password = ':x' : body.password;
        
        // if(body.method)

        let user = new User({
            firstName: body.firstName,
            lastName: body.lastName,
            password: bcrypt.hashSync(body.password, 10),
            email: body.email,
            role: body.role,
            pic: body.pic,
            url: slugify(`${body.firstName} ${body.lastName}`) + `-${randNumber.substring(randNumber.length - 4)}`,
            address: {
                state: null,
                city: null,
                cp: null,
                address: null
            }
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
            // if(req.body.google) {
            //     if(user.email === false) {
            //         return res.state(403).json({
            //             ok: false,
            //             err: {
            //                 message: 'debe de usar sus credenciales normales (usuario y contraseña)'
            //             }
            //         })
            //     }
            // } 

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

// CONFIGURACIONES DE GOOGLE

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();

    return {
        nombre: payload.name,
        email: payload.email,
        pic: payload.picture,
        google: true
    }

    // console.log(payload)
  }

async function googleVerify(req, res) {
    let idToken = req.body.token;
    let googleUser = await verify(idToken)
    .catch((err) => {
        res.status(403).json({
            ok: false,
            err
        })
    })
    
    User.findOne({ email: googleUser.email }, (err, userDB) => {
        
        console.log({
            err, userDB
        })
        if(err) {
            return res.status(500).json({
                ok: false,
                err
            })
        } 
        if(userDB) {
            if(userDB.google === false) {
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'debe de usar su autenticación normal'
                    }
                })
            } else {
                let token = JWT.sign({
                    userDB
                }, process.env.SEED, {expiresIn: process.env.TOKEN_EXPIRATION})
                res.json({
                    ok: true,
                    userDB: userDB,
                    token,
                })
            }
            
            } else {

                // el usuario se puede registrar
                res.json({
                    ok: true,
                    signUp: true
                    // userDB

                })
            }
        })
}

// async function google(req, res) {
//     let idtoken = req.body.token;
//     // verify(idtoken);
//     let googleUser = await verify(idtoken)
//     .catch((err) => {
//         res.status(403).json({
//             ok: false,
//             err
//         })
//     });

//     // verificar que usuario no exista

//     User.findOne({ email: googleUser.email }, (err, userDB) => {
//         if(err) {
//             return res.status(500).json({
//                 ok: false,
//                 err
//             })
//         } 
//     if(userDB) {
//         if(userDB.google === false) {
//             return res.status(500).json({
//                 ok: false,
//                 err: {
//                     message: 'debe de usar su autenticación normal'
//                 }
//             })
//         } else {
//             let token = JWT.sign({
//                 userDB
//             }, process.env.SEED, {expiresIn: process.env.TOKEN_EXPIRATION})
//             res.json({
//                 ok: true,
//                 user: userDB,
//                 token
//             })
//         }
        
//     } else {

//         // userSignUp()
    
//         let randNumber = Date.now().toString();
//         // Sí el usuario no existe en la BD es un nuevo usuario por lo tanto hay que crearlo
//         let user = new User();
//         user.firstName = googleUser.nombre;
//         user.email = googleUser.email;
//         user.pic = googleUser.pic;
//         user.password = ':)';
//         user.url = slugify(`${user.firstName}-${randNumber.substring(randNumber.length - 4)}`)
//         user.role = req.body.role

//         user.save((err, userDB) => {

//             if(err) {   
//                 return res.status(500).json({
//                     ok: false,
//                     err: {
//                         message: 'error interno al guardar en la BD',
//                         err
//                     }
//                 })
//             } 

//             let token = JWT.sign({
//                 userDB
//             }, process.env.SEED, {expiresIn: process.env.TOKEN_EXPIRATION})

//             res.json({
//                 ok: true,
//                 user: userDB,
//                 token
//             })

//         })

//         }
//     })

// }

module.exports = {
    userSignUp, 
    checkEmail,
    example,
    login,
    profile,
    getUserInfo,
    editUserInfo,
    updatePassword,
    // google,
    googleVerify
}