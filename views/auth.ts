import { sequelize, User } from ".";
import jwt from 'jsonwebtoken';
import {secret} from '../index'
import { LoginData, JWTUser } from "./utils/types";

function generateToken(payload: JWTUser) {
    const token = jwt.sign(payload, secret, { expiresIn: '1h' }); 
    console.log(token)
    return token
}

export const getToken = async (loginData: LoginData) => {
    try {
        let user = await User.findOne({
            where: { name: loginData.username },
        })

        if (user?.password === loginData.password) {
            const token = await generateToken(user?.dataValues)
            return { status: 200, json: { 
                user: {
                    id: user.id, 
                    name: user.name, 
                    role: user.role
                }, 
                token: token 
            } 
        };


        } else {
            return { status: 401, json: { message: 'wrong password' } };
        }


    } catch (error) {
        return { status: 500, json: { message: error } }
    }
}
