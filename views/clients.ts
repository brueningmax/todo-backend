import { sequelize, Client } from ".";
import { TodoModel } from "../models/todo";



export const getClients = async () => {
    let clients = await Client.findAll({
        attributes: ['id', 'name', 'address', 'contact'],
        include: [
            {
                model: TodoModel,
                as: 'todos',
            }
        ]
    })
    const formattedData = clients.map(client => client.dataValues)
    return formattedData;
}

export const getClientByID = async (id: string) => {
    let users = await Client.findAll({
        where: {
            id: id
        },
        attributes: ['id', 'name', 'address', 'contact']
    })
    const formattedData = users.map(user => user.dataValues)
    return formattedData;
}


//create User

type Client = {
    name: string,
    address: string,
    contact: string
  };

export const createClient = async (clientData: Client) => {
    try {
        const { name, address, contact } = clientData;
    
        // Create a new client instance
        const client = await Client.create({
            name, 
            address, 
            contact
        });

        return {status: 201, json: client};
      } catch (error) {
        console.error('Error creating client:', error);
        return {status: 500, json: { error: 'Failed to create client' }};
      }
}

// //update Client
export const updateClient = async (id: string, clientData: Partial<Client>) => {
    try {

        const client = await Client.findByPk(parseInt(id))
        if (client) {
            for (let key in clientData) {
                client[key] = clientData[key]
            }
            await client.save()
        }
        return {status: 200, json: client};
    } catch (error) {
        console.error('Error updating client:', error);
        return {status: 500, json: { error: 'Failed to update client' }};
      }
}

// delete User
export const deleteClient = async (id: string) => {
    try {
        const client = await Client.findByPk(parseInt(id))
        if (client) {
            await client.destroy()
            return {status: 204};
        } else {
            return {status: 404}
        }
    } catch (error) {
        console.error('Error deleting client:', error);
        return {status: 500, json: { error: 'Failed to delete client' }};
      }
}