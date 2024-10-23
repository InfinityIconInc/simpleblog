const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const ejs = require('ejs');
const fileUpload = require('express-fileupload');
const redirectIfNotLoginMiddleware = require('./middlewares/redirectIfNotLogin');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(fileUpload());
app.use(expressSession({secret: 'lady-bug'}));

global.loggedIn = null;

app.use('*', (req, res, next) => {
    loggedIn = req.session.userId;
    next ();
})

mongoose.connect('mongodb://localhost:27017/simpleblog')
    .then(console.log('MongoDB Connected'))
    .catch((err) => {console.log('Couldnot connect to MongoDB')});

app.listen(3000, (err) => {
    if ( err )
        console.log('Failed to connect 3000');
    else
        console.log('Dancing on 3000')});

const signupUserController = require('./controllers/signupUser');
const storeUserController = require('./controllers/storeUser');
const loginUserController = require('./controllers/loginUser');
const validateUserController = require('./controllers/validateUser');
const homePageController = require('./controllers/homePage');
const logOutController = require('./controllers/logOut');
const newPostController = require('./controllers/newPost');
app.get ('/signup', signupUserController);
app.post('/signup/storeuser', storeUserController);
app.get('/login', loginUserController);
app.post('/login/validateuser', validateUserController);
app.get('/', homePageController);
app.get('/logout', logOutController);
app.get('/newpost', redirectIfNotLoginMiddleware, newPostController);

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/contact', (req, res) => {
    res.render('contact');
})

app.get('/post', (req, res) => {
    res.render('post');
})
