import express, { Express, Request, Response } from 'express';
const router = express.Router()

router.get('/', (req:Request, res:Response) => {
    res.send('users')
})

// get all users
// get user
// create user
// update user
// delete user

export default router
