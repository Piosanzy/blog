const express = require('express');
const router = express.Router();

const userApiController = require('../../../controller/user/index');
const authMiddleware = require('../../../middlewares/auth/index');

router.get('/mypage',authMiddleware,async function (req,res,next) {

    res.json(req.decoded);
})

module.exports = router;