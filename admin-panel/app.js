const express = require('express');
const dbConnect = require('./config/dbConnect');
const cookieparser = require('cookie-parser');

const app = express();
const port = 8080;

// middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use(express.static('public'));
app.use("/uploads",express.static('uploads'));
app.use(cookieparser());


// routes
app.use("/", require('./routes/index.routes'));


app.listen(port, ()=> {
    console.log(`Server start at http://localhost:${port}/dashboard`);
})