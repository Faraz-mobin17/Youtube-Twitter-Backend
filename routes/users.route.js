const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/auth.middleware.js");
const {
  getAllUsers,
  getUser,
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller.js");
/* GET users listing. */
router.get("/", verifyJWT, getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);
router
  .route("/:id")
  .get(verifyJWT, getUser)
  .patch(verifyJWT, updateUser)
  .delete(verifyJWT, deleteUser);
module.exports = router;
