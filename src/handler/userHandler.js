import UserService from "../service/userService.js";


export default class UserHandler {
    _service;

    constructor(){
        this._service = new UserService();

        this.postRegisterUserHandler = this.postRegisterUserHandler.bind(this);
        this.postLoginUserHandler = this.postLoginUserHandler.bind(this)
    }

    // POST /users/register
    async postRegisterUserHandler(req,res){
        const {username,password,role} = req.body;
        const result = await this._service.postUserRegisterService(username,password,role);
        res.json({
            status : 'success',
            data : result
        })
    }

    // POST /users/login
    async postLoginUserHandler(req,res){
        const {username,password} = req.body;
        const result = await this._service.postUserLoginService(username,password);
        res.json({
            status : 'success',
            token : result
        })
    }
}