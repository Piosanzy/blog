const express = require('express');
const router = express.Router();

const authMiddleware = require('../../../middlewares/auth/index');

/* GET home page. */
router.get('/mypage', authMiddleware, function (req, res, next) {
    if (req.decoded.admin) {
        res.render('page/user/adminpage',res.decoded);
    } else {
        res.render('page/user/mypage',res.decoded);
    }
});


module.exports = router;
