import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import usersRouter from './routes/users';
import todosRouter from './routes/todos';
import clientsRouter from './routes/clients';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

//get whole table

app.use('/users', usersRouter)
app.use('/todos', todosRouter)
app.use('/clients', clientsRouter)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});