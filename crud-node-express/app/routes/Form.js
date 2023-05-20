const express = require('express')
const FormController = require('../controllers/Form')
const router = express.Router();

router.get('/', FormController.findAll);
router.get('/:id', FormController.findOne);
router.post('/', FormController.create);
router.patch('/:id', FormController.update);
router.delete('/:id', FormController.destroy);

module.exports = router