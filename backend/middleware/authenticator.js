// middleware/authenticator.js
const userModel = require("../models/User");

const auth = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const user = await userModel.findOne({ username });
   

    if (!user) {
    return res.status(401).json({ message: "Invalid " });

    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });

    }

    req.user = user;


    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = auth;