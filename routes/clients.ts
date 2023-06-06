import express, { Express, Request, Response } from 'express';
import { getClients, getClientByID, createClient, updateClient, deleteClient } from '../views/clients';
const router = express.Router()


//get all clients
router.get('/', async (req:Request, res:Response) => {
    let data = await getClients()
    res.send(data)
})

// get client by ID
router.get('/:id', async (req:Request, res:Response) => {
    let data = await getClientByID(req.params.id)
    res.send(data)
})

// create clients
router.post('/new', async (req:Request, res:Response) => {
    let data = await createClient(req.body)
    res.status(data.status).json(data.json)
})
// update clients
router.patch('/:id', async (req:Request, res:Response) => {
    let data = await updateClient(req.params.id, req.body)
    res.status(data.status).json(data.json)
})
// delete clients
router.delete('/:id', async (req:Request, res:Response) => {
    let data = await deleteClient(req.params.id)
    res.sendStatus(data.status)
})

export default router
