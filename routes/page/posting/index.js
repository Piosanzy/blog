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

router.get('/:_id',function (req,res,next) {
    const data = {
        id:req.params._id
    }
    res.render('page/posting/index',data);
})


module.exports = router;
