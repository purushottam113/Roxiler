const prisma = require("../config/db.config");

const getStore = async (req, res)=> {
    try {  
        const stores = await prisma.store.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                address: true,
                avgratings: true
            }
        })
        
        // const storedList = stores.map((store)=>{
        //     const totalRating = store.ratings.length;
        //     const ratingSum = store.ratings.reduce((sum, i)=> sum + r.rating, 0);
        //     const avg = totalRating ? math.round((ratingSum / totalRating)): "No ratings"

        //     return{
        //         id: store.id,
        //         name: store.name,
        //         email: store.email,
        //         address: store.address,
        //         avgratings: avg 
        //     }
        // })
        
        res.send(stores);

    } catch (error) {
        res.status(400).send(error.message)
    }

}

module.exports = getStore;