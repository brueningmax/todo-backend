import express, { Express, Request, Response } from 'express';
import {getToken } from '../views/auth';
const router = express.Router()


//login
router.post('/', async (req:Request, res:Response) => {
    let data = await getToken(req.body)
    res.status(data.status).cookie("token", data.json.token).json(data.json)
})

export default router;