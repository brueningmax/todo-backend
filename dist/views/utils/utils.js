"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortTodos = void 0;
const sortTodos = (array) => {
    var _a;
    const sortedArray = [];
    let firstTodo = array.find(todo => todo.previousTodo === null);
    sortedArray.push(firstTodo);
    const todoObj = {};
    array.forEach(todo => {
        todoObj[todo.id] = todo;
    });
    while (sortedArray.length < array.length) {
        let nextTodo_id = String((_a = sortedArray[sortedArray.length - 1]) === null || _a === void 0 ? void 0 : _a.nextTodo);
        let nextTodo = todoObj[nextTodo_id];
        sortedArray.push(nextTodo);
    }
    return sortedArray;
};
exports.sortTodos = sortTodos;
