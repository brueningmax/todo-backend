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
const utils_1 = require("./utils/utils");
const main_1 = require("./main");
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
// export const createTodo = async (newTodo: TodoType) => {
//   try {
//     // get last todo => todo.id
//     let lastTodo = await Todo.findOne({
//       where: {
//         user: 1,
//         nextTodo: null
//       }
//     })
//     if (lastTodo) {
//       newTodo.previousTodo = lastTodo.id
//     } else {
//       newTodo.previousTodo = null
//     }
//     newTodo.status = "open"
//     newTodo.nextTodo = null
//     newTodo.user = 1
//     const createdTodo = await Todo.create(newTodo)
//     if (lastTodo) {
//       lastTodo.nextTodo = createdTodo.id
//       await lastTodo?.save()
//     }
//     const data = await getBoard()
//     data.status = 201
//     return data;
//   } catch (error) {
//     console.error('Error creating todo:', error);
//     return { status: 500, json: { error: 'Failed to create todo' } };
//   }
// }
const createTodo = (newTodo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        newTodo.status = "open";
        newTodo.nextTodo = null;
        newTodo.previousTodo = null;
        newTodo.user = 1;
        const createdTodo = yield _1.Todo.create(newTodo);
        const priority = ['salary', 'high', 'medium', 'low'];
        const indexOfPrio = priority.indexOf(createdTodo.priority);
        const unassignedTodos = yield _1.Todo.findAll({
            where: { user: 1 }
        });
        let previousTodo = null;
        let nextTodo = null;
        if (unassignedTodos.length > 1) {
            const sortedTodos = (0, utils_1.sortTodos)(unassignedTodos).reverse();
            const priorityEnds = [];
            priorityEnds.push(sortedTodos.find(todo => (todo === null || todo === void 0 ? void 0 : todo.priority) == 'salary'));
            priorityEnds.push(sortedTodos.find(todo => (todo === null || todo === void 0 ? void 0 : todo.priority) == 'high'));
            priorityEnds.push(sortedTodos.find(todo => (todo === null || todo === void 0 ? void 0 : todo.priority) == 'medium'));
            priorityEnds.push(sortedTodos.find(todo => (todo === null || todo === void 0 ? void 0 : todo.priority) == 'low'));
            console.log(priorityEnds);
            if (priorityEnds[indexOfPrio]) {
                previousTodo = priorityEnds[indexOfPrio].id;
                nextTodo = priorityEnds[indexOfPrio].nextTodo;
            }
            else {
                // looking for todo to attach to
                let foundPrevious = false;
                for (let i = indexOfPrio; i >= 0; i--) {
                    if (priorityEnds[i]) {
                        previousTodo = priorityEnds[i].id;
                        nextTodo = priorityEnds[i].nextTodo;
                        foundPrevious = true;
                        break;
                    }
                }
                // if we didnt find a point to attach to, we put the todo there and add the last element of the reversed array
                if (!foundPrevious) {
                    previousTodo = null;
                    if (indexOfPrio === priority.length - 1) {
                        nextTodo = null;
                    }
                    else {
                        nextTodo = sortedTodos[sortedTodos.length - 1].id;
                    }
                }
            }
            console.log('previousTodo: ', previousTodo);
            console.log('nextTodo: ', nextTodo);
            if (previousTodo) {
                const oldPrevious = yield _1.Todo.findByPk(previousTodo);
                oldPrevious.nextTodo = createdTodo.id;
                oldPrevious.save();
            }
            if (nextTodo) {
                const oldNext = yield _1.Todo.findByPk(nextTodo);
                oldNext.previousTodo = createdTodo.id;
                oldNext.save();
            }
        }
        createdTodo.previousTodo = previousTodo;
        createdTodo.nextTodo = nextTodo;
        createdTodo.status = 'open';
        createdTodo.user = 1;
        console.log(exports.createTodo);
        const save = yield createdTodo.save();
        const data = yield (0, main_1.getBoard)();
        data.status = 201;
        return data;
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
            // const priority = ['salary', 'high', 'medium', 'low']
            const priority = ['low', 'medium', 'high', 'salary'];
            const indexOfPrio = priority.indexOf(todo.priority);
            const completedTodos = yield _1.Todo.findAll({
                where: { user: 2 }
            });
            let previousTodo = null;
            let nextTodo = null;
            if (completedTodos.length > 0) {
                const sortedTodos = (0, utils_1.sortTodos)(completedTodos).reverse();
                const priorityEnds = [];
                priorityEnds.push(sortedTodos.find(todo => todo.priority = 'low'));
                priorityEnds.push(sortedTodos.find(todo => todo.priority = 'medium'));
                priorityEnds.push(sortedTodos.find(todo => todo.priority = 'high'));
                priorityEnds.push(sortedTodos.find(todo => todo.priority = 'salary'));
                if (priorityEnds[indexOfPrio]) {
                    previousTodo = priorityEnds[indexOfPrio].id;
                    nextTodo = priorityEnds[indexOfPrio].nextTodo;
                }
                else {
                    // looking for todo to attach to
                    let foundPrevious = false;
                    for (let i = indexOfPrio; i >= 0; i--) {
                        if (priorityEnds[i]) {
                            previousTodo = priorityEnds[indexOfPrio].id;
                            nextTodo = priorityEnds[indexOfPrio].nextTodo;
                            foundprevious = true;
                            break;
                        }
                    }
                    // if we didnt find a point to attach to, we put the todo there and add the last element of the reversed array
                    if (!foundPrevious) {
                        previousTodo = null;
                        if (indexOfPrio === priority.length - 1) {
                            nextTodo = null;
                        }
                        else {
                            nextTodo = sortedTodos[utils_1.sortTodos.length - 1].id;
                        }
                    }
                }
                if (previousTodo) {
                    const oldPrevious = yield _1.Todo.findByPk(previousTodo);
                    oldPrevious.nextTodo = todo.id;
                    oldPrevious === null || oldPrevious === void 0 ? void 0 : oldPrevious.save();
                }
                if (nextTodo) {
                    const oldNext = yield _1.Todo.findByPk(nextTodo);
                    oldNext.previousTodo = todo.id;
                    oldNext === null || oldNext === void 0 ? void 0 : oldNext.save();
                }
            }
            todo.previousTodo = previousTodo;
            todo.nextTodo = nextTodo;
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
