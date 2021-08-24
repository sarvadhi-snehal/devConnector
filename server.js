const express = require('express');
const connectDB = require('./config/db');
const app = express();

const port = process.env.PORT || 4000;
//databse connection 
connectDB();
app.use(express.json({extended: false}))
app.get('/', (req,res) => {
    res.send("API is runing")
})


//Routes
app.use('/api/users', require('./routes/API/users'))
app.use('/api/profile', require('./routes/API/profile'))
app.use('/api/posts', require('./routes/API/posts'))
app.use('/api/auth', require('./routes/API/auth'))


app.listen(port, ()=> console.log(`server is runnimg ${port}`))