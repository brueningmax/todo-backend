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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserByID = exports.getUsers = void 0;
const _1 = require(".");
const todo_1 = require("../models/todo");
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    let users = yield _1.User.findAll({
        attributes: ['id', 'name', 'password', 'role'],
        include: [
            {
                model: todo_1.TodoModel,
                as: 'todos',
            }
        ]
    });
    const formattedData = users.map(user => user.dataValues);
    return formattedData;
});
exports.getUsers = getUsers;
const getUserByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let users = yield _1.User.findAll({
        where: {
            id: id
        },
        attributes: ['id', 'name', 'password', 'role']
    });
    const formattedData = users.map(user => user.dataValues);
    return formattedData;
});
exports.getUserByID = getUserByID;
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password, role } = userData;
        // Create a new user instance
        const user = yield _1.User.create({
            name,
            password,
            role
        });
        return { status: 201, json: user };
    }
    catch (error) {
        console.error('Error creating user:', error);
        return { status: 500, json: { error: 'Failed to create user' } };
    }
});
exports.createUser = createUser;
//update User
const updateUser = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield _1.User.findByPk(parseInt(id));
        if (user) {
            for (let key in userData) {
                user[key] = userData[key];
            }
            yield user.save();
        }
        return { status: 200, json: user };
    }
    catch (error) {
        console.error('Error updating user:', error);
        return { status: 500, json: { error: 'Failed to update user' } };
    }
});
exports.updateUser = updateUser;
// delete User
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield _1.User.findByPk(parseInt(id));
        if (user) {
            yield user.destroy();
            return { status: 204 };
        }
        else {
            return { status: 404 };
        }
    }
    catch (error) {
        console.error('Error deleting user:', error);
        return { status: 500, json: { error: 'Failed to delete user' } };
    }
});
exports.deleteUser = deleteUser;
