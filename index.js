const express = require('express');
const bodyParser = require('body-parser')
const staticAsset = require('static-asset');
const path = require('path');

const routes = require('./routes');

const app = express();

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
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connection
    .on('error', error => reject(error))
    .on('open', () => {
        const info = (mongoose.connections[0]);
        console.log(`Connect to ${info.host}:${info.port}/${info.name}`)
    })
    .on('close', () => console.log('Database connection close'));

mongoose.connect('mongodb://localhost/User', {useNewUrlParser: true, useCreateIndex:true});



app.get('/', (req, res) => {res.render('index.ejs')})
app.get('/registration', (req, res) => {res.render('registration.ejs')});
app.get('/entrance', (req, res) => {res.render('entrance.ejs')})

app.use('/', routes.auth);

app.listen(8080);