const Category = require("../model/category.model");
const SubCategory = require("../model/subCategory.model");


exports.getAllSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.find({categoryId: req.params.id});
        return res.json({message: 'Fetch all subcategory', subCategories})
    } catch (error) {
        console.log(error)
        return res.redirect("/")
    }
}

exports.addExtraCategoryPage = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.render("extracategory/addExtracategory", { categories })
    } catch (error) {
        console.log(error)
        return res.redirect("/")
    }
}