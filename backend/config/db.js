const mongoose = require("mongoose");

const connetction = mongoose.connect("mongodb://127.0.0.1:27017/api")
module.exports=connetction