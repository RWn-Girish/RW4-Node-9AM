const express = require('express');
const { addExtraCategoryPage, getAllSubCategories } = require('../controller/extracategory.controller');

const routes = express.Router();

routes.get("/subcategory/:id", getAllSubCategories);

routes.get("/add-extracategory", addExtraCategoryPage);
// routes.post("/add-subcategory",  addSubCategory);
// routes.get("/view-subcategories", viewAllCategories);

module.exports = routes;