const jwt = require("jsonwebtoken");

exports.verifyUser = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    req.userData = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
      return res.status(401).json({
          message: "Auth failed"
      })
  }
};

exports.verifyStaff = (req, res, next) => {
    try {
      const token = req.headers["authorization"].split(" ")[1];
      req.staffData = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (error) {
        return res.status(401).json({
            message: "Auth failed"
        })
    }
  };

exports.verifyManager = (req, res, next) => {
    try {
      const token = req.headers["authorization"].split(" ")[1];
      req.managerData = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (error) {
        return res.status(401).json({
            message: "Auth failed"
        })
    }
  };

exports.verifyAdmin = (req, res, next) => {
    try {
      const token = req.headers["authorization"].split(" ")[1];
      req.adminData = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (error) {
        return res.status(401).json({
            message: "Auth failed"
        })
    }
  };