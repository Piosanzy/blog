const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).json({
            success: false,
            message: 'not logged in'
        })
    }

    const p = new Promise(
        (resolve, reject) => {
            jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
                if(err) reject(err)
                resolve(decoded)
            })
        }
    )

    const onError = (error) => {
        res.status(403).json({
            success: false,
            message: error.message
        })
    }

    try {
        const decoded = await p;
        req.decoded = decoded;
        next();
    } catch (e) {
        onError(e)
    }


}

module.exports = authMiddleware;