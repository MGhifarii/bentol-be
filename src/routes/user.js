const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/profile/:id', userController.profile)
router.put('/profile/:id', userController.editProfile)

module.exports = router