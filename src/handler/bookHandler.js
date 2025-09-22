import BookService from "../service/bookService.js";
import { BookValidator } from "../validator/validator.js"

export default class BookHandler{
    _service;
    _validator;

    constructor(){
        this._service = new BookService();
        this._validator = BookValidator;

        this.getAllBooksHandler = this.getAllBooksHandler.bind(this)
        this.getBookByIdHandler = this.getBookByIdHandler.bind(this)
        this.postNewBookHandler = this.postNewBookHandler.bind(this)
        this.putBookHandler = this.putBookHandler.bind(this)
        this.deleteBookHandler = this.deleteBookHandler.bind(this)
    }

    //GET/books
    getAllBooksHandler(req,res){
        const data = this._service.getAllBooksService();
        res.json(
            {
                status : `success`,
                data : data
            }
        )
    }

    // GET/books/:id
    getBookByIdHandler(req,res){
        const { id } = req.params;
        const result = this._service.getBookByIdService(id);
        res.json({
            status: 'success',
            data : result
        })
    }

    // POST/books
    postNewBookHandler(req,res){
        const {title,author,year} = req.body;
        this._validator.validatePostNewBookPayload({title,author,year});
        this._service.postNewBookService(title,author,year);
        
        res.json({
            status : 'success',
            message : 'Successfully add new book'
        })
    }

    // PUT/books/:id
    putBookHandler(req,res){
        const { id } = req.params
        const {title,year,author} = req.body;
        this._validator.validatePostNewBookPayload({title,author,year})
        this._service.putBookService(id,title,author,year);
        res.json({
            status : `success`,
            message : `Book information successfully updated`
        })
    }

    // DELETE/books/:id
    deleteBookHandler(req,res){
        const { id } = req.params;
        this._service.deleteBookService(id);
        res.json({
            status : `success`,
            message : `Successfully deleted book with id : ${id}`
        });
    }
}