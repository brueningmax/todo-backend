export type LoginData = {
    username: string,
    password: string
}

export type JWTUser = {
    id: number,
    name: string,
    isAdmin: number
}

export interface AuthenticatedRequest extends Request {
    user: JWTUser; // Replace `any` with the actual type of your `user` object
  }

export type UserType = {
    name: string;
    password?: string;
    isAdmin?: string;
  };

export type TodoType = {
  priority: string,
  type: string,
  notes: string,
  status: string,
  nextTodo?: number | null,
  previousTodo?: number | null,
  user: number,
  client: number,
  month: string,
  year: number
}