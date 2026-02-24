const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log('DB Connection'))
    .catch(err => console.log(err));
}

module.exports = dbConnect;