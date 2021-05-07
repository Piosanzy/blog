const express = require('express');
const router = express.Router();


const authMiddleware = require('../../../middlewares/auth/index');

router.get('/', authMiddleware, function (req, res, next) {
    res.render('page/chat/index',req.decoded);
});

router.get('/createroom', authMiddleware, function (req, res, next) {
    res.render('page/chat/createroom',req.decoded);
});

router.get('/room/:room_id', authMiddleware, function (req, res, next) {
    const roomId = req.params.room_id;
    res.render('page/chat/roomChatting', {data:req.decoded,roomId:roomId});
});



module.exports = router;
