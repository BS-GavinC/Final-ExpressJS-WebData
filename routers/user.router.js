const express = require('express')
const userController = require('../controllers/user.controller')

const userRouter = express.Router()

userRouter.get('/:id([0-9]+)', userController.getOne)
userRouter.get('/', userController.getAll)
userRouter.post('/create', userController.create)
userRouter.put('/update', userController.update)
userRouter.delete('/:id([0-9]+)', userController.delete)
userRouter.patch('/password', userController.changePassword)

module.exports = userRouter