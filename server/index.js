const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const dotenv = require("dotenv").config()

const app = express();
app.use(cors({origin:"*"}))
app.use(express.json({ limit: "20mb" }))

const PORT = process.env.PORT || 8080

//mongodb connection
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err))

//schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    confirmPassword: String,
    image: String,
})

//Model
const userModel = mongoose.model("user", userSchema)

//api
app.get('/', (req, res) => {
    res.send("server is running")
});

//Sign Up api
app.post("/signup", async (req, res) => {
    console.log(req.body)
    const { email } = req.body

    userModel.findOne({ email: email }, (err, result) => {
        console.log(result)
        console.log(err)
        if (result) {
            res.send({ message: "Email is already register", alert: false })
        } else {
            const data = userModel(req.body)
            const save = data.save()
            res.send({ message: "Sucessfully Registered", alert: true })
        }
    })
});

//login api
app.post("/login", (req, res) => {
    console.log(req.body)
    const { email } = req.body
    userModel.findOne({ email: email }, (err, result) => {
        if (result) {
            const dataSend = {
                _id: result._id,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                image: result.image,
            }
            console.log(dataSend)
            res.send({ message: "Login is Successfully", alert: true, data: dataSend })
        } else {
            res.send({ message: "Email is not available, Sign Up", alert: false })
        }
    })
});


//Product Section
// product scema
const schemaProduct = mongoose.Schema({
    name: String,
    category: String,
    image: String,
    price: String,
    description: String,
});

//product model
const productModel=mongoose.model("product",schemaProduct)

//upload or Save product in Database.
//api
app.post("/uploadProduct",async(req,res)=>{
    console.log(req.body)
    const data= await productModel(req.body)
    const dataSave=await data.save()
    res.send({message:"Upload Successfully"})
})

//
app.get("/product", async(req,res)=>{
    const data= await productModel.find({})
    res.send(JSON.stringify(data))
})


//server listening
app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`)
})
