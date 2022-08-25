let express = require('express');
let router = express.Router();
let usersCntrl = require('../controllers/usersController');

//Register
router.post("/register", usersCntrl.register);

// Login
router.post("/login", usersCntrl.login);

module.exports = router;
