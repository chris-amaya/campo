const JWT = require('jsonwebtoken');

function checkToken(req, res, next) {
    JWT.verify(req.get('token'), process.env.SEED, (err, decoded) => {
        if(err) {
            return res.status(401).json({
                status: false,
                err: {
                    message: 'Token inválido'
                }
            });
        } 

        req.user = decoded.user;
        next();
    })
}

function validateADMIN(req, res) {
    if(req.user.role != 'ADMIN_ROLE') {
        return res.status(401).json({
            status: false,
            err: {
                message: 'No es usuario administrador'
            }
        })
    }
}

function refreshToken(req, res) {
    // TOKEN is valid
    let token = req.get('token');

    if(!token || token == '' || undefined === token) {
        return res.status(401).json({
            status: false,
            err: {
                message: 'token inválido 1'
            }
        })
    } 

    JWT.verify(token, process.env.SEED, (err, decoded) => {
        if(err) {
            return res.status(401).json({
                status: false,
                err: {
                    message: 'token inválido 2'
                }
            })
        } 

        else if(!err && decoded) {
            if(decoded.exp < Date.now()) {
                token = JWT.sign({
                    user: decoded.user
                }, process.env.SEED, {expiresIn: process.env.TOKEN_EXPIRATION});
                return res.json({
                    token
                })
            } else {
                return res.status(491).json({
                    status: false,
                    err: {
                        message: 'El Token ha expirado'
                    }
                })
            }
        }

    })
}

module.exports = {
    checkToken,
    validateADMIN,
    refreshToken
}

