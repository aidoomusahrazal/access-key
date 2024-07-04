const express = require('express')
const router = express.Router()
const accessKeyController = require('../controler/accessKeyController')

router.post("/get-access-key", accessKeyController.generateAccessKey)

router.get("/revoke-access-key/:id", accessKeyController.revokeAccessKey)

router.get("/get-access-keys", accessKeyController.getAllAccessKeys)

router.get("/get-access-key/:email", accessKeyController.checkActiveKey)

module.exports = router