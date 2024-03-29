const Category = require('../models/categories.model');
const Products = require('../models/product.model');
const User = require('../models/user.model');


function createCategory(req, res) {
    console.log(req.body)
    let category = new Category(req.body);
    category.save((err, categoryDB) => {
        if(err) {
            console.log(err);
            return res.status(401).json({
                msg: 'Error al crear la categoria',
                status: false
            })
        } else if(categoryDB) {
            res.json({
                msg: 'Categoría creada exitosamente',
                categoryDB
            })
        }
    });

}

function getCategories(req, res) {
    Category.find((err, categoriesDB) => {
        res.json({
            status: 'ok',
            categoriesDB
        })
    })
}


function getUserDataByEmail(email) {
    return User.findOne({email}, (err, userDB) => {
         if(userDB) {
            return userDB
        }
    })
}

const firstCharToUpperCase = (str) => {
    str = str.split('');
    str[0] = str[0].toUpperCase();
    str = str.join('');

    return str;
}

async function getProductsByCategory(req, res) {
    let category = firstCharToUpperCase(req.params.category);

    const limit = 5;
    const page = Number(req.params.page) || 0;
    const skip = page > 0 ? page * limit - limit : 0
    const count = await Products.countDocuments({
        "category": category
    })

    Products.find({"category": category})
    .skip(skip)
    .limit(limit)
    .exec( async (err, productsDB) => {
        let products = [];
        for (let product of productsDB){
            let user = await getUserDataByEmail(product.userInfo.email);
            products.push({
                product,
                user
            });
        }

        if(err) {
            return res.status(501).json({
                msg: 'Error al buscar los productos',
                err
            });
        } else if(productsDB) {
            res.json({
                products,
                pages: Math.ceil(count / limit),
                status: 'ok'
            })
        }
    })
}

module.exports = {
    createCategory,
    getCategories,
    getProductsByCategory
} 