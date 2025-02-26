import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    //checking the user token
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Access denied. No token provided." });
    }

    //token verification
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    //move to the next function
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: "server error" });
  }
};


export default authMiddleware;