const express = require("express");
const authRouter = express.Router();
const validator = require("validator");
const prisma = require ("../config/db.config");
const bcrypt = require("bcrypt");
const isPasswordValid = require("../utils/isPasswordValid");

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

        res.send("Login Successfull")

    } catch (error) {
        res.status(400).send(error.message)
    }
})

//SignUp
authRouter.post("/signup", async (req, res)=> {
    try {
        const {email, name, address, password} = req.body;

        const isEmail = validator.isEmail(email);
        if(!isEmail){
            throw new Error("Invalid Email...");
        }

        const hashPassword = await bcrypt.hash(password,10);

        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                address: address,
                password: hashPassword,
                role: "USER"
            }
        })

        res.send("User Created");

    } catch (error) {
        res.status(400).send(error.message);
    }
})

//Logout
authRouter.post("/logout", async (req,res) => {
    try {
        res.send("User Logout");
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = authRouter;