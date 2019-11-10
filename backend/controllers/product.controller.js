const Product = require('../models/product.model');
const JWT  = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

function saveIMGToDisk(file) {
    let base64Data = file.replace(/^data:([A-Za-z-+/]+);base64,/, '');
    let currentDate = Date.now();
    let relativePath = '/uploads/';
    let extensionFile =  `.${file.split(';')[0].split('/')[1]}`;
    // fs.writeFile()
    let pathFile = path.resolve(process.env.PWD + relativePath + currentDate + extensionFile);
    // let pathFile = path.resolve(process.env.PWD + '/uploads/' + Date.now() + getExtensionFile(req.body.pics[i]));
    fs.writeFile(pathFile, base64Data, 'base64', (err) => {
        if(err) {
            return res.status(501).json({
                msg: 'error interno al guardar las imágenes'
            })
        }
    });
    return relativePath + currentDate + extensionFile
}

function createProduct(req, res) {
    // console.log(req.body.mainImg)
    let newPicsPath = [];
    if(req.body.pics.length > 0) {
        for(let i = 0; i < req.body.pics.length; i++) {
            newPicsPath.push(saveIMGToDisk(req.body.pics[i]));
        }
    }

    

    console.log(newPicsPath);
    let body = req.body;
    body.pics = newPicsPath;
    body.mainImg = body.pics[body.mainImg];

    let product = new Product(body);

    product.save((err, productDB) => {
        if(err) {
            return res.status(403).json({
                msg: 'Error al registar al producto en la BD',
                err
            })
        } else if(productDB) {
            res.json({
                msg: 'Producto registrado correctamente'
            })
        }
    })
}

module.exports = {
    createProduct
} 