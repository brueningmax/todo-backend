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
const express_1 = __importDefault(require("express"));
const users_1 = require("../views/users");
const router = express_1.default.Router();
//get all users
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, users_1.getUsers)();
    res.send(data);
}));
// get user by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, users_1.getUserByID)(req.params.id);
    res.send(data);
}));
// create user
router.post('/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, users_1.createUser)(req.body);
    res.status(data.status).json(data.json);
}));
// update user
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, users_1.updateUser)(req.params.id, req.body);
    res.status(data.status).json(data.json);
}));
// delete user
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, users_1.deleteUser)(req.params.id);
    res.sendStatus(data.status);
}));
exports.default = router;
