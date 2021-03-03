const express = require('express');
const router = express.Router();

const authApiController = require('../../../controller/auth/index');

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

    if(data.token){
        res.cookie('x-access-token',data.token,{maxAge:1000*60*60*24});
    }
    res.json(data);
});

router.get('/logout', async function (req,res,next){

    res.clearCookie('x-access-token');
    res.redirect('/');
});

module.exports = router;