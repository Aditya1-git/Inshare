const express = require('express');
const PORT = process.env.PORT || 3000;
const path = require('path');
const cors = require('cors');

const app = express();
app.set('trust proxy', 1);
app.use(express.static(path.join(__dirname, 'public')));

const connectDB = require('./config/db');
connectDB();

//cors

const corsOptions = {
    origin: process.env.ALLOWED_CLIENTS.split(',') // ['http://localhost:3000' , 'http://localhost:3000' , 'http://localhost:3000']
    
}


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Templete engine

app.set('views' , path.join(__dirname, '/views'));
app.set('view engine' , 'ejs');


app.use('/api/files',require('./Routes/files'));
app.use('/files' , require('./Routes/show'));


app.listen(PORT , () => {
    console.log(`Listening to port ${PORT}`);
})