const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();

/** all posting contents **/
router.get('/contents', function(req, res, next) {
    res.json({});
});


/** posting contents info **/
router.get('/contents/:postingId', function(req, res, next) {
    res.json({});
});


/** insert posting contents **/
router.post('/contents', function(req, res, next) {
    res.json({});
});

/** update posting contents **/
router.put('/contents/:postingId', function(req, res, next) {
    res.json({});
});

/** delete posting contents **/
router.delete('/contents/:postingId', function(req, res, next) {
    res.json({});
});

module.exports = router;
