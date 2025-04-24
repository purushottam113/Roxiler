const jwt = require('jsonwebtoken');
const prisma = require('../config/db.config');


const userAuth = async (req,res,next) => {
    try {
        const token = req.cookies.token;

        if(!token){
            return res.status(401).send("Unauthorized Access");
        }

        const decodedUser = jwt.verify(token, "Moonlight")
        const {id} = decodedUser;

        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if(!user){
            return res.status(401).send("User Not Found");
        }

        req.user = user
        next()

    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = userAuth;