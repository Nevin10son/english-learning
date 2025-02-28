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

app.post("/login", async(req, res) => {
    let user = req.body
    userModel.find({email:user.email}).then(
        (detail) => {
            if (detail.length == 0) {
                res.json({"Status":"invalid Emailid"})
                
            } else {
                let passcheck = bcrypt.compareSync(user.password,detail[0].password)
                if (passcheck) {
                    jwt.sign({email:user.email},"usertoken",{expiresIn:"1d"},(error, token) => {
                        if (error) {
                            res.json({"Status":"Error","Error":error})
                        }
                        else {
                            res.json({"Status":"Success","token":token,"userid":detail[0]._id,"name":detail[0].name})
                        }
                    })
                    
                } else {
                    res.json({"Status":"Incorrect Password"})
                }
            }
        }
    )
})

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
        return res.status(400).json({ Error: 'Missing required fields' });
    }

    try {
        // Check if email already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ Error: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Create and save the new user
        const user = new userModel({
            name,
            email,
            password: hashedPassword
        });
        await user.save();

        res.status(201).json({ Status: 'Success' });
    } catch (err) {
        if (err.code === 11000) { // Duplicate key error
            return res.status(400).json({ Error: 'Email already exists' });
        }
        console.error(err);
        res.status(500).json({ Error: 'Failed to save user' });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
