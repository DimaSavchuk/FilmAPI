const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const [type, token] = req.headers.authorization.split(" ");
    if (type === "Bearer" && token) {
      const decoded = jwt.verify(token, "cat");
      req.user = decoded;
      next();
    }
  } catch (error) {
    res.status(401).json({ code: 401, message: error.message });
  }
};
