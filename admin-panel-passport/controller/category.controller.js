const Category = require('../model/category.model');

exports.viewAllCategories = async (req, res) => {
    try {
        let categories = await Category.find();
        return res.render("category/viewCategory", {categories})
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}
exports.addCategoryPage = async (req, res) => {
    try {
        return res.render("category/addCategory")
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}


exports.addCategory = async (req, res) => {
    try {
        let imagePath = req.file ? `/uploads/${req.file.filename}` : "";
        let category = await Category.create({
            ...req.body, categoryImage: imagePath
        });
        if(category){
            req.flash('success', 'Category Added')
            return res.redirect("/category/add-category")
        }else{
            req.flash('error', 'Category not Added')
            return res.redirect("/category/add-category")
        }
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}