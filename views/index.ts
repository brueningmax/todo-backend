import { Sequelize } from 'sequelize';
import { UserModel } from '../models/user';
import { ClientModel } from '../models/client';
import { TodoModel } from '../models/todo';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './test.db',
});

const User = UserModel.initialize(sequelize);
const Client = ClientModel.initialize(sequelize);
const Todo = TodoModel.initialize(sequelize);

TodoModel.associate({ User: UserModel, Client: ClientModel});
ClientModel.associate({ Todo: TodoModel });
UserModel.associate({ Todo: TodoModel });

sequelize.sync()


export {sequelize, User, Client, Todo};