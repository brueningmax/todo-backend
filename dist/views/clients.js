"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClient = exports.updateClient = exports.createClient = exports.getClientByID = exports.getClients = void 0;
const _1 = require(".");
const todo_1 = require("../models/todo");
const getClients = () => __awaiter(void 0, void 0, void 0, function* () {
    let clients = yield _1.Client.findAll({
        attributes: ['id', 'name', 'address', 'contact'],
        include: [
            {
                model: todo_1.TodoModel,
                as: 'todos',
            }
        ]
    });
    const formattedData = clients.map(client => client.dataValues);
    return formattedData;
});
exports.getClients = getClients;
const getClientByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let users = yield _1.Client.findAll({
        where: {
            id: id
        },
        attributes: ['id', 'name', 'address', 'contact']
    });
    const formattedData = users.map(user => user.dataValues);
    return formattedData;
});
exports.getClientByID = getClientByID;
const createClient = (clientData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, address, contact } = clientData;
        // Create a new client instance
        const client = yield _1.Client.create({
            name,
            address,
            contact
        });
        return { status: 201, json: client };
    }
    catch (error) {
        console.error('Error creating client:', error);
        return { status: 500, json: { error: 'Failed to create client' } };
    }
});
exports.createClient = createClient;
// //update Client
const updateClient = (id, clientData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield _1.Client.findByPk(parseInt(id));
        if (client) {
            for (let key in clientData) {
                client[key] = clientData[key];
            }
            yield client.save();
        }
        return { status: 200, json: client };
    }
    catch (error) {
        console.error('Error updating client:', error);
        return { status: 500, json: { error: 'Failed to update client' } };
    }
});
exports.updateClient = updateClient;
// delete User
const deleteClient = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield _1.Client.findByPk(parseInt(id));
        if (client) {
            yield client.destroy();
            return { status: 204 };
        }
        else {
            return { status: 404 };
        }
    }
    catch (error) {
        console.error('Error deleting client:', error);
        return { status: 500, json: { error: 'Failed to delete client' } };
    }
});
exports.deleteClient = deleteClient;
