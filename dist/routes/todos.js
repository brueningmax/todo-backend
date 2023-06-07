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
const cookieJWTauth_1 = require("../middleware/cookieJWTauth");
const todos_1 = require("../views/todos");
const router = express_1.default.Router();
// get all todo
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, todos_1.getTodos)();
    res.send(data);
}));
// get todo
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, todos_1.getTodoByID)(req.params.id);
    res.send(data);
}));
// create todo
router.post('/new', cookieJWTauth_1.jwtAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, todos_1.createTodo)(req.user.id, req.body);
    res.status(data.status).json(data.json);
}));
// update todo
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, todos_1.updateTodo)(req.params.id, req.body);
    res.status(data.status).json(data.json);
}));
// delete todo
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, todos_1.deleteTodo)(req.params.id);
    res.sendStatus(data.status);
}));
exports.default = router;
