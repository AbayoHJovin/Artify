const jwt = require("jsonwebtoken");
require("dotenv").config();

function checkAuth(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error("Invalid token");
    }
    const requester = jwt.verify(token, process.env.SECRET_KEY);
    if (!requester) {
      throw new Error("No requester");
    }
    req.user = requester;
    if (!req.user) {
      throw new Error("unauthorized");
    } else {
      return res.status(200).json({ message: "Allowed" });
    }
    next();
  } catch (e) {
    return res
      .status(401)
      .json({ message: e.message || "Something went wrong" });
  }
}

module.exports = checkAuth;
