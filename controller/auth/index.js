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
                result:200,
                message: 'registered successfully',
                admin: isAdmin ? true : false
            }
        }

        const onError = (error) => {
            return {
                result:500,
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
                                email: user.email,
                                name:user.name,
                                password:user.password,
                                admin: user.admin,
                                createAt:user.createAt,
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
                result:200,
                message: 'logged in successfully',
                token
            }
        }

        const onError = (error) => {
            return {
                result:500,
                message: error.message
            }
        }

        try {
            const findUser = await User.findOneByUsername(email);
            const token = await check(findUser);
            const data = await respond(token);

            return data;
        } catch (e) {
            return onError(e);
        }

    }

    return {
        signUp: signUp,
        login: login,
    }
}

module.exports = authApi();