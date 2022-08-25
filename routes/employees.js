var express = require('express');
var router = express.Router();
const empCntrl = require('../controllers/employeesController');
const auth = require("../middlewares/auth");

/* GET employees listing. */
router.get('/', auth, empCntrl.find);
router.post('/', auth, empCntrl.create);
router.delete('/:empId', auth, empCntrl.delete);
router.get('/stats', auth, empCntrl.getStatistics);

module.exports = router;