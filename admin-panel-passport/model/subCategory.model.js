const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    subcategory: String
});

module.exports = mongoose.model('SubCategory', subCategorySchema);


/*
    title, price, image, description, category, subcategory, extracategory, brand


*/