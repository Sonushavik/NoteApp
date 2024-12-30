const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth.js');
const noteRoutes = require('./routes/notes.js');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://sonuk06212:v3OukzQOnX1rOBkR@cluster0.twzch.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
}); 

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes); 

app.listen(5000, () => console.log('Server started on http://localhost:5000'));


// mongodb+srv://sonuk06212:v3OukzQOnX1rOBkR@cluster0.twzch.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0