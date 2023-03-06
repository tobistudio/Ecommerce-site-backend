const router = require('express').Router();
const Category = require('../controller/category');

router.get('/all', Category.getItems);
router.post('/', Category.setItems);
router.post('/add', Category.addItem);

module.exports = router;
