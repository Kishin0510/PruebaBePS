var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    Codigo: {
        type: String,
        required: true,
        unique: true
    },
    Nombre: {
        type: String,
        default: ''
    },
    Descripcion: {
        type: String,
        default: ''
    }
});

var form = new mongoose.model('Form', schema);

module.exports = form