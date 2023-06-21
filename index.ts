import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import usersRouter from './routes/users';
import todosRouter from './routes/todos';
import clientsRouter from './routes/clients';
import authRouter from './routes/auth'
import mainRouter from './routes/main'
import bodyParser from 'body-parser';
import { jwtAuth } from './middleware/JWTauth';
import { AuthenticatedRequest } from './views/utils/types';
import cors from 'cors'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
export const secret = String(process.env.SECRET);

// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server');
// });

app.post('/', jwtAuth, (req: AuthenticatedRequest, res: Response) => {
  res.send(req.user);
});

app.use(cors())
app.use(bodyParser.json())
app.use('/board', mainRouter)
app.use('/users', usersRouter)
app.use('/todos', todosRouter)
app.use('/clients', clientsRouter)
app.use('/auth', authRouter)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});