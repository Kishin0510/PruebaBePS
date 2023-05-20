const FormModel = require('../../model/form')

// Crear y guardar nuevos formularios
exports.create = async (req, res) => {
    if (!req.body.Codigo && !req.body.Nombre && !req.body.Descripcion) {
        res.status(400).send({ message: "No puede estar vacio" });
    }
   //else if (req.body.Codig)
    
    const form = new FormModel({
        Codigo: req.body.Codigo,
        Nombre: req.body.Nombre,
        Descripcion: req.body.Descripcion,
    });
    await form.save().then(data => {
        res.send({
            message:"Formulario creado con exito",
            form:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Hubieron problemas al crear el formulario"
        });
    });
};
// Eliminar formulario

exports.destroy = async (req, res) => {
    await FormModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
          res.status(404).send({
            message: "Formulario no encontrado"
          });
        } else {
          res.send({
            message: "Formulario eliminado"
          });
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
};

// Actualizar formulario
// Update a user by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "La actualizacion no puede estar vacia"
        });
    }
    
    const id = req.params.id;
    
    await FormModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: "El formulario no se encuentra"
            });
        }else{
            res.send({ message: "Se actualizó con éxito" })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
// Busca todo los formularios
exports.findAll = async (req, res) => {
    try {
        const form = await FormModel.find();
        res.status(200).json(form);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Busca por id
exports.findOne = async (req, res) => {
    try {
        const form = await FormModel.findById(req.params.id);
        res.status(200).json(form);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};