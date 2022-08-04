const express = require("express");
const { verifyAdmin } = require("../auth/verify");
const router = express.Router();
const admin = require('../controllers/admin.controller')

router
  .get("/", verifyAdmin, admin.getAll)
  .get("/:id", verifyAdmin, admin.getOne)
  .post("/", admin.create)
  .patch("/:id", verifyAdmin, admin.update)
  .delete("/:id", verifyAdmin, admin.deleteOne)

module.exports = router;