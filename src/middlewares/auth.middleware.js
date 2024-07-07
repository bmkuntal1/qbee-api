const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const ApiError = require("../utils/ApiError");

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    const err=new ApiError(401, "Please authenticate");
    next(err);
  }
};

module.exports = auth;
