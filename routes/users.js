const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const router = express.Router();
router.use(express.json());
router.use(cors());


// mongoose.connect("mongodb://localhost:27017/employee");
const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

});
const EmployeeModel = mongoose.model("employees", EmployeeSchema);

router.post('/', (req, res) => {
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
});

router.post("/login", (req, res) =>{
    const {email, password} = req.body;
    EmployeeModel.findOne({email: email})
    .then(user => {
        if(user){
            if(user.password === password){
                res.send("Success");
            }else{
                res.json("the password is incorrect");
            }
        }else{
            res.json("No record existed")
        }
    })
})

module.exports = router;

// app.listen(3001, () => {
//     console.log("server is running")
// })