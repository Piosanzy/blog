const User = require('../../models/user/user.js');
const jwt = require('jsonwebtoken');

const authApi = () => {
    const signUp = async (email, password, name) => {
        let newUser = null;
        const create = (user) => {
            if (user) {
                throw new Error('User already exists.');
            } else {
                return User.create(email, password, name);
            }
        }

        const count = (user) => {
            newUser = user
            return User.count({}).exec()
        }

        const assign = (count) => {
            if (count === 1) {
                return newUser.assignAdmin()
            } else {
                // if not, return a promise that returns false
                return Promise.resolve(false)
            }
        }

        const respond = (isAdmin) => {
            return {
                message: 'registered successfully',
                admin: isAdmin ? true : false
            }
        }

        const onError = (error) => {
            return {
                message: error.message
            }
        }
        
        try {
            const findUser = await User.findOneByUsername(email);
            const createUser = await create(findUser);
            const countUser = await count(createUser);
            const assignUser = await assign(countUser);
            const data = await respond(assignUser);

            return data;
        }catch (e){
            return onError(e);
        }

    }

    const login = async (email, password, app) => {
        const secret = app.get('jwt-secret');

        const check = (user) => {
            if (!user) {
                // user does not exist
                throw new Error('login failed')
            } else {
                // user exists, check the password
                if (user.verify(password)) {
                    // create a promise that generates jwt asynchronously
                    const p = new Promise((resolve, reject) => {
                        jwt.sign(
                            {
                                _id: user._id,
                                username: user.username,
                                admin: user.admin
                            },
                            secret,
                            {
                                expiresIn: '7d',
                                issuer: 'lt',
                                subject: 'userInfo'
                            }, (err, token) => {
                                if (err) reject(err)
                                resolve(token)
                            })
                    })
                    return p
                } else {
                    throw new Error('login failed')
                }
            }
        }

        const respond = (token) => {
            return {
                message: 'logged in successfully',
                token
            }
        }

        const onError = (error) => {
            return {
                message: error.message
            }
        }

        try {
            const findUser = await User.findOneByUsername(email);
            const checkUser = await check(findUser);
            const data = await respond(checkUser);

            return data;
        } catch (e) {
            return onError(e);
        }

    }

    const check = async (xAccessToken, app) => {
        const token = xAccessToken;

        if (!token) {
            return {
                success: false,
                message: 'not logged in'
            };
        }

        const p = new Promise(
            (resolve, reject) => {
                jwt.verify(token, app.get('jwt-secret'), (err, decoded) => {
                    if (err) reject(err)
                    resolve(decoded)
                })
            }
        )

        const respond = (token) => {
            return {
                success: true,
                info: token
            }
        }

        const onError = (error) => {
            return {
                success: false,
                message: error.message
            }
        }

        try {
            const user = await p;
            const data = await respond(user);
            return data;
        } catch (e) {
            return onError(e)
        }


    }

    return {
        signUp: signUp,
        login: login,
        check: check
    }
}

module.exports = authApi();