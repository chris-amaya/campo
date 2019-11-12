const Category = require('../models/categories.model');
const Products = require('../models/product.model');

function createCategory(req, res) {
    console.log(req.body)
    let category = new Category(req.body);
    category.save((err, categoryDB) => {
        if(err) {
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

async function getProductsByCategory(req, res) {
    const limit = 5;
    const page = Number(req.params.page) || 0;
    const skip = page > 0 ? page * limit - limit : 0
    const count = await Products.countDocuments({
        "category.title": req.params.category
    })

    Products.find({"category.title": req.params.category})
    .skip(skip)
    .limit(limit)
    .exec((err, productsDB) => {
        if(err) {
            return res.status(501).json({
                msg: 'Error al buscar los productos',
                err
            });
        } else if(productsDB) {
            res.json({
                productsDB,
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