const express = require('express');
const { addUser } = require('../controller/auth.controller');

const routes = express.Router();

routes.post("/add-user", addUser);

module.exports = routes;

