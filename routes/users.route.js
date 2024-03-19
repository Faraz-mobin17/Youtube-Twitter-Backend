const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUser,
  createUser,
} = require("../controllers/users.controller.js");
/* GET users listing. */
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/register", createUser);
module.exports = router;
