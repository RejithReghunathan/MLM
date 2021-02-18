require('dotenv').config();

const express = require('express')
const app = express()
const mongoose = require('mongoose')

// DB connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify: false,    
    useCreateIndex:true
}).then(()=>{
    console.log("Database connected Successfully");
}).catch((err)=>{
    console.log(err);
})

// PORT
const port = process.env.PORT || 8000

// starting app
app.listen(port,()=>{
    console.log(
       `Server is up and running on Port ${port}`
    );
})