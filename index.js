const express = require('express');
const app = express();
const mongoose =require('mongoose');
const cors = require('cors');
const port = process.env.PORT ||5000;
require('dotenv').config(); 
const userRoutes = require('./Routes/userRoutes');

// middlewares
app.use(express.json());

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vqva6ft.mongodb.net/EventSphere-db?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(mongoURI)
.then(()=>{
    console.log("Mongodb is connected")
})
.catch((err)=>{
    console.log(err);
})


// base route
app.get('/', async(req,res)=>{
    res.send("Server is running");
})

// user Routes
app.use('/user', userRoutes);

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})