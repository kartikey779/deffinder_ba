// for backend and express
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;


const words = require('./routes/words');
const users = require('./routes/users');
const blogs = require('./routes/blogs');


console.log("App listen at port 5000");


app.use('/words', words);
app.use('/register', users);
app.use('/blogs',blogs);
app.use(cors());


app.get("/", (req, resp) =>{
    resp.send("App is working");
});

app.listen(PORT);