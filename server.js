import express from 'express';

const app = express();

const port = process.env.PORT || 6000;

app.get('/', (req,res) => {
    res.send("API is runing")
})
app.listen(port, ()=> console.log(`server is runnimg ${port}`))