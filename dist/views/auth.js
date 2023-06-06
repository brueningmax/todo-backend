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
exports.getToken = void 0;
const _1 = require(".");
const getToken = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield _1.User.findAll({
            where: { name: loginData.username },
            attributes: ['name', 'password']
        });
        if (user[0].password === loginData.password) {
            return { status: 200, json: user[0] };
        }
        else {
            return { status: 401, json: { message: 'wrong password' } };
        }
    }
    catch (error) {
        return { status: 500, json: { message: error } };
    }
});
exports.getToken = getToken;
