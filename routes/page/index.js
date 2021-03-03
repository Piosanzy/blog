const express = require('express');
const router = express.Router();

const authMiddleware = require('../../middlewares/auth/index');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('page/index');
});
router.get('/login', function(req, res, next) {
    res.render('page/login');
});

// router.get('/mypage',authMiddleware, function(req, res, next) {
//     res.render('page/login');
// });


module.exports = router;
