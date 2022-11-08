const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

router.get('/', productsController.getProducts);

router.get('/contactus', productsController.getContactUsPage);

router.post('/success', productsController.getSuccessPage);

module.exports = router;
