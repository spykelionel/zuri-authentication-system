const express = require("express");
const { verifyStaff } = require("../auth/verify");
const router = express.Router();
const staff = require('../controllers/staff.controller')

router
  .get("/", verifyStaff, staff.getAll)
  .get("/:id", verifyStaff, staff.getOne)
  .post("/", staff.create)
  .patch("/:id", verifyStaff, staff.update)
  .delete("/:id", verifyStaff, staff.deleteOne)
  .get('/logout', staff.logout)

module.exports = router;