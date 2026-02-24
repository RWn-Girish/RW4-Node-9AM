const express = require('express');
const { registerUser, getAllUser, loginUser, deleteUser } = require('../controller/auth.controller');
const { uploadImage } = require('../middlware/uploadImage');
const { verifyToken } = require('../middlware/verifyToken');

const routes = express.Router();

routes.post("/register", uploadImage.single('profileImage'), registerUser);
routes.post("/login", loginUser);
routes.get("/get-users",  getAllUser);
routes.delete("/delete-user/:id", verifyToken, deleteUser);

module.exports = routes;



// authentication => JWT