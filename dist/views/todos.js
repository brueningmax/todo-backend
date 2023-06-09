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
exports.moveTodo = exports.deleteCompletedTodos = exports.deleteTodo = exports.completeTodo = exports.updateTodo = exports.createTodo = exports.getTodoByID = exports.getTodos = void 0;
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
        let lastTodo = yield _1.Todo.findOne({
            where: {
                user: 1,
                nextTodo: null
            }
        });
        if (lastTodo) {
            newTodo.previousTodo = lastTodo.id;
        }
        else {
            newTodo.previousTodo = null;
        }
        newTodo.status = "open";
        newTodo.nextTodo = null;
        newTodo.user = 1;
        const createdTodo = yield _1.Todo.create(newTodo);
        if (lastTodo) {
            lastTodo.nextTodo = createdTodo.id;
            yield (lastTodo === null || lastTodo === void 0 ? void 0 : lastTodo.save());
        }
        return { status: 201, json: createdTodo };
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
// complete Todo
const completeTodo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield _1.Todo.findByPk(parseInt(id));
        if (todo) {
            if (todo.nextTodo) {
                const nextTodo = yield _1.Todo.findByPk(parseInt(todo.nextTodo));
                nextTodo.previousTodo = todo.previousTodo;
                yield (nextTodo === null || nextTodo === void 0 ? void 0 : nextTodo.save());
            }
            if (todo.previousTodo) {
                const previousTodo = yield _1.Todo.findByPk(parseInt(todo.previousTodo));
                previousTodo.nextTodo = todo.nextTodo;
                yield (previousTodo === null || previousTodo === void 0 ? void 0 : previousTodo.save());
            }
            // TODO: putting the completed todo into the right spot 
            todo.status = 'completed';
            todo.user = 2;
            yield todo.save();
        }
        return { status: 200, json: todo };
    }
    catch (error) {
        console.error('Error updating todo:', error);
        return { status: 500, json: { error: 'Failed to update todo' } };
    }
});
exports.completeTodo = completeTodo;
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
const deleteCompletedTodos = () => __awaiter(void 0, void 0, void 0, function* () {
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
const moveTodo = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const move = req.body;
    try {
        let movedTodo = yield _1.Todo.findByPk(move.todoId);
        console.log(exports.moveTodo);
        if (exports.moveTodo === null) {
            return { status: 404, json: { error: 'todo not found' } };
        }
        else {
            movedTodo.user = move.to.userId;
            movedTodo === null || movedTodo === void 0 ? void 0 : movedTodo.previousTodo = move.to.previousTodo ? move.to.previousTodo : null;
            movedTodo === null || movedTodo === void 0 ? void 0 : movedTodo.nextTodo = move.to.nextTodo ? move.to.nextTodo : null;
            yield (movedTodo === null || movedTodo === void 0 ? void 0 : movedTodo.save());
            if (move.from.previousTodo) {
                let oldPrevious = yield _1.Todo.findByPk(move.from.previousTodo);
                if (oldPrevious) {
                    oldPrevious.nextTodo = move.from.nextTodo;
                    yield (oldPrevious === null || oldPrevious === void 0 ? void 0 : oldPrevious.save());
                }
            }
            if (move.from.nextTodo) {
                let oldNext = yield _1.Todo.findByPk(move.from.nextTodo);
                if (oldNext) {
                    oldNext.previousTodo = move.from.previousTodo;
                    yield (oldNext === null || oldNext === void 0 ? void 0 : oldNext.save());
                }
            }
            if (move.to.previousTodo) {
                let newPrevious = yield _1.Todo.findByPk(move.to.previousTodo);
                if (newPrevious) {
                    newPrevious.previousTodo = move.to.previousTodo;
                    yield (newPrevious === null || newPrevious === void 0 ? void 0 : newPrevious.save());
                }
            }
            if (move.to.nextTodo) {
                let newNext = yield _1.Todo.findByPk(move.to.nextTodo);
                if (newNext) {
                    newNext.previousTodo = move.to.nextTodo;
                    yield (newNext === null || newNext === void 0 ? void 0 : newNext.save());
                }
            }
            return { status: 200, json: movedTodo };
        }
    }
    catch (error) {
        console.error('Error updating todo:', error);
        return { status: 500, json: { error: 'Failed to update todo' } };
    }
});
exports.moveTodo = moveTodo;
