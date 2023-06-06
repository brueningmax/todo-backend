import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import usersRouter from './routes/users';
import todosRouter from './routes/todos';
import clientsRouter from './routes/clients';
import bodyParser from 'body-parser';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post('/', (req: Request, res: Response) => {
  res.send(req.body);
});

//get whole table

app.use(bodyParser.json())
app.use('/users', usersRouter)
app.use('/todos', todosRouter)
app.use('/clients', clientsRouter)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});