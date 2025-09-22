import {Router} from 'express';
import BookHandler from '../handler/bookHandler.js';

export const bookRouter = Router();
const bookHandler = new BookHandler();

bookRouter.get('/',bookHandler.getAllBooksHandler)
bookRouter.get('/:id',bookHandler.getBookByIdHandler)
bookRouter.post('/',bookHandler.postNewBookHandler)
bookRouter.put('/:id',bookHandler.putBookHandler)
bookRouter.delete('/:id',bookHandler.deleteBookHandler)


