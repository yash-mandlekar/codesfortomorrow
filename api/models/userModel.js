const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModel = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    fathername: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    todos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "todo",
      },
    ],
    passwordResetToken: 0,
  },
  { timestamps: true }
);

userModel.pre("save", async function () {
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userModel.methods.comparepassword = function (userpassword) {
  return bcrypt.compareSync(userpassword, this.password);
};

userModel.methods.gettoken = function () {
  return jwt.sign({ id: this._id }, "SECRETKEYJWT", { expiresIn: "4h" });
};

const user = mongoose.model("user", userModel);

module.exports = user;
