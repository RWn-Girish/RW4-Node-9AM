const express = require('express');
const dbConnect = require('./config/dbConnect');
const cookieparser = require('cookie-parser');
const passport = require('passport');
const localStertegy = require('./middleware/localStretergy');
const session = require('express-session');

const app = express();
const port = 9080;

// middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use(express.static('public'));
app.use("/uploads",express.static('uploads'));
app.use(cookieparser());

app.use(session({
    name: 'node-9AM',
    secret: 'develop',
    saveUninitialized: false,
    resave: true,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))

app.use(passport.initialize());
app.use(passport.session());


// routes
app.use("/", require('./routes/index.routes'));


app.listen(port, ()=> {
    console.log(`Server start at http://localhost:${port}/dashboard`);
})