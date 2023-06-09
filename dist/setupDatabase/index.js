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
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
const query_1 = require("./query");
dotenv_1.default.config();
let database = process.env.DB_NAME;
const sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: `./${database}.db`,
});
sequelize.sync();
function executeQueries() {
    return __awaiter(this, void 0, void 0, function* () {
        for (const query of query_1.queries) {
            try {
                yield sequelize.query(query);
                console.log('Query executed successfully:', query);
            }
            catch (error) {
                console.error('Error executing query:', query);
                console.error(error);
            }
        }
    });
}
executeQueries();
