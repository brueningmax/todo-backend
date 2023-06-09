import express, { Express, Request, Response } from 'express';
import { getBoard } from '../views/main';
const router = express.Router()


//login
router.get('/', async (req:Request, res:Response) => {
    let data = await getBoard(req.body)
    res.status(data.status).json(data.json)
})

export default router;