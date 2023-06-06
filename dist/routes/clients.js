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
const clients_1 = require("../views/clients");
const router = express_1.default.Router();
//get all clients
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, clients_1.getClients)();
    res.send(data);
}));
// get client by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, clients_1.getClientByID)(req.params.id);
    res.send(data);
}));
// create clients
router.post('/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, clients_1.createClient)(req.body);
    res.status(data.status).json(data.json);
}));
// update clients
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, clients_1.updateClient)(req.params.id, req.body);
    res.status(data.status).json(data.json);
}));
// delete clients
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, clients_1.deleteClient)(req.params.id);
    res.sendStatus(data.status);
}));
exports.default = router;
