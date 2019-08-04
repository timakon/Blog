const express = require('express');
const bodyParser = require('body-parser')
const staticAsset = require('static-asset');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const routes = require('./routes');

const app = express();

//Sessions
app.use(
  session({
      secret:'1234',
      resave:true,
      saveUninitialized:false,
      store: new MongoStore({
          mongooseConnection: mongoose.connection
      })
  })
);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(staticAsset(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//Connected JQuery
app.use(
    '/javascripts',
    express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist'))
);

//Connect to DB
mongoose.Promise = global.Promise;
mongoose.connection
    .on('error', error => reject(error))
    .on('open', () => {
        const info = (mongoose.connections[0]);
        console.log(`Connect to ${info.host}:${info.port}/${info.name}`)
    })
    .on('close', () => console.log('Database connection close'));

mongoose.connect('mongodb://localhost/User', {useNewUrlParser: true, useCreateIndex:true});



app.get('/', (req, res) => {
    const id = req.session.userID;
    const login = req.session.userLogin;
    res.render('index.ejs', {
        user:{
            id,
            login
        }
    });
});
app.get('/registration', (req, res) => {res.render('registration.ejs')});
app.get('/entrance', (req, res) => {res.render('entrance.ejs')});
app.get('/lorem', (req,res) => {res.render('lorem.ejs')});

app.use('/', routes.auth);

app.listen(8080);