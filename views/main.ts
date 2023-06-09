import { sequelize, User, Todo, Client } from ".";
import { ClientModel } from "../models/client";
import { TodoModel } from "../models/todo";
import { sortTodos } from "./utils";


export const getBoard = async (req: Request) => {
    let users = await User.findAll({
      attributes: ['id', 'name', 'role'],
      include: [
        {
          model: TodoModel,
          as: 'todos',
          include: [{ model: ClientModel }],
        },
      ],
      order: [
        sequelize.literal(`case when UserModel.id = 1 then 1 when UserModel.id = 2 then 3 else 2 end`),
      ],
    })
    const formattedData = await users.map(user => {
      const { id, name, role, todos } = user.dataValues;
      let todosData = todos.map(todo => {
        let client = todo.dataValues.ClientModel.dataValues
        todo.dataValues.client = client
        delete todo.dataValues.ClientModel
        return todo.dataValues
      })
      todosData = sortTodos(todosData)
      return {
        user: { id, name, role },
        todos: todosData
      };
    });
    return { status: 200, json: formattedData };
  }