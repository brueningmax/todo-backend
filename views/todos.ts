import { sequelize, Todo, Client } from ".";
import { ClientModel } from "../models/client";
import { UserModel } from "../models/user";
import { sortTodos } from "./utils/utils";
import { TodoType } from './utils/types'
import { getBoard } from './main'

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
  
  newTodo.status = "open"
  newTodo.nextTodo = null
  newTodo.previousTodo = null
  newTodo.user = 1
  const createdTodo = await Todo.create(newTodo)
    const priority = ['salary', 'high', 'medium', 'low']
    const indexOfPrio = priority.indexOf(createdTodo.priority)
    const unassignedTodos = await Todo.findAll({
      where: {user:1}
    })

    let previousTodo = null
    let nextTodo = null
    if (unassignedTodos.length > 1) {
      const sortedTodos = sortTodos(unassignedTodos).reverse()
      
      const priorityEnds: Array<any> = []
      priorityEnds.push(sortedTodos.find(todo => todo?.priority == 'salary'))
      priorityEnds.push(sortedTodos.find(todo => todo?.priority == 'high'))
      priorityEnds.push(sortedTodos.find(todo => todo?.priority == 'medium'))
      priorityEnds.push(sortedTodos.find(todo => todo?.priority == 'low'))

      console.log(priorityEnds)
      if (priorityEnds[indexOfPrio]) {
        previousTodo = priorityEnds[indexOfPrio].id
        nextTodo = priorityEnds[indexOfPrio].nextTodo
      } else {
        // looking for todo to attach to
        let foundPrevious = false
        for (let i = indexOfPrio; i >= 0; i--) {
          if (priorityEnds[i]) {
            previousTodo = priorityEnds[i].id
            nextTodo = priorityEnds[i].nextTodo
            foundPrevious = true
            break;
          }
        }
        // if we didnt find a point to attach to, we put the todo there and add the last element of the reversed array
        if (!foundPrevious) {
          previousTodo = null
          if (indexOfPrio === priority.length - 1){
            nextTodo = null
          } else {
            nextTodo = sortedTodos[sortedTodos.length - 1].id
          }
        }
      }

      console.log('previousTodo: 'previousTodo)
      console.log('nextTodo: 'nextTodo)

      if (previousTodo){
        const oldPrevious = await Todo.findByPk(previousTodo)
        oldPrevious.nextTodo = createdTodo.id
        oldPrevious.save()
      }
      
      if (nextTodo){
        const oldNext = await Todo.findByPk(nextTodo)
        oldNext.previousTodo = createdTodo.id
        oldNext.save()
      }
    }
      
    createdTodo.previousTodo = previousTodo
    createdTodo.nextTodo = nextTodo
    createdTodo.status = 'open'
    createdTodo.user = 1
    console.log(createTodo)
    const save = await createdTodo.save()
    const data = await getBoard()
    data.status = 201
    return data;
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

      // const priority = ['salary', 'high', 'medium', 'low']
      const priority = ['low', 'medium', 'high', 'salary']
      const indexOfPrio = priority.indexOf(todo.priority)
      const completedTodos = await Todo.findAll({
        where: {user:2}
      })

      let previousTodo = null
      let nextTodo = null
      
      if (completedTodos.length > 0) {
        const sortedTodos = sortTodos(completedTodos).reverse()
        
        const priorityEnds: Array<any> = []
        priorityEnds.push(sortedTodos.find(todo => todo.priority = 'low'))
        priorityEnds.push(sortedTodos.find(todo => todo.priority = 'medium'))
        priorityEnds.push(sortedTodos.find(todo => todo.priority = 'high'))
        priorityEnds.push(sortedTodos.find(todo => todo.priority = 'salary'))


        if (priorityEnds[indexOfPrio]) {
          previousTodo = priorityEnds[indexOfPrio].id
          nextTodo = priorityEnds[indexOfPrio].nextTodo
        } else {
          // looking for todo to attach to
          let foundPrevious = false
          for (let i = indexOfPrio; i >= 0; i--) {
            if (priorityEnds[i]) {
              previousTodo = priorityEnds[indexOfPrio].id
              nextTodo = priorityEnds[indexOfPrio].nextTodo
              foundprevious = true
              break;
            }
          }
          // if we didnt find a point to attach to, we put the todo there and add the last element of the reversed array
          if (!foundPrevious) {
            previousTodo = null
            if (indexOfPrio === priority.length - 1){
              nextTodo = null
            } else {
              nextTodo = sortedTodos[sortTodos.length - 1].id
            }
          }
        }

        if (previousTodo){
          const oldPrevious = await Todo.findByPk(previousTodo)
          oldPrevious.nextTodo = todo.id
          oldPrevious?.save()
        }
        
        if (nextTodo){
          const oldNext = await Todo.findByPk(nextTodo)
          oldNext.previousTodo = todo.id
          oldNext?.save()
        }
      }
        
      todo.previousTodo = previousTodo
      todo.nextTodo = nextTodo
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
        newPrevious.nextTodo = movedTodo.id;
        await newPrevious?.save()
      }
    }

    if (move.to.nextTodo) {
      let newNext = await Todo.findByPk(move.to.nextTodo)
      if (newNext) {
        newNext.previousTodo = movedTodo.id;
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


