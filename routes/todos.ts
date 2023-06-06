import express, { Express, Request, Response } from 'express';
const router = express.Router()

router.get('/', (req:Request, res:Response) => {
    res.send('todos')
})

// get all todo
// get todo
// create todo
// update todo
// delete todo

export default router
