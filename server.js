const express = require('express');
const connectDB = require('./config/db');
const app = express();
const path = require('path');
const port = process.env.PORT || 4000;
//databse connection 
connectDB();
app.use(express.json({extended: false}))



//Routes
app.use('/api/users', require('./routes/API/users'))
app.use('/api/profile', require('./routes/API/profile'))
app.use('/api/posts', require('./routes/API/posts'))
app.use('/api/auth', require('./routes/API/auth'))

// serve static asset
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))

    app.get('*', (res,req)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build','index.html'))
    })
}
app.listen(port, ()=> console.log(`server is runnimg ${port}`))