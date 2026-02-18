const express = require('express');
const dbConnect = require('./config/dbConnect');
const cookieparser = require('cookie-parser');
const passport = require('passport');
const localStertegy = require('./middleware/localStretergy');
const session = require('express-session');
const flash = require('connect-flash');
const flashMessage = require('./middleware/flashMessage');

const app = express();
const port = 9080;

// middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use(express.static('public'));
app.use("/uploads",express.static('uploads'));
app.use(cookieparser());
app.use(flash());

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
app.use(passport.setAuthenticated);
app.use(flashMessage);


// admin routes
app.use("/", require('./routes/index.routes'));
// website routes
app.use("/web", require('./routes/web.routes'));


app.listen(port, ()=> {
    console.log(`Server start at http://localhost:${port}/dashboard`);
})