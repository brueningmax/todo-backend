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
exports.getBoard = void 0;
const _1 = require(".");
const client_1 = require("../models/client");
const todo_1 = require("../models/todo");
const utils_1 = require("./utils/utils");
const getBoard = (req) => __awaiter(void 0, void 0, void 0, function* () {
    let users = yield _1.User.findAll({
        attributes: ['id', 'name', 'isAdmin'],
        include: [
            {
                model: todo_1.TodoModel,
                as: 'todos',
                include: [{ model: client_1.ClientModel }],
            },
        ],
        order: [
            _1.sequelize.literal(`case when UserModel.id = 1 then 1 when UserModel.id = 2 then 3 else 2 end`),
        ],
    });
    const formattedData = yield users.map(user => {
        const { id, name, role, todos } = user.dataValues;
        let todosData = todos.map(todo => {
            let client = todo.dataValues.ClientModel.dataValues;
            todo.dataValues.client = client;
            delete todo.dataValues.ClientModel;
            return todo.dataValues;
        });
        todosData = (0, utils_1.sortTodos)(todosData);
        return {
            user: { id, name, role },
            todos: todosData
        };
    });
    return { status: 200, json: formattedData };
});
exports.getBoard = getBoard;
