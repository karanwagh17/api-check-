const express = require("express"); 
  
  const { getSingleUser,signup, signin, getuserData, updateUser, deleteUser,   } = require("../controllers/user.controller");
const auth = require("../middleware/authenticator");
const validator= require("../middleware/validator")

const userRouter = express.Router()

userRouter.post("/signup",signup)
userRouter.post("/signin",auth,signin)
userRouter.get("/getuserData",getuserData)
userRouter.patch("/update/:id", auth, validator, updateUser);
userRouter.delete("/delete/:id", auth, validator, deleteUser);
userRouter.get("/getSingleUser/:id",getSingleUser)


module.exports=userRouter                                  



