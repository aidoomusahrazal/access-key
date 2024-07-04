const express = require('express')
const router = express.Router()

const adminController = require('./../controler/adminController')

router.post("/login-admin",  adminController.adminLogin )




module.exports = router