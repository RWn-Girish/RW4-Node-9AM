const Category = require('../model/category.model');
const SubCategory = require('../model/subCategory.model');
const path = require('path');
const fs = require('fs');

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

exports.deleteCategory = async (req, res) => {
    try {
        let category = await Category.findById(req.params.id);
        if(!category){
            req.flash('error', 'Category not found')
            return res.redirect('/category/view-categories');
        }

        if(category.categoryImage != ""){
            let imagepath = path.join(__dirname, "..", category.categoryImage);
            try {
                await fs.unlinkSync(imagepath);
            } catch (error) {
                console.log('file missing');
            }
        }

        await Category.findByIdAndDelete(req.params.id);    // category model data delete
        await SubCategory.deleteMany({categoryId: category._id})
        req.flash('success', 'category delete success');
        return res.redirect('/category/view-categories');

    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}