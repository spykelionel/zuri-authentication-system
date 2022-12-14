const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const staffRoutes = require("./routes/staff.routes");
const managerRoutes = require("./routes/manager.routes");
const adminRoutes = require("./routes/admin.routes");
const path = require("path");

const app = express();

app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", userRoutes);
app.use("/staff", staffRoutes);
app.use("/manager", managerRoutes);
app.use("/admin", adminRoutes);
app.get("/", (req, res) =>
  res.send("Your todo app is running. navigate to /todo")
);

// handle route errors here
app.use(identifyError, handleError);

function identifyError(req, res, next) {
  const methods = req.method.match(/GET|POST|DELETE|PATCH?/gi);
  let err = {
    message: methods
      ? `Requested resource: ${req.url} Not Found`
      : `${req.method} is not implemented`,
  };
  err.status = 404;
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      statusCode: err.status,
      redirect: true,
      to: `${process.env.HOST}/todo`,
    },
  });
  next(err);
}
function handleError(err, req, res) {
  res.status(err.status || 500).json({
    error: {
      message: err.message || "endpoint not found",
      statusCode: err.status || 500,
      redirect: true,
      to: process.env.HOST,
    },
  });
}

module.exports = app;
