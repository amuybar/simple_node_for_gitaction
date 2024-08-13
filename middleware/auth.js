const jwt = require("jsonwebtoken");
const User = require("../models/User"); 

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization header is missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }

  try {
    // Verify the JWT (assuming you are using JWTs)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by ID (decoded.id) instead of by token
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = authMiddleware;
