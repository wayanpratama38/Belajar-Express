import Express from 'express';

const app = new Express();
const port = 3000;

app.get("/",(req,res)=>{
    res.send("HELLO WORLD!");
})

app.listen(port,()=>{
    console.log(`Server listening on localhost:${port}`);
})