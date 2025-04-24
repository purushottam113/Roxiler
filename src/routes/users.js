const express = require("express");
const userAuth = require("../middleware/auth");
const prisma = require("../config/db.config");
const userRouter = express.Router();

// GET STORES WITH SUMBITED RATING ROUTER
userRouter.get("/user/storeList", userAuth, async (req, res)=>{
    try {
        const user = req.user;

        const storeList = await prisma.store.findMany({
            include: {ratings:true}
        });

        const storeRating = storeList.map((store)=>{

            const avgRating = 
                !store.ratings || store.ratings.length === 0? 
                null
                :store.ratings.reduce((acc, obj) => acc + obj.rating, 0) / store.ratings.length

            const userRatingData = 
                !store.ratings || store.ratings.length === 0? 
                null
                :store.ratings.find((r)=>r.userId === user.id) 

            const userRating = userRatingData? userRatingData.rating : null

            return{
                name: store.name,
                address: store.address,
                ovaerallRating: avgRating,
                userSubmitedRating: userRating
            }
        })
        res.send(storeRating);
        
    } catch (error) {
        res.status(400).send(error.message)
    }

})

// USER SUBMIT RATING
userRouter.post("/user/rateToStore", userAuth, async(req, res)=>{
    try {
        const user = req.user;

        const {storeId, rating} = req.body;

        if(rating < 0 || rating > 5){
            throw new Error("Rating must be 0 To 5")
        }
    
        const existingRating = await prisma.rating.findFirst({
            where: {
                userId: user.id,
                storeId
            }
        })

        if(existingRating){
            await prisma.rating.update({
                where:{
                    id: existingRating.id
                },
                data: {
                    rating
                }
            })
        }
        
        else{
            await prisma.rating.create({
                data: {
                    rating,
                    user: {connect: { id: user.id}},
                    store: {connect: { id: storeId}},
                },
            })
        }
        res.json({message: "Rating Submitted.."})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

module.exports = userRouter;

