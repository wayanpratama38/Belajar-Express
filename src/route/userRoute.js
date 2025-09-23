import {Router} from 'express';
import UserHandler from '../handler/userHandler.js';

export const userRouter = new Router();
const userHandler = new UserHandler();

userRouter.post('/register',userHandler.postRegisterUserHandler);
userRouter.post('/login',userHandler.postLoginUserHandler);