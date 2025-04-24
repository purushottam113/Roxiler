const express = require('express');
const connectDb = require("./config/database.js");
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const authRouter = require('./routes/auth.js');
const adminRouter = require('./routes/admin.js');
const userRouter = require('./routes/users.js');
const ownerRouter = require('./routes/owner.js');
const port = 3000

connectDb();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", adminRouter);
app.use("/", userRouter);
app.use("/", ownerRouter)

app.use("/", (req, res)=> {
  res.send("HomePage on 3000");
})