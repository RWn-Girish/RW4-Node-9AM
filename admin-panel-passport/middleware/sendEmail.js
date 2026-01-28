const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth:{
        user: "rw3.girish.gk@gmail.com",
        pass: "duafhpuerwjkbuyl"
    }
})


const sendEmail = async (message) => {
    let response = await transporter.sendMail(message)
    console.log(response);
}

module.exports = sendEmail;