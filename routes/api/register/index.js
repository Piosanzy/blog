const express = require('express');
const router = express.Router();

const authApiController = require('../../../controller/auth/index');
const authMiddleware = require('../../../middlewares/auth/index');

router.post('/signup', async function (req, res, next) {

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    console.log(req.body);

    const data = await authApiController.signUp(email, password, name);
    res.json(data);
});

router.post('/login', async function (req,res,next){

    const email = req.body.email;
    const password = req.body.password;

    const data = await authApiController.login(email, password,req.app);

    res.json(data);
});

router.get('/check', authMiddleware , async function (req,res,next) {

    res.json({info:req.decoded});
})

module.exports = router;