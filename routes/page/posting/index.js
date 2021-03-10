const express = require('express');
const router = express.Router();

const authMiddleware = require('../../../middlewares/auth/index');

router.get('/insert', authMiddleware, function (req, res, next) {
    if (req.decoded.admin) {
        res.render('page/posting/insert');
    } else {
        res.redirect('/');
    }
});


module.exports = router;
