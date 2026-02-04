const express = require('express');
const { addSubCategoryPage, addSubCategory } = require('../controller/subcategory.controller');

const routes = express.Router();

routes.get("/add-subcategory", addSubCategoryPage);
routes.post("/add-subcategory",  addSubCategory);
// routes.get("/view-categories", viewAllCategories);

module.exports = routes;