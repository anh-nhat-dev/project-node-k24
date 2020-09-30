const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      default: null,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
    level: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.model("User", UserSchema, "users");
