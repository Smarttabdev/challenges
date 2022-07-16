const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');

router.get('/book', BookController.getList);
router.post('/book', BookController.createOne);
router.delete('/book/:ids', BookController.delete);

module.exports = router;