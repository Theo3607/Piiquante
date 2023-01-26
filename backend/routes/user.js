const express = require('express');

const router = express.Router();

const routeCtrl = require('../controllers/user')

router.post('/signup', routeCtrl.NewUser)
router.post('/login', routeCtrl.TestUser)

module.exports = router;