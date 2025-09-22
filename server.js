import Express from 'express';
import { bookRouter } from './src/route.js';

const app = new Express();
const port = 3000;

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

app.listen(port,()=>{
    console.log(`Server listening on localhost:${port}`);
})