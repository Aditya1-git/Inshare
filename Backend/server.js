const express = require('express');
const PORT = process.env.PORT || 3000;
const path = require('path');

const app = express();
app.set('trust proxy', 1);
app.use(express.static(path.join(__dirname, 'public')));




const connectDB = require('./config/db');
connectDB();
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