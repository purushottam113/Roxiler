const validator = require("validator");
const prisma = require ("../config/db.config");
const bcrypt = require("bcrypt");

const createUser = async (req, res)=> {
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
}

module.exports = createUser;