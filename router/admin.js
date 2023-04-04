const router = require('express').Router();
const Admin = require('../controller/Admin');

router.get('/all', Admin.getItems);
router.post('/', Admin.setItems);
router.post('/addItem', Admin.addItem);
// router.get('/myItem', Category.getMyItems);
router.post('/delete', Admin.deleteItem);
module.exports = router;
