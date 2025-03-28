const express = require('express')

const {updateBalance} = require('../controllers/user.controller')

const router = express.Router()

router.post('/update-balance', updateBalance)

module.exports = router
