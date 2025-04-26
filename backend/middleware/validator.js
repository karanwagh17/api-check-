// middleware/validator.js
const validator = (req, res, next) => {
  const user = req.user;

  if (!user || user.role !== "Admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }

  next();
};

module.exports = validator;