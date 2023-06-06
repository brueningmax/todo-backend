import jwt from 'jsonwebtoken'
import { secret } from '../index';
import express, { Express, Request, Response } from 'express';

export const jwtAuth = (req: Request, res: Response, next) => {
    const token = req.headers.authorization;

    const [scheme, jwtToken] = token.split(' ');
    
    jwt.verify(jwtToken, secret, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }
        req.user = decoded; // Attach the user data to the request object
        next();
    });
}