import {Router} from 'express';
import { books } from './book.js';
import { nanoid } from 'nanoid';

export const bookRouter = Router();

bookRouter.get('/',(req,res)=>{
    const data = books;
    res.json(
        {
            status : `success`,
            data : {
                data : data
            }
        }
    )
})

bookRouter.post('/',(req,res)=>{
    // judul, penulis, tahun
    const {title,author,year} = req.body;
    // create book id
    const id = nanoid(`book-${nanoid(16)}`);
    const newBook = createBook(id,title,author,year);
    // push new book into array
    books.push(newBook);
    res.json({
        status : 'success',
        message : 'Successfully add new book'
    })
})

bookRouter.get('/:id',(req,res)=>{
    // get id from params
    const {id} = req.params;

    const indexedBook = books.map((book)=>{
        if(book.id === id) {
            return book
        }
    });
    
    console.log(`indexed book`,indexedBook);
    res.json({
        status : 'success',
        data : {
            indexedBook
        }
    })
})

bookRouter.put('/:id',(req,res)=>{
    // get id from params
    const {id} = req.params;
    const {title, author, year} = req.body;
    const bookIndex = getBookIndex(id);

    console.log('Book index',bookIndex);
    books[bookIndex] = {
        ...books[bookIndex],
        title : title,
        author : author,
        year : year
    };
    return res.json({
        status : `success`,
        message : `Book information successfully updated`
    })
})

bookRouter.delete('/:id',(req,res)=>{
    const {id} = req.params;

    const bookIndex= getBookIndex(id);

    books.splice(bookIndex,1);
    return res.json({
        status : `success`,
        message : `Successfully deleted book with id : ${id}`
    });
})


function createBook(id,title,author,year){
    const newBook = {
        id : id,
        title :title,
        author: author,
        year : year
    }
    return newBook;
}

function getBookIndex(bookId){
    const index= books.map((book)=>{
        if(book.id === bookId){
            return book
        }
    }).indexOf(bookId);
    return index;
}