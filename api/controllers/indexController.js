const User = require("../models/userModel");
const Todo = require("../models/todoModel");
const { sendToken } = require("../utils/auth");

exports.homepage = (req, res, next) => {
  res.json({ message: "This is homepage..." });
};

exports.currentuser = async (req, res) => {
  res.status(200).json({ user: req.user });
};

exports.signup = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email })
      .select("+password")
      .exec();
    if (!user) {
      user = await User.findOne({ number: req.body.email })
        .select("+password")
        .exec();
    }
    if (user) {
      const matchpassword = user.comparepassword(req.body.password);
      if (!matchpassword) {
        return res.status(500).json({ message: "wrong credientials" });
      }
      sendToken(user, req, res, 200);
      return;
    }
    const newUser = new User(req.body);
    user = await newUser.save();
    sendToken(user, req, res, 200);
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
  // res.json({})
};

exports.signout = (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({ message: "logged out successfully" });
};
exports.createtodo = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(500).json({ success: true, message: "user not found" });
  }
  const todo = await Todo.create(req.body);
  user.todos.push(todo._id);
  await user.save();
  res.status(200).json({ todo });
};
exports.showtodo = async (req, res, next) => {
  const user = await User.findById(req.user._id).populate("todos");
  if (!user) {
    return res.status(500).json({ message: "user not found" });
  }

  res.status(200).json({ success: true, todos: user.todos });
};
exports.deletetodo = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(500).json({ message: "user not found" });
  }
  await Todo.findOneAndDelete({ _id: req.params.id });
  var index = user.todos.indexOf(req.params.id);
  console.log(index);
  user.todos.splice(index, 1);
  await user.save();
  res.status(200).json({ success: true, todos: user.todos });
};
