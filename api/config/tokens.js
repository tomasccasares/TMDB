const jwt = require("jsonwebtoken");
const SECRET = "palabrasecreta";

const generateToken = (payload) => {
  const token = jwt.sign({ payload }, SECRET, { expiresIn: "2d" });
  return token;
};
const validateToken = (token) => jwt.verify(token, SECRET);

module.exports = { generateToken, validateToken };
