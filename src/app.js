const express = require('express');
const connectDb = require("./config/database.js");
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const authRouter = require('./routes/auth.js');
const port = 3000

connectDb();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);

app.use("/", (req, res)=> {
  res.send("HomePage on 3000");
})