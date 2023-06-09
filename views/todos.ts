import { sequelize, Todo, Client } from ".";
import { ClientModel } from "../models/client";
import { UserModel } from "../models/user";
import { sortTodos } from "./utils/utils";
import { TodoType } from './utils/types'

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

export const createTodo = async (newTodo: TodoType) => {
  try {

    // get last todo => todo.id
    let lastTodo = await Todo.findOne({
      where: {
        user: 1,
        nextTodo: null
      }
    })
    if (lastTodo) {
      newTodo.previousTodo = lastTodo.id
    } else {
      newTodo.previousTodo = null
    }
    
    newTodo.status = "open"
    newTodo.nextTodo = null
    newTodo.user = 1
    const createdTodo = await Todo.create(newTodo)

    if (lastTodo) {
      lastTodo.nextTodo = createdTodo.id
      await lastTodo?.save()
    }

    return { status: 201, json: createdTodo };
  } catch (error) {
    console.error('Error creating todo:', error);
    return { status: 500, json: { error: 'Failed to create todo' } };
  }
}

// update Todo
export const updateTodo = async (id: string, todoData: Partial<TodoType>) => {
  try {
    const todo = await Todo.findByPk(parseInt(id))
    if (todo) {
      for (let key in todoData) {
        (todo as any)[key] = (todoData as any)[key]
      }
      await todo.save()
    }
    return { status: 200, json: todo };
  } catch (error) {
    console.error('Error updating todo:', error);
    return { status: 500, json: { error: 'Failed to update todo' } };
  }
}

// complete Todo
export const completeTodo = async (id: string) => {
  try {
    const todo = await Todo.findByPk(parseInt(id))
    if (todo) {
      if (todo.nextTodo) {
        const nextTodo = await Todo.findByPk(parseInt(todo.nextTodo))
        nextTodo.previousTodo = todo.previousTodo
        await nextTodo?.save()
      }
      if (todo.previousTodo) {
        const previousTodo = await Todo.findByPk(parseInt(todo.previousTodo))
        previousTodo.nextTodo = todo.nextTodo
        await previousTodo?.save()
      }
      
      // TODO: putting the completed todo into the right spot 
      todo.status = 'completed'
      todo.user = 2
      await todo.save()
    }
    return { status: 200, json: todo };
  } catch (error) {
    console.error('Error updating todo:', error);
    return { status: 500, json: { error: 'Failed to update todo' } };
  }
}

//delete Todo
export const deleteTodo = async (id: string) => {
  try {
    const todo = await Todo.findByPk(parseInt(id))
    if (todo) {
      await todo.destroy()
      return { status: 204 };
    } else {
      return { status: 404 }
    }
  } catch (error) {
    console.error('Error deleting todo:', error);
    return { status: 500, json: { error: 'Failed to delete todo' } };
  }
}

// delete completed todos
export const deleteCompletedTodos = async () => {
  try {
    await Todo.destroy({
      where: {
        user: 4,
        status: 'completed'
      }
    })
    return { status: 204, json: { message: 'Todos deleted' } };

  } catch (error) {
    console.error('Error deleting todos:', error);
    return { status: 500, json: { error: 'Failed to delete todos' } };
  }
}

export const moveTodo = async (req: Request) => {
  const move = req.body
  try {
    let movedTodo = await Todo.findByPk(move.todoId)
    console.log(moveTodo)
    if (moveTodo === null) {
      return { status: 404, json: { error: 'todo not found' } };
    } else {

    movedTodo.user = move.to.userId
    movedTodo?.previousTodo = move.to.previousTodo ? move.to.previousTodo : null;
    movedTodo?.nextTodo = move.to.nextTodo ? move.to.nextTodo : null;
    await movedTodo?.save()

    if (move.from.previousTodo) {
      let oldPrevious = await Todo.findByPk(move.from.previousTodo)
      if (oldPrevious) {
        oldPrevious.nextTodo = move.from.nextTodo;
        await oldPrevious?.save()
      }
    }

    if (move.from.nextTodo) {
      let oldNext = await Todo.findByPk(move.from.nextTodo)
      if (oldNext) {
        oldNext.previousTodo = move.from.previousTodo;
        await oldNext?.save()
      }
    }

    if (move.to.previousTodo) {
      let newPrevious = await Todo.findByPk(move.to.previousTodo)
      if (newPrevious) {
        newPrevious.previousTodo = move.to.previousTodo;
        await newPrevious?.save()
      }
    }

    if (move.to.nextTodo) {
      let newNext = await Todo.findByPk(move.to.nextTodo)
      if (newNext) {
        newNext.previousTodo = move.to.nextTodo;
        await newNext?.save()
      }
    }

    return { status: 200, json: movedTodo };
  }
  } catch (error) {
    console.error('Error updating todo:', error);
    return { status: 500, json: { error: 'Failed to update todo' } };
  }
}


