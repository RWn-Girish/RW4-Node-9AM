const express = require('express');
const { webPage } = require('../controller/web.controller');
const routes = express.Router();

routes.get("/", webPage);

module.exports = routes;