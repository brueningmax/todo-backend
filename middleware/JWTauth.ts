import jwt from 'jsonwebtoken'
import { secret } from '../index';
import express, { Express, Request, Response } from 'express';
import { AuthenticatedRequest } from '../views/utils/types';


export const jwtAuth = (req: AuthenticatedRequest, res: Response, next: Function) => {
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

export const isAdmin = (req: AuthenticatedRequest, res: Response, next) => {
    if (! req.user.isAdmin) {
        return res.status(401).json({ message: 'User not authenticated' })
    }
    next()
}