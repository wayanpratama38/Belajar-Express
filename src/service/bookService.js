import { nanoid } from "nanoid";
import { books } from "../model/book.js";
import { NotFound } from "../exception/notFound.js";
import { Pool } from "pg";

export default class BookService {
    _pool;

    constructor(){
        this._pool = new Pool();
    }


    // GET/books
    async getAllBooksService() {
        const query = {
            text : `
                SELECT * FROM books;
            `
        }
        const result = (await this._pool.query(query)).rows;
        return result;
    }

    // GET/books/:id
    async getBookByIdService(id){
        const query = {
            text : `
                SELECT * FROM books WHERE id = $1
            `,
            values : [id]
        }
        
        const result = (await this._pool.query(query));
        if(result.rowCount===0){
            return [];
        }
        return result.rows[0];
    }

    // POST/books
    async postNewBookService(title,author,year){
        const id = `book-${nanoid(16)}`
        const query = {
            text : `
                INSERT INTO books
                VALUES($1,$2,$3,$4)
                RETURNING id
            `,
            values : [id,title,author,year]
        }
        const result = (await this._pool.query(query)).rows[0].id;
        return result;
    }

    // PUT/books/:id
    async putBookService(id,title,author,year){
        const query = {
            text : `
                UPDATE books
                SET title=$1, author=$2, year=$3
                WHERE id=$4
            `,
            values : [title,author,year,id]
        }
        await this._pool.query(query);
    }

    // DELETE/books/:id
    async deleteBookService(id){
        const query = {
            text : `
                DELETE FROM books WHERE id = $1
            `,
            values : [id]
        };
        await this._pool.query(query);
    }
}
