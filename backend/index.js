const express = require("express");
const connetction = require("./config/db");
const userRouter = require("./routes/userRoutes");
const cors = require("cors")
const app = express();
app.use(express.json());

app.use(cors(
  {
    origin:"http://localhost:5173"
  }
))
app.use("/api/user",userRouter)

app.listen(9999,async()=>{
  try {
    await connetction
    console.log("mongoose is connected")
    console.log('server is running')
    
  } catch (error) {
    
  }

})