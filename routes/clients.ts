import express, { Express, Request, Response } from 'express';
const router = express.Router()

router.get('/', (req:Request, res:Response) => {
    res.send('clients')
})

// get all clients
// get clients
// create clients
// update clients
// delete clients

export default router
