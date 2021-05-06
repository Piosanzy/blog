const express = require('express');
const router = express.Router();

const chatApiController = require('../../../controller/chat/index');
const authMiddleware = require('../../../middlewares/auth/index');


/** all posting contents **/
router.post('/create', async function(req, res, next) {
    const roomName = req.body.roomName;
    const roomUser = {
        user_id: req.body.user_id,
        user_name: req.body.user_name,
    };
    console.log(roomName,roomUser)
    const data = await chatApiController.createRoom(roomName,roomUser);

    res.json(data);
});

router.post('/session/init',async function (req, res, next){
    const userId = req.body.user_id;
    const userName = req.body.user_name;
    const userEmail = req.body.user_email;

    const data = await chatApiController.createUserSession(userId,userName,userEmail);

    res.json(data)
})

router.delete('/session/disconnect/:user_id',async function (req,res,next){
    const userId = req.params.user_id;
    const data = await chatApiController.deleteSessionDisconnect(userId);

    res.json(data)
})

router.get('/session/list',async function (req, res, next){
    const data = await chatApiController.getSessionList();

    res.json(data)
})

router.get('/room/list', async function(req, res, next) {
    const data = await chatApiController.getRoomList();

    res.json(data);
});

module.exports = router;
