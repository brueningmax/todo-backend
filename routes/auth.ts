import express, { Express, Request, Response } from 'express';
import {getToken } from '../views/auth';
const router = express.Router()


//login
router.post('/', async (req:Request, res:Response) => {
    console.log(req.body)
    let data = await getToken(req.body)
    res.status(data.status).json(data.json)
})

export default router;