const express = require('express');
const router = express.Router();
const cors = require("cors");
const compression = require('compression');



router.use(compression());
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

router.get('/subjects/uniqueSubjects', async (req, res) => {
    try {
      const uniqueSubjects = await Words.distinct('subject');
      res.json(uniqueSubjects);
    } catch (error) {
      console.error('Error fetching unique subjects:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });




router.get("/subjects/:subject", async (req, resp) => {
    const requestedSubject = req.params.subject;

    try {
        const words = await Words.find({ subject: requestedSubject }).limit(24);

        resp.json(words);
    } catch (e) {
        console.error(e);
        resp.status(500).send("Something went wrong");
    }
});



// a_alphabet api
router.get("/alphabet", async (req, res) => {
    try {
        const searchQuery = req.query.search || "Gang";
        
        // Use the 'i' option for case-insensitive matching
        const regex = new RegExp("^" + searchQuery, "i");

        // You can use projection to select specific fields if needed
        const words = await Words.find({ "word": { "$regex": regex } }).limit(24);

        res.json(words);
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong");
    }
});

async function connectToDatabase() {
    try {
       await mongoose.connect("mongodb+srv://deffinder:pyB10mCQbpgGz4Qv@cluster0.ewpqtiz.mongodb.net/?retryWrites=true&w=majority");
      console.log('Connected to the DesiredWord database');
    } catch (err) {
      console.error('Error connecting to the database:', err);
    }
  }
  connectToDatabase();

module.exports = router;