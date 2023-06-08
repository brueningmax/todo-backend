import express, { Express, Request, Response, response } from 'express';
import { jwtAuth } from '../middleware/cookieJWTauth';
import { createTodo, getTodos, getTodoByID, updateTodo, deleteTodo, deleteCompletedTodos } from '../views/todos'
const router = express.Router()

// get all todo
router.get('/', async (req:Request, res:Response) => {
    let data = await getTodos()
    res.send(data)
})

// get todo
router.get('/:id', async (req:Request, res:Response) => {
    let data = await getTodoByID(req.params.id)
    res.send(data)
})

// create todo
router.post('/new', jwtAuth, async (req: Request, res: Response) => {
    let data = await createTodo(req.user.id, req.body)
    res.status(data.status).json(data.json)
})

// update todo
router.patch('/:id', async (req:Request, res:Response) => {
    let data = await updateTodo(req.params.id, req.body)
    res.status(data.status).json(data.json)
})


// delete todo
router.delete('/delete/:id', async (req:Request, res:Response) => {
    let data = await deleteTodo(req.params.id)
    res.sendStatus(data.status)
})

// delete completed todos
router.delete('/deleteCompleted', jwtAuth, async (req:Request, res:Response) => {
    let data = await deleteCompletedTodos(req)
    res.status(data.status).json(data.json)
})




export default router
