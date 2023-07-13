const express               = require('express');
const app                   = express();

const db = require('./config/mongoose');
require('dotenv').config();

const path = require('path');

const session = require('express-session');
const MongoStore = require('connect-mongo'); // pass session as an argument here

// Using Passport js
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const GoogleStrategy = require('./config/passport-google');

const assetsPath = path.join(__dirname, 'assets');
app.use('/assets', express.static(assetsPath));

// For Post Requests
app.use(express.urlencoded());
// setting up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Linking assets

app.use(session({
    name:'Placement Cell',
    // Change the secret before deployment
    secret:'blahblahblah',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100),
    },
    store: MongoStore.create({
        mongoUrl: process.env.mongoDBAtlas,
        autoRemove: 'disabled'
    }),
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Routes


app.use('/', require('./routes'));
app.use((req,res)=>{
    res.status(404).render('404');
})

app.listen(8080, (err)=>{
    if(err){
        console.log("Error Starting Server");
        return;
    }
    console.log("Server started at port 8080");
})