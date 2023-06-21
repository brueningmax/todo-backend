"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secret = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = __importDefault(require("./routes/users"));
const todos_1 = __importDefault(require("./routes/todos"));
const clients_1 = __importDefault(require("./routes/clients"));
const auth_1 = __importDefault(require("./routes/auth"));
const main_1 = __importDefault(require("./routes/main"));
const body_parser_1 = __importDefault(require("body-parser"));
const JWTauth_1 = require("./middleware/JWTauth");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
exports.secret = String(process.env.SECRET);
// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server');
// });
app.post('/', JWTauth_1.jwtAuth, (req, res) => {
    res.send(req.user);
});
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/board', main_1.default);
app.use('/users', users_1.default);
app.use('/todos', todos_1.default);
app.use('/clients', clients_1.default);
app.use('/auth', auth_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
