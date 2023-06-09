import { sequelize, User } from ".";
import { TodoModel } from "../models/todo";
import { UserType } from "./utils/types"



export const getUsers = async () => {
    let users = await User.findAll({
        attributes: ['id', 'name', 'password', 'isAdmin'],
        include: [
            {
                model: TodoModel,
                as: 'todos',
            }
        ]
    })
    const formattedData = users.map(user => user.dataValues)
    return formattedData;
}

export const getUserByID = async (id: string) => {
    let users = await User.findAll({
        where: {
            id: id
        },
        attributes: ['id', 'name', 'password', 'isAdmin']
    })
    const formattedData = users.map(user => user.dataValues)
    return formattedData;
}


//create User
export const createUser = async (userData: UserType) => {
    try {
        const { name, password, role } = userData;
    
        // Create a new user instance
        const user = await User.create({
            name, 
            password, 
            role
        });

        return {status: 201, json: user};
      } catch (error) {
        console.error('Error creating user:', error);
        return {status: 500, json: { error: 'Failed to create user' }};
      }
}

//update User
export const updateUser = async (id: string, userData: Partial<UserType>) => {
    try {

        const user = await User.findByPk(parseInt(id))
        if (user) {
            for (let key in userData) {
                (user as any)[key] = (userData as any)[key]
            }
            await user.save()
        }
        return {status: 200, json: user};
    } catch (error) {
        console.error('Error updating user:', error);
        return {status: 500, json: { error: 'Failed to update user' }};
      }
}

// delete User
export const deleteUser = async (id: string) => {
    if (id === "1" || id === "2") {
        return {status: 401, json: { error: 'User cant be deleted' }};
    }
    try {
        const user = await User.findByPk(parseInt(id))
        if (user) {
            await user.destroy()
            return {status: 204};
        } else {
            return {status: 404}
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        return {status: 500, json: { error: 'Failed to delete user' }};
      }
}