const express = require("express")
const cors = require("cors")
const mongoose  = require("mongoose")
require("dotenv").config();
const userModel = require('./models/user')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://Nevin:nevin235235@cluster0.0rfrr.mongodb.net/language-learner?retryWrites=true&w=majority&appName=Cluster0")




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
