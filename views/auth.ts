import { sequelize, User } from ".";

type LoginData = {
    username: string,
    password: string
}

export const getToken = async (loginData:LoginData) => {
    try  {
        let user = await User.findAll({
        where: {name: loginData.username},
        attributes: ['name', 'password']
    })
    if (user[0].password === loginData.password) {
        return {status: 200, json: user[0]};
    } else {
        return {status: 401, json: {message: 'wrong password'}};
    }
    } catch (error) {
        return {status: 500, json: {message: error}}
    }
}
