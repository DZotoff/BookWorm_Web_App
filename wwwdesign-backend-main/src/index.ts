import express, { type Request, type Response, type NextFunction } from 'express';
import session from 'express-session';
import cors from 'cors';
import crypto from 'crypto';

import { checkEnvironmentVariables } from './helper';
import {
  addBook,
  getBooks,
  updateBook,
  initDbConnPool,
  deleteBook,
  readBook,
  signup,
  getMe,
  login,
} from './db';

const HTTP_PORT = 3002;

declare module 'express-session' {
  export interface SessionData {
    userID: string
  }
}

const startHttpServer = (): void => {
  console.info(`[INFO] Starting Express HTTP server on port ${HTTP_PORT}`);

  const api = express();

  const checkUserSessionMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.session.userID) {
      res.status(401).send();
      return;
    }
    next();
  };

  api.use(cors({
    origin: [
      'http://10.20.10.63:3000',
      'http://localhost:3000',
    ],
    credentials: true,
  }));
  api.use(express.json());
  api.use(session({
    secret: 'kissa',
  }));

  api.get('/books', checkUserSessionMiddleware, async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.json(await getBooks(_req.session.userID));
    } catch (e) {
      next(e);
    }
  });

  api.post('/books', checkUserSessionMiddleware, async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.json(await addBook({
        ID: crypto.randomUUID(),
        title: _req.body.title,
        author: _req.body.author,
        userID: _req.session.userID,
        isbn: _req.body.isbn,
        publisher: _req.body.publisher,
        year: _req.body.year,
        pages: _req.body.pages,
        rating: _req.body.rating,
        note: _req.body.note,
        type: _req.body.type,
        genre: _req.body.genre,
        readDate: _req.body.readDate,
        ownedByMe: _req.body.ownedByMe,
        cover: _req.body.cover,
      }));
    } catch (e) {
      next(e);
    }
  });

  api.patch('/books/:bookID', checkUserSessionMiddleware, async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.json(await updateBook(_req.params.bookID, {
        title: _req.body.title,
        author: _req.body.author,
        userID: _req.session.userID,
        isbn: _req.body.isbn,
        publisher: _req.body.publisher,
        year: _req.body.year,
        pages: _req.body.pages,
        rating: _req.body.rating,
        note: _req.body.note,
        type: _req.body.type,
        genre: _req.body.genre,
        readDate: _req.body.readDate,
        ownedByMe: _req.body.ownedByMe,
        cover: _req.body.cover,
      }));
    } catch (e) {
      next(e);
    }
  });

  api.delete('/books/:bookID', checkUserSessionMiddleware, async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await deleteBook(_req.params.bookID);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  });

  api.patch('/books/:bookID/read', checkUserSessionMiddleware, async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await readBook(_req.params.bookID, _req.body.readDate);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  });

  api.post('/users', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ID = crypto.randomUUID();
      await signup({
        ID,
        email: _req.body.email,
        password: crypto.pbkdf2Sync(_req.body.password, 'kissa', 1000, 64, 'sha512').toString('hex'),
        firstName: _req.body.firstName,
        lastName: _req.body.lastName,
      });
      _req.session.userID = ID;
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  });

  api.post('/login', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await login(_req.body.username, crypto.pbkdf2Sync(_req.body.password, 'kissa', 1000, 64, 'sha512').toString('hex'));
      if (!user) {
        res.status(401).send();
      }
      _req.session.userID = user.ID;
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  });

  api.post('/logout', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      _req.session.destroy(() => {});
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  });

  api.get('/users/me', checkUserSessionMiddleware, async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await getMe(_req.session.userID);
      res.json({
        fisrtName: user.firstName,
        lastName: user.lastName,
      });
    } catch (e) {
      next(e);
    }
  });

  api.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({ error: { ...err, message: err.message } });
  });

  api.listen(HTTP_PORT, () => { console.info(`[INFO] Express HTTP server started on port ${HTTP_PORT}`); });
};

checkEnvironmentVariables();
initDbConnPool().then((): void => {
  startHttpServer();
}).catch((e: Error): void => {
  console.error('Cannot connect to database!');
  console.error(e);
  process.exit(1);
});
