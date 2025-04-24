const validator = require("validator");
const prisma = require ("../config/db.config");
const bcrypt = require("bcrypt");

const createAdmin = async (req, res)=> {
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
                role: "ADMIN"
            }
        })

        res.send("Admin Created");

    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = createAdmin;