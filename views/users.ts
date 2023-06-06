import { sequelize, User } from ".";



export const getUsers = async () => {
    let users = await User.findAll({
        attributes: ['id', 'name', 'password', 'role']
    })
    const formattedData = users.map(user => user.dataValues)
    return formattedData;
}

export const getUserByID = async (id: string) => {
    let users = await User.findAll({
        where: {
            id: id
        },
        attributes: ['id', 'name', 'password', 'role']
    })
    const formattedData = users.map(user => user.dataValues)
    return formattedData;
}


//create User

type User = {
    name: string;
    password?: string;
    role?: string;
  };

export const createUser = async (userData: User) => {
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
export const updateUser = async (id: string, userData: Partial<User>) => {
    try {

        const user = await User.findByPk(parseInt(id))
        if (user) {
            for (let key in userData) {
                user[key] = userData[key]
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