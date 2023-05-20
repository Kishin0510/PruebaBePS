const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Se a conectado con exito a la Base de datos");    
}).catch(err => {
    console.log('No se encuentra la base de datos', err);
    process.exit();
});
const FormRoute = require('./app/routes/Form.js')

app.use('/form',FormRoute)

app.get('/', (req, res) => {
    res.json({"message": "Hola mundo"});
});

app.listen(3000, () => {
    console.log("Server en puerto 3000");
});