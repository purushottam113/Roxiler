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
        
        res.send(stores);

    } catch (error) {
        res.status(400).send(error.message)
    }

}

module.exports = getStore;