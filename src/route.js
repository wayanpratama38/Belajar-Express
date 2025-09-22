import {Router} from 'express';
import { books } from './book.js';
import { nanoid } from 'nanoid';

export const bookRouter = Router();

bookRouter.get('/',(req,res)=>{
    // get books information
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
    const id = `book-${nanoid(16)}`;
    
    // create new book object
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

    // get book index
    const index = getBookIndex(id);

    // get indexed
    const indexedBook = books[index];

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
    
    // get title,author and year from body
    const {title, author, year} = req.body;
    
    // get book index
    const bookIndex = getBookIndex(id);

    // replace old information into new information
    books[bookIndex] = {
        ...books[bookIndex],
        title : title,
        author : author,
        year : year
    };

    res.json({
        status : `success`,
        message : `Book information successfully updated`
    })
})

bookRouter.delete('/:id',(req,res)=>{
    // get id paramater
    const {id} = req.params;

    // get the book index
    const bookIndex= getBookIndex(id);

    // splice or delete selected index
    books.splice(bookIndex,1);

    res.json({
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
    const index= books.findIndex((book)=>book.id === bookId);
    return index;
}