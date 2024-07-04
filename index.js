//code for mongoose config is backend 
// filename - backend/index.js



// for backend and express
const express = require('express');
const app = express();


const words = require('./routes/words');
const users = require('./routes/users');



console.log("App listen at port 5000");





app.use('/words', words);
app.use('/register', users);


app.get("/", (req, resp) =>{
    resp.send("App is working");
    //you can check backend is working or not by
    // entreing http://localhost:5000

    //if you see app is working means
    // backend working properly

});

app.listen(5000);


