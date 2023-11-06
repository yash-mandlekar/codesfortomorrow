const express = require("express");
const router = express.Router();
const {
  homepage,
  signup,
  signout,
  currentuser,
  createtodo,
  showtodo,
  deletetodo
} = require("../controllers/indexController");
const { isLoggedIn } = require("../utils/auth");

router.get("/", homepage);
// router.route("/").get(homepage);

router.get("/loaduser", isLoggedIn, currentuser);

// post /signup - create user
router.post("/signup", signup);

// get /showTodo - create user
router.get("/todo", isLoggedIn, showtodo);

// get /deleteTodo - create user
router.get("/todo/:id", isLoggedIn, deletetodo);

// post /createTodo - create user
router.post("/todo", isLoggedIn, createtodo);

// get /signout - logout user
router.get("/signout", isLoggedIn, signout);

module.exports = router;
