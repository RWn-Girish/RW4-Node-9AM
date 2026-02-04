const Admin = require('../model/admin.model');
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const os = require('os');
const sendEmail = require('../middleware/sendEmail');

exports.loginPage = async (req, res) => {
    try {
        if(req.isAuthenticated())
            return res.redirect("/dashboard");
        else
            return res.render("login");
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
}
exports.logOutAdmin = async (req, res) => {
    try {
        req.session.destroy(() => {
            return res.redirect("/");
        })
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}
exports.dashboard = async (req, res) => {
    try {
        // console.log("User ===> ", req.user);
        return res.render("dashboard");
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}
exports.profilePage = async (req, res) => {
    try {
        const user =  req.user;
        return res.render("profile", {user});
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}
exports.changePasswordPage = async (req, res) => {
    try {
        const user =  req.user;
        return res.render("changepassword", {user});    
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}
exports.changePassword = async (req, res) => {
    try {
            const user = req.user;
            const {oldPass, newPassword, confirmPassword} = req.body;
            let matchpass = await bcrypt.compare(oldPass, user.password);
            if(!matchpass){
            return res.redirect("/change-password");
            }

            if(oldPass == newPassword){
            return res.redirect("/change-password");
            }
            if(newPassword != confirmPassword){
            req.flash('error', 'New password and confirm password is not matched')
            return res.redirect("/change-password");
            }

            const hashpassword = await bcrypt.hash(newPassword, 10);
            await Admin.findByIdAndUpdate(user._id, {password: hashpassword}, {new: true});
            req.flash('success', 'Change password Success');
            return res.redirect("/dashboard");
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.loginuser = async (req, res) => {
    try {
        req.flash('success', 'Login Success');
        return res.redirect("/dashboard");
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
}



exports.forgotPasswordPage = async (req, res) => {
    try {
        return res.render("resetpass/forgotpassword");
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.verifyOtpPage = async (req, res) => {
    try {
        
        return res.render("resetpass/verifyOtp");
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.resetPasswordPage = async (req, res) => {
    try {
        
        return res.render("resetpass/resetPassword");
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.sendOtp = async (req, res) => {
    try {
        const admin = await Admin.findOne({email: req.body.email});
        if(!admin){
            console.log('admin not found');
            return res.redirect("/forgot-password");
        }
        let otp = otpGenerator.generate(6, {upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false});
        
        let ip_add = os.networkInterfaces().Ethernet[1].address

        let message = {
            from: 'rw3.girish.gk@gmail.com',
            to: `${req.body.email}`,
            subject: "Reset password OTP.",
            html: `
                <h2>Hello, ${admin.firstname}</h2>
                <p>Your Reset password OTP is : ${otp}. OTP valid only 5 Minutes.</p>
                <p>login Device IP Address is: ${ip_add} and Host Name is: ${os.hostname()}.</p>
            `
        }
        sendEmail(message);
        res.cookie('otp', otp);
        res.cookie('email', admin.email);
        return res.redirect("/verify-otp");
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}
exports.verifyOtp = async (req, res) => {
    try {
        let otp = req.cookies.otp;

        if(otp != req.body.otp){
            console.log('Otp not matched!!!!!');
            return res.redirect("/verify-otp");
        }
        res.clearCookie('otp');
        return res.redirect("/reset-password");
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.resetpassword = async (req, res) => {
    try {
        let email = req.cookies.email;
        if(req.body.newPassword != req.body.confirmPassword){
            console.log('Password is not matched');
            return res.redirect("/reset-password");
        }

        let hashpassword = await bcrypt.hash(req.body.newPassword, 10);

        await Admin.findOneAndUpdate({email: email}, {password: hashpassword}, {new: true});
        res.clearCookie('email');
        return res.redirect("/");
        
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}