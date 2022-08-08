const express = require("express");
const { verifyUser } = require("../auth/verify");
const router = express.Router();
const user = require('../controllers/user.controller')

router
  .get("/", verifyUser, user.getAll)
  .get("/:id", verifyUser, user.getOne)
  .post("/", user.create)
  .post("/login", user.login)
  .patch("/:id", verifyUser, user.update)
  .delete("/:id", verifyUser, user.deleteOne)
  .get('/logout', user.logout)

module.exports = router;