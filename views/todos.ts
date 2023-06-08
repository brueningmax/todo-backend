import { sequelize, User, Todo, Client } from ".";
import { ClientModel } from "../models/client";
import { UserModel } from "../models/user";


export const getTodos = async () => {
  let todos = await Todo.findAll({
    // attributes: ['id', 'type'],
    include: [
      {
        model: UserModel,
      },
      {
        model: ClientModel,
      }
    ]
  })
  const formattedData = todos.map(todo => todo.dataValues)
  return formattedData;
}

export const getTodoByID = async (id: string) => {
  let todos = await Todo.findAll({
      where: {
          id: id
      },
      // attributes: ['id', 'name', 'password', 'role'],
      include: [
        {
          model: UserModel,
        },
        {
          model: ClientModel,
        }
      ]
  })
  const formattedData = todos.map(todo => todo.dataValues)
  return formattedData;
}

type User = {
    name: string;
    password?: string;
    role?: string;
  };

type Todo = {
  priority: string,
  type: string,
  notes: string,
  status: string,
  user: number,
  client: number,
  month: string,
  year: number
}

export const createTodo = async (user: number, todoData: Todo) => {
    try {
        const { 
          priority,
          type,
          notes,
          status,
          client,
          month,
          year} = todoData;
          
    
        // Create a new user instance
        const todo = await Todo.create({
          priority,
          type,
          notes,
          status,
          user,
          client,
          month,
          year
        });

        return {status: 201, json: todo};
      } catch (error) {
        console.error('Error creating todo:', error);
        return {status: 500, json: { error: 'Failed to create todo' }};
      }
}

// update Todo
export const updateTodo = async (id: string, todoData: Partial<Todo>) => {
  try {
      const todo = await Todo.findByPk(parseInt(id))
      if (todo) {
          for (let key in todoData) {
            todo[key] = todoData[key]
          }
          await todo.save()
      }
      return {status: 200, json: todo};
  } catch (error) {
      console.error('Error updating todo:', error);
      return {status: 500, json: { error: 'Failed to update todo' }};
    }
}

//delete Todo
export const deleteTodo = async (id: string) => {
  try {
      const todo = await Todo.findByPk(parseInt(id))
      if (todo) {
          await todo.destroy()
          return {status: 204};
      } else {
          return {status: 404}
      }
  } catch (error) {
      console.error('Error deleting todo:', error);
      return {status: 500, json: { error: 'Failed to delete todo' }};
    }
}

// delete completed todos
export const deleteCompletedTodos = async (req:Request) => {
  console.log('HIIIIIIIEEEEEER')
  console.log(req.user)
  if (req.user.role != 2) {
    return {status: 401, json: { error: 'Not authorized' }};
  }
  try {
      await Todo.destroy({
        where: {
          user: 4,
          status: 'completed'
        }
      })
          return {status: 204, json: {message: 'Todos deleted' }};
    
  } catch (error) {
      console.error('Error deleting todos:', error);
      return {status: 500, json: { error: 'Failed to delete todos' }};
    }
}