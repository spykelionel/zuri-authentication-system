const express = require("express");
const { verifyManager } = require("../auth/verify");
const router = express.Router();
const manager = require('../controllers/manager.controller')

router
  .get("/", verifyManager, manager.getAll)
  .get("/:id", verifyManager, manager.getOne)
  .post("/", manager.create)
  .patch("/:id", verifyManager, manager.update)
  .delete("/:id", verifyManager, manager.deleteOne)

module.exports = router;