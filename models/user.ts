import { Model, DataTypes, Sequelize, ModelStatic } from 'sequelize';
import { TodoModel } from './todo';

export class UserModel extends Model {
  public id!: number;
  public name!: string;
  public password!: string;
  public role!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize(sequelize: Sequelize): ModelStatic<UserModel> {
    return super.init.call(
      this,
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: sequelize.col('name'),
        },
        role: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0
        },
      },
      {
        sequelize,
        tableName: 'user',
        timestamps: false,
      }
    ) as ModelStatic<UserModel>;
  }

  public static associate(models: { [key: string]:  ModelStatic<TodoModel> }): void {
    // A User can have many Todos
    this.hasMany(TodoModel, { foreignKey: 'user', as: 'todos' });
  }
}