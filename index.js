const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./Routes/authRoutes');
const userRoutes = require('./Routes/userRoutes');
const eventRoutes = require('./Routes/eventRoutes');
require('dotenv').config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vqva6ft.mongodb.net/EventSphere-db?retryWrites=true&w=majority&appName=Cluster0`

// Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Use authentication routes
app.use('/auth', authRoutes);

// base route
app.get('/', async(req,res)=>{
    res.send("Server is running");
})

// user Routes
app.use('/user', userRoutes);

// event routes
app.use('/event', eventRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
})