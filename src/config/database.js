const prisma = require("./db.config");

async function connectDb() {
    try {
        await prisma.$connect();
        console.log("Db is Connected");
    } catch (error) {
        console.log("Failed to connect to DB: ", error);
    }
}

module.exports = connectDb;