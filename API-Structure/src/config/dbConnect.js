const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect("mongodb://localhost:27017/api-project")
    .then(()=>console.log('DB Connection'))
    .catch(err => console.log(err));
}

module.exports = dbConnect;