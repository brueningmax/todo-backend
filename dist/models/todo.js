"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoModel = void 0;
const sequelize_1 = require("sequelize");
const client_1 = require("./client");
const user_1 = require("./user");
class TodoModel extends sequelize_1.Model {
    static initialize(sequelize) {
        return super.init.call(this, {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            priority: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            type: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            notes: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            // user: {
            //     type: DataTypes.INTEGER,
            //     allowNull: false,
            // },
            // client: {
            //     type: DataTypes.INTEGER,
            //     allowNull: false,
            // },
            next_todo: {
                type: sequelize_1.DataTypes.INTEGER,
            },
            previous_todo: {
                type: sequelize_1.DataTypes.INTEGER,
            },
            month: {
                type: sequelize_1.DataTypes.ENUM('jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'),
            },
            year: {
                type: sequelize_1.DataTypes.INTEGER,
            }
        }, {
            sequelize,
            tableName: 'todo',
            timestamps: false,
        });
    }
    ;
    static associate(models) {
        this.belongsTo(user_1.UserModel, {
            foreignKey: 'user'
        });
        this.belongsTo(client_1.ClientModel, {
            foreignKey: 'client',
        });
    }
}
exports.TodoModel = TodoModel;
