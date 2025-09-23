import {Router} from 'express';
import BookHandler from '../handler/bookHandler.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

export const bookRouter = Router();
const bookHandler = new BookHandler();

bookRouter.get('/',bookHandler.getAllBooksHandler)
bookRouter.get('/:id',bookHandler.getBookByIdHandler)

bookRouter.post('/',authMiddleware,bookHandler.postNewBookHandler)
bookRouter.put('/:id',authMiddleware,bookHandler.putBookHandler)
bookRouter.delete('/:id',authMiddleware,bookHandler.deleteBookHandler)


