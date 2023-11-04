const express = require('express');
const mongoose = require('mongoose')

require('dotenv').config();

const app = express();

const tasks = require('./routes/tasks')

app.use(express.json());

app.use('/api/v1/tasks', tasks);
app.use(express.static("./public"));



const PORT = 5000;
const start = async (url) => {
    await mongoose.connect(url)
    app.listen(PORT, ()=>console.log(`Server listening at port ${PORT}`))
}

start(process.env.MONGO_URI)