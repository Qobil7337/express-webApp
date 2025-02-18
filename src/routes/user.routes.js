const express = require('express')

const {increaseBalance, decreaseBalance} = require('../controllers/user.controller')

const router = express.Router()

router.post('/increase-balance', increaseBalance)
router.post('/decrease-balance', decreaseBalance)

module.exports = router
