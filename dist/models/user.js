"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const sequelize_1 = require("sequelize");
const todo_1 = require("./todo");
class UserModel extends sequelize_1.Model {
    static initialize(sequelize) {
        return super.init.call(this, {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                defaultValue: sequelize.col('name'),
            },
            role: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
        }, {
            sequelize,
            tableName: 'user',
            timestamps: false,
        });
    }
    static associate(models) {
        // A User can have many Todos
        this.hasMany(todo_1.TodoModel, { foreignKey: 'user', as: 'todos' });
    }
}
exports.UserModel = UserModel;
