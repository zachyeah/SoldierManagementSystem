const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./router');
const bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://armyRegistry:armyRegistryPassword@cluster0.0zwwi.mongodb.net/armyRegistry?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.on('error', err => console.log('err'));
db.on('open', () => console.log('database opened'));
db.on('close', () => console.log('database closed'));

app.use('/uploads', express.static('uploads'));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Resource-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*");
    console.log("requst url = " + req.url);
    next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api', router);

app.use((req, res) => {
    res.send('<h1> page not found </h1>');
})

app.listen(8800, () => console.log('the server starts'))
