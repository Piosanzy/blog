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

        try {
            const findUser = await User.findOneByUsername(email);
            const data = await create(findUser);
            const countUser = await count(data);
            await assign(countUser);

            return data;
        }catch (e){
            return {error:e.message};
        }

    }

    const login = async (email, password, app) => {
        const secret = app.get('jwt-secret');

        const check = (user) => {
            if (!user) {
                // user does not exist
                throw new Error('Not Found User Login Failed');
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
                    throw new Error('Password Not Match Login Failed')
                }
            }
        }

        try {
            const findUser = await User.findOneByUsername(email);
            const data = await check(findUser);

            return {token: data};
        } catch (e) {
            return {error: e.message};
        }

    }

    return {
        signUp: signUp,
        login: login,
    }
}

module.exports = authApi();