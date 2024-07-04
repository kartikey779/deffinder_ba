const express = require('express');
const router = express.Router();
const cors = require("cors");



router.use(express.json());
router.use(cors());

// to connect with your mongoDB database
const mongoose = require('mongoose');


//schema for users of app
const UserSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    word: {
        type: String,
        required: true,
        
        

    },
    meaning: {
        type: String,
        required: true,

    },
    date: {
        type: Date,
        default: Date.now,
    },
});
const Words = mongoose.model('words', UserSchema);
Words.createIndexes();


router.post("/",  async (req, resp) => {
    try {
        const word = new Words(req.body);
        let result =  await word.save();
        result = result.toObject();
        if (result) {
            delete result.password;
            resp.send(req.body);
            console.log(result);
        } else {
            console.log("User already register");
        }
 
    } catch (e) {
        resp.status(500).send("Something went wrong");
        console.error(e);
    }
});



//fetching data from database

//computer science get api
router.get("/computerscience", async (req, resp) =>{
    try{
        const words = await Words.find({ subject: "Computer science"});
        resp.json(words);
    } catch (e){
        console.error(e);
        resp.status(500).send("Something went wrong");
    }
});

//Economics get api

router.get("/economics", async (req, resp) =>{
    try{
        const words = await Words.find({ subject: "Economics"});
        resp.json(words);
    } catch (e){
        console.error(e);
        resp.status(500).send("Something went wrong");
    }
});

// music get api 

router.get("/music", async (req, resp) =>{
    try{
        const words = await Words.find({ subject: "Music"});
        resp.json(words);
    } catch (e){
        console.error(e);
        resp.status(500).send("Something went wrong");
    }
});

// a_alphabet api
router.get("/alphabet", async (req, resp) =>{
    try{
        let searchQuery = req.query.search || "Gang";
        const words = await Words.find({ "word": {"$regex": "^"+ searchQuery,"$options": 'i'} } );

       
        resp.json(words);
    } catch (e){
        console.error(e);
        resp.status(500).send("Something went wrong");
    }
});


async function connectToDatabase() {
    try {
      await mongoose.connect('mongodb://localhost:27017/DesiredWord');
      console.log('Connected to the DesiredWord database');
    } catch (err) {
      console.error('Error connecting to the database:', err);
    }
  }
  connectToDatabase();

module.exports = router;