const express = require('express')
const router = express.Router();

const paymentController = require('../Controllers/payments')

router.post('/payment', paymentController.payment)
router.get('/success', paymentController.success)
router.get('/fail', paymentController.fail)

module.exports = router;