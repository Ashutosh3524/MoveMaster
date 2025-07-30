const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes.js')
const contactRoutes = require('./routes/contactRoutes.js')
const reviewRoutes = require('./routes/reviewRoutes.js')
const blogRoutes = require('./routes/blogRoutes.js')
const settingsRoutes = require('./routes/settingsRoutes.js')


const app = express();
app.use(cors());
app.use(express.json());

//mongodb connect
mongoose.connect('mongodb://localhost:27017/admindb')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/api/admin', adminRoutes)
app.use('/api/contact', contactRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/settings', settingsRoutes);


app.listen(5000, ()=>{
    console.log(`The server is running at http://localhost:5000`)
});