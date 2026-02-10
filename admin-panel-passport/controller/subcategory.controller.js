const Category = require("../model/category.model");
const SubCategory = require("../model/subCategory.model");

exports.viewAllCategories = async (req, res) => {
  try {
    let subCategories = await SubCategory.find().populate('categoryId')
    // let subCategories = await SubCategory.aggregate([
    //     { 
    //         $lookup: {
    //             from: "categories",
    //             localField: 'categoryId',
    //             foreignField: "_id",
    //             as: 'categoryId'
    //         }
    //     },
    //     {
    //         $unwind: {
    //             path: "$categoryId"
    //         }
    //     }
    // ]);
    // console.log(subCategories)

    return res.render("subcategory/viewSubcategory", { subCategories });
  } catch (error) {
    console.log(error);
    return res.redirect("/dashboard");
  }
};
exports.addSubCategoryPage = async (req, res) => {
  try {
    let categories = await Category.find();
    return res.render("subcategory/addSubcategory", { categories });
  } catch (error) {
    console.log(error);
    return res.redirect("/dashboard");
  }
};

exports.addSubCategory = async (req, res) => {
  try {
    let subCategory = await SubCategory.create(req.body);
    req.flash("success", "SubCategory Added");
    return res.redirect("/subcategory/add-subcategory");
  } catch (error) {
    console.log(error);
    return res.redirect("/dashboard");
  }
};
