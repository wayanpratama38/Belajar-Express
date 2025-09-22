import dotenv from 'dotenv'
import Express from 'express';
import { bookRouter } from './src/route/route.js';

dotenv.config();
const app = new Express();
app.use(Express.json());

app.get("/",(req,res)=>{
    res.send("HELLO WORLD!");
})

app.use('/books',bookRouter);

// middleware for not found route
app.use((req,res)=>{
    res.status(404).json({
        status : 'fail',
        message : 'Route not found'
    })
})

app.use((err,req,res,next)=>{
    // console.error(err.stack);
    res.status(err.statusCode || 500).json({
        status : err.statusCode ? 'fail' : 'error',
        message : err.message || 'Internal server Error'
    });
})

app.listen(process.env.PORT,()=>{
    console.log(`Server listening on localhost:${process.env.PORT}`);
})