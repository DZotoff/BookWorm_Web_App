/* eslint-disable @typescript-eslint/no-unused-vars */
import mysql from 'promise-mysql';
import moment from 'moment';

import type Book from './types/db/Book';
import type User from './types/db/User';

// Define DB table names
const DB_TABLE_BOOKS = 'Books';
const DB_TABLE_USERS = 'Users';

// Define DB connection details
const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
} = process.env;

let dbConnPool: mysql.Pool;

export const initDbConnPool = async (): Promise<void> => {
  console.log('[DB] Connecting to database');

  // Create MySQL connection pool
  dbConnPool = await mysql.createPool({
    connectionLimit: 10,
    host: DB_HOST,
    port: parseInt(DB_PORT ?? '3306', 10),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    charset: 'utf8mb4',
    typeCast: (field, next) => {
      if (field.type === 'TINY' && field.length === 1) {
        return (field.string() === '1'); // 1 = true, 0 = false
      }
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      return next();
    },
  });

  // Test connection
  await dbConnPool.query(`SELECT * FROM ${DB_TABLE_BOOKS}`);

  console.log('[DB] Database connected');
};

export const getBooks = async (userID?: string): Promise<Book[]> => await dbConnPool.query(`SELECT * FROM ${DB_TABLE_BOOKS} WHERE userID = ?`, userID);

export const addBook = async (book: Book): Promise<Book> => {
  await dbConnPool.query(`INSERT INTO ${DB_TABLE_BOOKS} SET ?`, book);
  return (await dbConnPool.query(`SELECT * FROM ${DB_TABLE_BOOKS} WHERE ID = ?`, book.ID))[0];
};

export const updateBook = async (ID: string, book: Book): Promise<Book> => {
  await dbConnPool.query(`UPDATE ${DB_TABLE_BOOKS} SET ? WHERE ID = ?`, [book, ID]);
  return (await dbConnPool.query(`SELECT * FROM ${DB_TABLE_BOOKS} WHERE ID = ?`, ID))[0];
};

export const deleteBook = async (ID: string): Promise<any> => await dbConnPool.query(`DELETE FROM ${DB_TABLE_BOOKS} WHERE ID = ?`, ID);

export const readBook = async (ID: string, date: string): Promise<null> => {
  await dbConnPool.query(`UPDATE ${DB_TABLE_BOOKS} SET readDate = ? WHERE ID = ?`, [date, ID]);
  return null;
};

export const signup = async (user: User): Promise<User> => {
  await dbConnPool.query(`INSERT INTO ${DB_TABLE_USERS} SET ?`, user);
  return (await dbConnPool.query(`SELECT * FROM ${DB_TABLE_USERS} WHERE ID = ?`, user.ID))[0];
};

export const getMe = async (ID?: string): Promise<User> => (await dbConnPool.query(`SELECT * FROM ${DB_TABLE_USERS} WHERE ID = ?`, ID))[0];

export const login = async (username: string, password: string): Promise<User> => (await dbConnPool.query(`SELECT * FROM ${DB_TABLE_USERS} WHERE email = ? AND password = ?`, [username, password]))[0];
