import express, { Express, Request, Response, response } from 'express';
import { jwtAuth } from '../middleware/JWTauth';
import { createTodo, getTodos, getTodoByID, updateTodo, deleteTodo, deleteCompletedTodos, moveTodo, completeTodo } from '../views/todos'
import { getBoard } from '../views/main';


const router = express.Router()


// create todo
router.post('/new', jwtAuth, async (req: Request, res: Response) => {
    let data = await createTodo(req.body)
    res.status(data.status).json(data.json)
})


// move todo
router.patch('/moveTodo', async (req:Request, res:Response)=> {
    await moveTodo(req)
    let data = await getBoard()
    res.status(data.status).json(data.json)
})

// delete todo
router.delete('/delete/:id', async (req:Request, res:Response) => {
    let data = await deleteTodo(req.params.id)
    res.sendStatus(data.status)
})

// complete todo
router.patch('/complete/:id', async (req:Request, res:Response) => {
    let data = await completeTodo(req.params.id)
    if (data.status === 200) {
        data = await getBoard()
    }
    res.status(data.status).json(data.json)
})

// delete completed todos
router.delete('/deleteCompleted', jwtAuth, async (req:Request, res:Response) => {
    let data = await deleteCompletedTodos()
    res.status(data.status).json(data.json)
})

// get todo
router.get('/:id', async (req:Request, res:Response) => {
    let data = await getTodoByID(req.params.id)
    res.send(data)
})

// update todo
router.patch('/:id', async (req:Request, res:Response) => {
    let data = await updateTodo(req.params.id, req.body)
    res.status(data.status).json(data.json)
})

// get all todo
router.get('/', async (req:Request, res:Response) => {
    let data = await getTodos()
    res.send(data)
})


export default router
