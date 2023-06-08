import { Model, DataTypes, Sequelize, ModelStatic } from 'sequelize';
import { TodoModel } from './todo';

export class ClientModel extends Model {
  public id!: number;
  public name!: string;
  public address!: string;
  public contact!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize(sequelize: Sequelize): ModelStatic<ClientModel> {
    return super.init.call(
      this,
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        contact: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'client',
        timestamps: false,
      }
    ) as ModelStatic<ClientModel>;
  }

  public static associate(models: { [key: string]: ModelStatic<TodoModel> }): void {
    // A Client can have many Todos
    this.hasMany(TodoModel, { foreignKey: 'client', as: 'todos', onDelete: 'CASCADE' });
  }
}