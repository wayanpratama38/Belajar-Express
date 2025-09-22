import { nanoid } from "nanoid";
import { books } from "../model/book.js";
import { NotFound } from "../exception/notFound.js";

export default class BookService {
    // GET/books
    getAllBooksService() {
        const data = books;
        return data;
    }

    // GET/books/:id
    getBookByIdService(id){
        const index = this.getBookIndex(id);
        const result = books[index];
        return result;
    }

    // POST/books
    postNewBookService(title,author,year){
        const id = `book-${nanoid(16)}`
        const newBook = this.createBook(id,title,author,year)
        books.push(newBook);
        return newBook;
    }

    // PUT/books/:id
    putBookService(id,title,author,year){
        const bookIndex = this.getBookIndex(id);

        books[bookIndex] = {
            ...books[bookIndex],
            title : title,
            author : author,
            year : year
        }
    }

    // DELETE/books/:id
    deleteBookService(id){
        const bookIndex = this.getBookIndex(id);
        books.splice(bookIndex,1);
    }
    
    createBook(id,title,author,year){
        const newBook = {
            id : id,
            title :title,
            author: author,
            year : year
        }
    
        return newBook;
    }
    
    getBookIndex(bookId){
        const index= books.findIndex((book)=>book.id === bookId);
        if(index === -1) {
            throw new NotFound("Book isn't found");
        }
        return index;
    }
}
