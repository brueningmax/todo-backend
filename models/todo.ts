import { Model, Sequelize, ModelStatic, DataTypes } from 'sequelize';
import { ClientModel } from './client';
import { UserModel } from './user';

export class TodoModel extends Model {
    public id!: number;
    public priority!: string;
    public type!: string;
    public notes!: string;
    public status!: string;
    // public user!: number;
    // public client!: number;
    public next_todo?: number;
    public previous_todo?: number;
    public month?: 'jan' | 'feb' | 'mar' | 'apr' | 'may' | 'jun' | 'jul' | 'aug' | 'sep' | 'oct' | 'nov' | 'dec';
    public year?: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public static initialize(sequelize: Sequelize): ModelStatic<TodoModel> {
        return super.init.call(
            this,
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                },
                priority: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                type: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                notes: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                status: {
                    type: DataTypes.STRING,
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
                    type: DataTypes.INTEGER,
                },
                previous_todo: {
                    type: DataTypes.INTEGER,
                },
                month: {
                    type: DataTypes.ENUM(
                        'jan',
                        'feb',
                        'mar',
                        'apr',
                        'may',
                        'jun',
                        'jul',
                        'aug',
                        'sep',
                        'oct',
                        'nov',
                        'dec'
                    ),
                },
                year: {
                    type: DataTypes.INTEGER,
                }
            },
            {
                sequelize,
                tableName: 'todo',
                timestamps: false,
              }
            ) as ModelStatic<TodoModel>;
    };
    public static associate(models: { [key: string]: ModelStatic<Model>}): void {
        this.belongsTo(UserModel, {
          foreignKey: 'user'
        });
        this.belongsTo(ClientModel, {
          foreignKey: 'client',
        });
      }
    }