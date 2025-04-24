const prisma = require("../config/db.config")

const getUsers = async (req, res)=> {
    try {
        const users = await prisma.user.findMany({
            select:{
                id: true,
                name: true,
                email: true,
                address: true,
                role: true,
                store: {
                    select: {
                        avgratings: true
                    }
                }
            }
        });
        res.send(users);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = getUsers;