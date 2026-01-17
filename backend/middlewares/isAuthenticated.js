import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    // 1. Try to get the token from the cookie first
    let token = req.cookies?.token;

    // 2. If cookie is missing, look for the "Authorization" header
    // The frontend sends it as: "Bearer <token>"
    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        // Extract the token part after "Bearer "
        token = authHeader.split(" ")[1];
      }
    }

    // 3. If STILL no token found in either place, reject request
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    // 4. Verify the token
    const decode = jwt.verify(token, process.env.SECRET_KEY);

    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    req.id = decode.userId;
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res.status(401).json({
      message: "Authentication failed",
      success: false,
    });
  }
};

export default isAuthenticated;