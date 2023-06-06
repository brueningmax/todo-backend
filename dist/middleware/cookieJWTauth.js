"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../index");
const jwtAuth = (req, res, next) => {
    const token = req.headers.authorization;
    const [scheme, jwtToken] = token.split(' ');
    jsonwebtoken_1.default.verify(jwtToken, index_1.secret, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }
        req.user = decoded; // Attach the user data to the request object
        next();
    });
};
exports.jwtAuth = jwtAuth;
