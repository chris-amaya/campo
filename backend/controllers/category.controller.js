const Category = require('../models/categories.model');

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

module.exports = {
    createCategory
} 