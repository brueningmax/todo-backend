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
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodoByID = exports.getTodos = void 0;
const _1 = require(".");
const client_1 = require("../models/client");
const user_1 = require("../models/user");
const getTodos = () => __awaiter(void 0, void 0, void 0, function* () {
    let todos = yield _1.Todo.findAll({
        // attributes: ['id', 'type'],
        include: [
            {
                model: user_1.UserModel,
            },
            {
                model: client_1.ClientModel,
            }
        ]
    });
    const formattedData = todos.map(todo => todo.dataValues);
    return formattedData;
});
exports.getTodos = getTodos;
const getTodoByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let todos = yield _1.Todo.findAll({
        where: {
            id: id
        },
        // attributes: ['id', 'name', 'password', 'role'],
        include: [
            {
                model: user_1.UserModel,
            },
            {
                model: client_1.ClientModel,
            }
        ]
    });
    const formattedData = todos.map(todo => todo.dataValues);
    return formattedData;
});
exports.getTodoByID = getTodoByID;
const createTodo = (user, todoData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { priority, type, notes, status, client, month, year } = todoData;
        // Create a new user instance
        const todo = yield _1.Todo.create({
            priority,
            type,
            notes,
            status,
            user,
            client,
            month,
            year
        });
        return { status: 201, json: todo };
    }
    catch (error) {
        console.error('Error creating todo:', error);
        return { status: 500, json: { error: 'Failed to create todo' } };
    }
});
exports.createTodo = createTodo;
// update Todo
const updateTodo = (id, todoData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield _1.Todo.findByPk(parseInt(id));
        if (todo) {
            for (let key in todoData) {
                todo[key] = todoData[key];
            }
            yield todo.save();
        }
        return { status: 200, json: todo };
    }
    catch (error) {
        console.error('Error updating todo:', error);
        return { status: 500, json: { error: 'Failed to update todo' } };
    }
});
exports.updateTodo = updateTodo;
//delete Todo
const deleteTodo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield _1.Todo.findByPk(parseInt(id));
        if (todo) {
            yield todo.destroy();
            return { status: 204 };
        }
        else {
            return { status: 404 };
        }
    }
    catch (error) {
        console.error('Error deleting todo:', error);
        return { status: 500, json: { error: 'Failed to delete todo' } };
    }
});
exports.deleteTodo = deleteTodo;
