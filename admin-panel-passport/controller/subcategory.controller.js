const Category = require("../model/category.model");
const SubCategory = require("../model/subCategory.model");

exports.addSubCategoryPage = async (req, res) => {
    try {
        let categories = await Category.find()
        return res.render("subcategory/addSubcategory", { categories });
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.addSubCategory = async (req, res) => {
    try {
       let subCategory = await SubCategory.create(req.body);
       req.flash('success', 'SubCategory Added');
       return res.redirect("/subcategory/add-subcategory");
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}