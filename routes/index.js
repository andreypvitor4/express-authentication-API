var express = require('express');
var router = express.Router();
const authMiddleware = require('../middlewares/auth')
const endPoints = require('../app/controllers/endPoints')

router.post('/register', endPoints.register)
router.post('/auth', endPoints.auth)
router.post('/email-availability', endPoints.emailAvailability)

router.use(authMiddleware)
router.get('/user', endPoints.user)
router.put('/update-user', endPoints.changeName)

module.exports = router;
