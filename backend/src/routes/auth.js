const express = require("express");
const authRouter = express.Router();
const validator = require("validator");
const prisma = require ("../config/db.config");
const isPasswordValid = require("../utils/isPasswordValid");
const createUser = require("../controllers/createUser");
const getJWT = require("../utils/jwt");
const userAuth = require("../middleware/auth");
const bcrypt = require("bcrypt");

//Login
authRouter.post("/login", async (req, res) => {
    try {
        const {email, password, role} = req.body;
        
        const isEmail = validator.isEmail(email);
        if(!isEmail){
            throw new Error("Invalid Email...");
        }

        const user = await prisma.user.findUnique({
            where:{
                email: email,
                role: role
            }
        })
        if(!user){
            throw new Error("Invalid Creditionals");
        }

        const passwordCheck = isPasswordValid(user.password, password);
        if(!passwordCheck){
            throw new Error("Invalid Creditionals");
        }
        else{
            const jwtToken = await getJWT(user);
            res.cookie("token", jwtToken, { expires: new Date(Date.now() + 604800000)});
        }

        res.json({message: "Login Successfull"})

    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//SignUp
authRouter.post("/signup", createUser);

//Logout
authRouter.post("/logout", async (req,res) => {
    try {
        res.clearCookie("token");
        res.send("User Logout");
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// UPDATE PASSWORD
authRouter.patch("/updatePassword", userAuth, async (req, res) => {
    try {
        const {emailID, password} = req.body;
        const loginUser = req.user;
        const hashPassword = await bcrypt.hash(password,10);

        const user = await prisma.user.update({
            where: {
                id: loginUser.id
            },
            data: {
                password: hashPassword
            }
        })

        
        if(!user){
            throw new Error("Invalid Creditionals")
        }

        res.send("Password Update Sucessfully!!")

    } catch (error) {
        res.status(400).send("Error: " + error.message)
    }
})


module.exports = authRouter;