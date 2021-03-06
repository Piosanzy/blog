const express = require('express');
const router = express.Router();

const authMiddleware = require('../../../middlewares/auth/index');

router.get('/mypage', authMiddleware, function (req, res, next) {
    if (req.decoded.admin) {
        res.render('page/user/adminpage',req.decoded);
    } else {
        res.render('page/user/mypage',req.decoded);
    }
});


module.exports = router;
