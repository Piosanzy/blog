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

    res.json(data);
});

router.get('/check',async function (req,res,next) {
    const token =req.headers['x-access-token'];
    const data = await authApiController.check(token,req.app);

    res.json(data);
})

module.exports = router;