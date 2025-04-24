const express = require("express");
const prisma = require("../config/db.config");
const userAuth = require("../middleware/auth");
const ownerRouter = express.Router();

// OWNER STORE USERS REVIEWS
ownerRouter.get("/owner/userDetails", userAuth, async (req, res)=>{
    try {
        const owner = req.user;

        const user = await prisma.store.findFirst({          
            where: {
                ownerId: owner.id
            },
                include: {
                    ratings: {
                        include: {
                            user: {
                                select: {
                                    name: true,
                                    email: true
                                }
                            }
                        }
                    }
                }
        })
        res.send(user)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// AVERAGE RATING STORE
ownerRouter.get("/owner/avgRating", userAuth, async (req, res)=> {
    try {
        const owner = req.user;

        


    } catch (error) {
        res.status(400).send(error.message);
    }

})

module.exports = ownerRouter;