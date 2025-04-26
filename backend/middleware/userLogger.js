const fs = require("fs");
const path = require("path");

module.exports = (req, res, next) => {
  const { username, role } = req.user;
  const logEntry = `${new Date().toISOString()} - ${username}:${role}\n`;
  fs.appendFileSync(path.join(__dirname, "../log.txt"), logEntry);
  next();
};
