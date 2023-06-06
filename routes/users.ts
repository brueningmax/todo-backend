import express, { Express, Request, Response } from 'express';
import { createUser, getUserByID, getUsers, updateUser, deleteUser } from '../views/users';
const router = express.Router()


//get all users
router.get('/', async (req:Request, res:Response) => {
    let data = await getUsers()
    res.send(data)
})


// get user by ID
router.get('/:id', async (req:Request, res:Response) => {
    let data = await getUserByID(req.params.id)
    res.send(data)
})


// create user
router.post('/new', async (req:Request, res:Response) => {
    let data = await createUser(req.body)
    res.status(data.status).json(data.json)
})

// update user
router.patch('/:id', async (req:Request, res:Response) => {
    let data = await updateUser(req.params.id, req.body)
    res.status(data.status).json(data.json)
})
// delete user
router.delete('/:id', async (req:Request, res:Response) => {
    let data = await deleteUser(req.params.id)
    res.sendStatus(data.status)
})

export default router
