const validator = require("validator");
const prisma = require ("../config/db.config");
const bcrypt = require("bcrypt");

const createStore = async (req, res)=> {
    try {
        const {name, address, ownerId} = req.body;

        const user = await prisma.user.findUnique({
            where: {
                id: ownerId
            },
        })

        if(!user){
            throw new Error("Id not found");
        }

        const store = await prisma.store.create({
            data: {
                name: name,
                address: address,
                owner: { connect: {id: ownerId}}
            }
        })

        const updateUserRole = await prisma.user.update({
            where: {
                id: ownerId
            },
            data: {
                role: "STORE_OWNER"
            }
        })

        res.send("Store Created");

    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = createStore;