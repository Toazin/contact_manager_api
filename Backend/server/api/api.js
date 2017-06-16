var router = require('express').Router();

router.use('/user', require('./user/user.js'));
router.use('/contact', require('./contact/contact.js'));
router.use('/category', require('./category/category.js'));

module.exports = router
