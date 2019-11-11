const Product = require('../models/product.model');
const JWT  = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

function saveIMGToDisk(file) {
    let base64Data = file.replace(/^data:([A-Za-z-+/]+);base64,/, '');
    let currentDate = Date.now();
    let relativePath = '/uploads/';
    let extensionFile =  `.${file.split(';')[0].split('/')[1]}`;
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

function createProduct(req, res) {
    let newPicsPath = [];
    if(req.body.pics.length > 0) {
        for(let i = 0; i < req.body.pics.length; i++) {
            newPicsPath.push(saveIMGToDisk(req.body.pics[i]));
        }
    }

    let body = req.body;
    body.pics = newPicsPath;
    body.mainImg = body.pics[body.mainImg];
    body.url = slugify(body.title)
    let product = new Product(body);

    product.save((err, productDB) => {
        if(err) {
            return res.status(403).json({
                msg: 'Error al registar al producto en la BD',
                err
            })
        } else if(productDB) {
            res.json({
                status: 'ok',
                msg: 'Producto registrado correctamente'
            })
        }
    })
}

function editProduct(req, res) {
    let newPicsPath = [];
    console.log(req.body)
    if(req.body.pics.length > 0) {
        for(let i = 0; i < req.body.pics.length; i++) {
            if(fs.existsSync(path.resolve(process.env.PWD + req.body.pics[i]))) {
                newPicsPath.push(req.body.pics[i]);
            } else {
                newPicsPath.push(saveIMGToDisk(req.body.pics[i]))
            }
        }
    }

    let body = req.body;
    body.pics = newPicsPath;
    body.mainImg = body.pics[body.mainImg];

    let product = new Product(body);
    // product.updateOne({_id: req.params.id})
    Product.findByIdAndUpdate(req.params.id, body, {new: true, runValidators: true}, (err, productDB) => {
        if(err) return console.log(err)
        else if(productDB) {
            // console.log(productDB)
            // res.json(productDB);
            res.json({
                status: 'ok',
                productDB
            })
        }

    })
}


function getProductByUser(req, res) {
    Product.find({"userInfo.email": req.user.email}, (err, productsDB) => {
        if(err) {
            return res.status(501).json({
                msg: "Error al buscar los productos",
                err
            })
        } else if(productsDB) {
            res.json(productsDB)
        }
    });
}

function getProductByID(req, res) {
    Product.findById(req.body.id_product || req.params.id, (err, productDB) => {
        if(err) {
            return res.status(501).json({
                msg: "Error al buscar el producto",
                status: 'false',
                err
            })
        } else if(productDB) {
            res.json({
                status: 'ok',
                productDB
            })
        } else {
            res.json({
                status: false,
                msg: 'el producto no ha podido ser encontrado'
            })
        }
    })
}

function deleteImgByID(req, res) {
    console.log(req.params.id);
    let pathPic = '/uploads/' + req.params.id;
    console.log(req.body.idProduct)
    Product.findById(req.body.idProduct, (err, productDB) => {
        if(err) {
            return res.status(501).json({
                msg: 'Error al eliminar la imágen',
                status: false
            })
        } else if(productDB){

            let newPicsPath = productDB.pics.filter((value, index) => {
                return value != pathPic
            })

            Product.findByIdAndUpdate(req.body.idProduct, {
                pics: newPicsPath
            },(err, productUpdated) => {
                if(err) {
                    return res.status(501).json({
                        msg: 'Error al borrar la imagen',
                        status: false
                    })
                } else if(productUpdated) {
                    fs.unlink(path.resolve(process.env.PWD + '/uploads/' + req.params.id), (err) => {
                        if(err) {
                            return res.status(501).json({
                                status: false,
                                msg: 'Error al eliminar el archivo'
                            })
                        } else {
                            res.json({
                                status: 'ok',
                                msg: 'Archivo borrado correctamente'
                            })
                        }
                    })

                }
            })

        }
    })
}

function getProductByURL(req, res) {
    Product.findOne({url: req.params.url}, (err, productDB) => {
        if(err) {
            return res.status(501).json({
                msg: 'Error al obtener el producto',
                status: false
            })
        } else if(productDB) {
            res.json(productDB)
        }
    })
}

module.exports = {
    createProduct,
    getProductByUser,
    getProductByID,
    deleteImgByID,
    editProduct,
    getProductByURL
} 