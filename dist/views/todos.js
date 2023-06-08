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
exports.deleteCompletedTodos = exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodoByID = exports.getTodos = void 0;
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
const createTodo = (newTodo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get last todo => todo.id
        let last_todo = yield _1.Todo.findOne({
            where: {
                user: 1,
                next_todo: null
            }
        });
        if (last_todo) {
            newTodo.previous_todo = last_todo.id;
        }
        else {
            newTodo.previous_todo = null;
        }
        newTodo.status = "open";
        newTodo.next_todo = null;
        newTodo.user = 1;
        const createdTodo = yield _1.Todo.create(newTodo);
        if (last_todo) {
            last_todo.next_todo = createdTodo.id;
            yield (last_todo === null || last_todo === void 0 ? void 0 : last_todo.save());
        }
        return { status: 201, json: createdTodo };
    }
    catch (error) {
        console.error('Error creating todo:', error);
        return { status: 500, json: { error: 'Failed to create todo' } };
    }
});
exports.createTodo = createTodo;
// export const createTodo = async (user: number, todoData: Todo) => {
//     try {
//         const { 
//           priority,
//           type,
//           notes,
//           status,
//           client,
//           month,
//           year} = todoData;
//         // Create a new user instance
//         const todo = await Todo.create({
//           priority,
//           type,
//           notes,
//           status,
//           user,
//           client,
//           month,
//           year
//         });
//         return {status: 201, json: todo};
//       } catch (error) {
//         console.error('Error creating todo:', error);
//         return {status: 500, json: { error: 'Failed to create todo' }};
//       }
// }
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
// delete completed todos
const deleteCompletedTodos = (req) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('HIIIIIIIEEEEEER');
    console.log(req.user);
    if (req.user.role != 2) {
        return { status: 401, json: { error: 'Not authorized' } };
    }
    try {
        yield _1.Todo.destroy({
            where: {
                user: 4,
                status: 'completed'
            }
        });
        return { status: 204, json: { message: 'Todos deleted' } };
    }
    catch (error) {
        console.error('Error deleting todos:', error);
        return { status: 500, json: { error: 'Failed to delete todos' } };
    }
});
exports.deleteCompletedTodos = deleteCompletedTodos;
