const express = require('express');
const router = express.Router();

const postingApiController = require('../../../controller/posting/index');
const authMiddleware = require('../../../middlewares/auth/index');


/** all posting contents **/
router.get('/', async function(req, res, next) {
    const data = await postingApiController.getPosting();

    res.json(data);
});


/** posting contents info **/
router.get('/:postingId', async function(req, res, next) {

    const data = await postingApiController.readPosting(req.params.postingId);

    res.json(data);
});


/** insert posting contents **/
router.post('/',authMiddleware, async function(req, res, next) {
    const _data = {
        title:req.body.title,
        category:req.body.category,
        contents:req.body.contents,
    }

    const data = await postingApiController.insertPosting(req.decoded,_data);
    res.json(data);
});

/** update posting contents **/
router.put('/:postingId', function(req, res, next) {
    res.json({});
});

/** delete posting contents **/
router.delete('/:postingId', function(req, res, next) {
    res.json({});
});

module.exports = router;
