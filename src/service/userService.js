import { Pool } from "pg";
import bcrypt from 'bcrypt';
import { nanoid } from "nanoid";
import AuthenticationError from "../exception/authenticationError.js";
import { NotFound } from "../exception/notFound.js";
import jwt from 'jsonwebtoken'

export default class UserService {
    _pool;

    constructor(){
        this._pool = new Pool();
    }

    // POST /users/register
    async postUserRegisterService(username,password,role){
        const id = `user-${nanoid(16)}`
        const saltRound = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,saltRound);
        const query = {
            text : `
                INSERT INTO users(id,username,password,role)
                VALUES($1,$2,$3,$4)
                RETURNING id
            `,
            values : [id,username,hashedPassword,role]
        }
        const result = (await this._pool.query(query)).rows[0].id;
        console.log(result);
        return result;
    }

    // POST /users/login
    async postUserLoginService(username,password){
        const queryGetUserFromUsername = {
            text : `
                SELECT id,password FROM users WHERE username = $1
            `,
            values : [username]
        }
        const result = await this._pool.query(queryGetUserFromUsername);
        if(result.rowCount === 0){
            throw new NotFound("User aren't found")
        }
        const compareResult = await bcrypt.compare(password,result.rows[0].password);
        if(!compareResult){
            throw new AuthenticationError("Wrong password")
        }
        const id = result.rows[0].id;
        const token = jwt.sign({id : id},process.env.JWT_SECRET_KEY);
        return token;
    }
}