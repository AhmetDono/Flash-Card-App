const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Auth = require('./routes/auth')
const User = require ('./routes/user')
const FlashCard = require ('./routes/flashCard')

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Db connection is successfull"))
.catch((err)=>{console.log(err)});

app.use(express.json());
app.use(cors());
app.use('/api/auth',Auth);
app.use('/api/user',User);
app.use('/api/flash',FlashCard);


app.listen(process.env.PORT || 5000,()=>{
    console.log(`server is running on port: ${process.env.PORT}`)
})