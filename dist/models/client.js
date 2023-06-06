"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientModel = void 0;
const sequelize_1 = require("sequelize");
const todo_1 = require("./todo");
class ClientModel extends sequelize_1.Model {
    static initialize(sequelize) {
        return super.init.call(this, {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            contact: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize,
            tableName: 'client',
            timestamps: false,
        });
    }
    static associate(models) {
        // A Client can have many Todos
        this.hasMany(todo_1.TodoModel, { foreignKey: 'client', as: 'todos' });
    }
}
exports.ClientModel = ClientModel;
