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
const JWTauth_1 = require("../middleware/JWTauth");
const todos_1 = require("../views/todos");
const main_1 = require("../views/main");
const router = express_1.default.Router();
// create todo
router.post('/new', JWTauth_1.jwtAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, todos_1.createTodo)(req.body);
    res.status(data.status).json(data.json);
}));
// move todo
router.patch('/moveTodo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, todos_1.moveTodo)(req);
    let data = yield (0, main_1.getBoard)();
    res.status(data.status).json(data.json);
}));
// delete todo
router.delete('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, todos_1.deleteTodo)(req.params.id);
    res.sendStatus(data.status);
}));
// complete todo
router.patch('/complete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, todos_1.completeTodo)(req.params.id);
    if (data.status === 200) {
        data = yield (0, main_1.getBoard)();
    }
    res.status(data.status).json(data.json);
}));
// delete completed todos
router.delete('/deleteCompleted', JWTauth_1.jwtAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, todos_1.deleteCompletedTodos)();
    res.status(data.status).json(data.json);
}));
// get todo
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, todos_1.getTodoByID)(req.params.id);
    res.send(data);
}));
// update todo
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, todos_1.updateTodo)(req.params.id, req.body);
    res.status(data.status).json(data.json);
}));
// get all todo
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, todos_1.getTodos)();
    res.send(data);
}));
exports.default = router;
