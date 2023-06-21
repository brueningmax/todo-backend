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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = void 0;
const _1 = require(".");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../index");
function generateToken(payload) {
    const token = jsonwebtoken_1.default.sign(payload, index_1.secret, { expiresIn: '1h' });
    console.log(token);
    return token;
}
const getToken = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield _1.User.findOne({
            where: { name: loginData.username },
        });
        if ((user === null || user === void 0 ? void 0 : user.password) === loginData.password) {
            const token = yield generateToken(user === null || user === void 0 ? void 0 : user.dataValues);
            return { status: 200, json: {
                    user: {
                        id: user.id,
                        name: user.name,
                        isAdmin: user.isAdmin === 1
                    },
                    token: token
                }
            };
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
