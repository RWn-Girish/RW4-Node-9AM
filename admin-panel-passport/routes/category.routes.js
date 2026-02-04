const express = require('express');
const { addCategoryPage, addCategory, viewAllCategories } = require('../controller/category.controller');
const uploadImage = require('../middleware/uploadImage');
const routes = express.Router();

routes.get("/add-category", addCategoryPage);
routes.post("/add-category", uploadImage.single('categoryImage'), addCategory);
routes.get("/view-categories", viewAllCategories);

module.exports = routes;