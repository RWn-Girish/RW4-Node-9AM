const express = require('express');
const { dashboard, loginPage, loginuser, logOutAdmin, profilePage, changePasswordPage, changePassword, forgotPasswordPage, sendOtp, verifyOtpPage, verifyOtp, resetPasswordPage, resetpassword } = require('../controller/auth.controller');

const routes = express.Router();

routes.get("/", loginPage);
routes.post("/login", loginuser);
routes.get("/logout", logOutAdmin);
routes.get("/profile", profilePage);
routes.get("/change-password", changePasswordPage);
routes.post("/change-password", changePassword);

// forgot -password
routes.get("/forgot-password", forgotPasswordPage);
routes.post("/send-otp", sendOtp);
routes.get("/verify-otp", verifyOtpPage);
routes.post("/verify-otp", verifyOtp);
routes.get("/reset-password", resetPasswordPage);
routes.post("/reset-password", resetpassword);

routes.get("/dashboard", dashboard);

routes.use("/admin", require("./admin.routes"));

module.exports = routes;