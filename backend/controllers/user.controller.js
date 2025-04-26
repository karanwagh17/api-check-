const userModel = require("../models/User");
const userLogger = require("../middleware/userLogger");
const signup = async (req, res) => {
  const { username, email, dob, role, location, password, confirmPassword } =
    req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "Account already exists" });
    }

    const userCreate = await userModel.create({ ...req.body });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    req.user = user;

  

    userLogger(req, res, () => {
      res.json({
        message: "Login successful",
        user: { username: user.username, role: user.role ,password:user.password },
      });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getuserData = async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getSingleUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findOne({_id:id});

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await userModel.findByIdAndUpdate(
      { _id: id }, 
      { $set: req.body }, 
      { new: true }
    );
    res.json({ message: "User updated", user: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await userModel.findByIdAndDelete({_id:id});
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  signup,
  signin,
  getuserData,
  updateUser,
  deleteUser,
  getSingleUser
};
