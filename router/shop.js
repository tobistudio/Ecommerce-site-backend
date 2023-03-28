const router = require('express').Router();
const Category = require('../controller/category');

router.get('/all', Category.getItems);
router.post('/', Category.setItems);
router.post('/addItem', Category.addItem);
router.get('/myItem', Category.getMyItems);
router.post('/delete', Category.deleteItem);
router.post('/update', Category.updateItem);

module.exports = router;
