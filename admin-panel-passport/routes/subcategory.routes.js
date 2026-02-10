const express = require('express');
const { addSubCategoryPage, addSubCategory, viewAllCategories } = require('../controller/subcategory.controller');

const routes = express.Router();

routes.get("/add-subcategory", addSubCategoryPage);
routes.post("/add-subcategory",  addSubCategory);
routes.get("/view-subcategories", viewAllCategories);

module.exports = routes;