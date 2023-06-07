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
exports.createTodo = void 0;
const _1 = require(".");
const createTodo = (userData) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.createTodo = createTodo;
