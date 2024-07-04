const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const router = express.Router();
router.use(express.json());
router.use(cors());


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
    const {emailLogin, passwordLogin} = req.body;
    EmployeeModel.findOne({email: emailLogin})
    .then(user => {
        if(user){
            if(user.password === passwordLogin){
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