
const clientTable: string = `
CREATE TABLE IF NOT EXISTS "client" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contact" TEXT NOT NULL
  );
  `
const userTable: string = `
  CREATE TABLE IF NOT EXISTS "user" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" INTEGER CHECK (isAdmin IN (0, 1))
  );
  `
const todoTable: string = `
  CREATE TABLE IF NOT EXISTS "todo" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "priority" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "user" INTEGER NOT NULL,
    "client" INTEGER NOT NULL,
    "nextTodo" INTEGER,
    "previousTodo" INTEGER,
    "month" TEXT CHECK(month IN ('jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec')),
    "year" INTEGER,
    CONSTRAINT "fk_todo__client" FOREIGN KEY ("client") REFERENCES "client" ("id") ON DELETE CASCADE,
    CONSTRAINT "fk_todo__user" FOREIGN KEY ("user") REFERENCES "user" ("id") ON DELETE CASCADE,
    CONSTRAINT "fk_todo__nextTodo" FOREIGN KEY ("nextTodo") REFERENCES "todo" ("id") ON DELETE CASCADE,
    CONSTRAINT "fk_todo__previousTodo" FOREIGN KEY ("previousTodo") REFERENCES "todo" ("id") ON DELETE CASCADE
);
`
const userSetup: string = `
  INSERT INTO user ('name', 'password', 'isAdmin')
    VALUES 
    ('not assigned', 'no_login', 1),
    ('completed', 'no_login', 1),
    ('Admin', 'admin', 1),
    ('user', 'user', 0)
;
`

const clientSetup: string = `
  INSERT INTO client ('name', 'address', 'contact')
    VALUES 
    ('1', '1', '1'),
    ('2', '2', '2'),
    ('3', '3', '3')
;
`


export const queries = [clientTable, userTable, todoTable, userSetup, clientSetup]