const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUser,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller.js");
/* GET users listing. */
router.get("/", getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
module.exports = router;
