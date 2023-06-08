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
  next_todo?: number | null,
  previous_todo?: number | null,
  user: number,
  client: number,
  month: string,
  year: number
}

export const createTodo = async (newTodo: Todo) => {
    try {

        // get last todo => todo.id
        let last_todo = await Todo.findOne({
          where: {
            user: 1,
            next_todo: null
          }
        })

        if (last_todo) {
          newTodo.previous_todo = last_todo.id
        } else {
          newTodo.previous_todo = null
        }


        newTodo.status = "open"
        newTodo.next_todo = null
        newTodo.user = 1
        const createdTodo = await Todo.create(newTodo)

        if (last_todo) {
          last_todo.next_todo = createdTodo.id
          await last_todo?.save()
        }

        return {status: 201, json: createdTodo};
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