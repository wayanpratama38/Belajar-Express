import Express from 'express';
import { bookRouter } from './src/route.js';

const app = new Express();
const port = 3000;
app.use(Express.json());

app.get("/",(req,res)=>{
    res.send("HELLO WORLD!");
})

app.get('/user/:id',(req,res)=>{
    const {id} = req.params;
    res.json({message : `User id is ${id}`});
})

app.get('/search',(req,res)=>{
    const {keyword} = req.query;
    res.json({message : `Keywoard is ${keyword}`});
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

app.listen(port,()=>{
    console.log(`Server listening on localhost:${port}`);
})