const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
const {createUser, getUsers, updateUserByID} = require('../controllers/userController')

router.post('/create', authMiddleware, createUser)
router.get('/', authMiddleware, getUsers)
router.put('/:id', authMiddleware, updateUserByID)


module.exports = {userRouter: router}