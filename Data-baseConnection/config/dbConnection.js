const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect("mongodb://localhost:27017/studentManage")
    .then(()=> console.log('DB is Connected!!!!'))
    .catch((err) => console.log(err));
}

module.exports = dbConnect;


//adimn@123