const express = require("express");
const createStore = require("../controllers/createStore");
const createAdmin = require("../controllers/createAdmin");
const adminRouter = express.Router();
const prisma = require ("../config/db.config");
const getStore = require("../controllers/getStore");
const getUsers = require("../controllers/getUsers");

//ADD NEW STORE
adminRouter.post("/newStore", createStore);

//ADD NEW ADMIN
adminRouter.post("/addAdmin", createAdmin)

//Total Numbers of Users
adminRouter.get("/usercount", async (req, res)=> {
    try {
        const userCount = await prisma.user.count();
        res.send(userCount);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//Total Numbers of Stores
adminRouter.get("/storecount", async (req, res)=> {
    try {
        const storeCount = await prisma.store.count();
        res.send(storeCount);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//Total Numbers of Ratings
adminRouter.get("/ratingcount", async (req, res)=> {
    try {
        const ratingCount = await prisma.rating.count();
        res.send(ratingCount);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//STORES LIST
adminRouter.get("/storelist", getStore);

//USERS LIST
adminRouter.get("/userlist", getUsers);



module.exports = adminRouter;