const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.render('page/index');
});
router.get('/login', function (req, res, next) {
    res.render('page/login');
});

router.get('/join', function (req, res, next) {
    res.render('page/join');
});


module.exports = router;
