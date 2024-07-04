const express = require('express')
const router = express.Router()

const userController = require('./../controler/userControler')

router.post("/register", userController.userSignup )

router.get("/verify/:token", userController.verify )

router.post("/login",  userController.userLogin )

router.post("/forget-password", userController.forgetPaword )

router.post("/reset-password/:token", userController.resetPassword )



module.exports = router