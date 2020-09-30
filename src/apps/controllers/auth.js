const mongoose = require("mongoose");

const UserModel = mongoose.model("User");

module.exports.getLogin = (req, res) => {
  // UserModel.find({}).exec((err, docs) => {
  //   console.log("module.exports.getLogin -> docs", docs);
  // });

  // UserModel.updateOne(
  //   { _id: "5f71e02a84f000fd3856854f" },
  //   {
  //     $set: {
  //       password: "654321",
  //     },
  //   },
  //   (err, data) => {
  //     console.log("data", data);
  //   }
  // );

  res.render("login", { error: null });
};

module.exports.postLogin = (req, res) => {
  const { mail, pass } = req.body;

  let error;

  UserModel.findOne({ email: mail }, (err, doc) => doc).then((user) => {
    if (!user) {
      error = "Tài khoản không tồn tại!";
    }
    if (user && user.password !== pass) {
      error = "Mật khẩu không đúng!";
    }

    const users = UserModel.find((err, docs) => docs).then((docs) => {
      return error ? res.render("login", { error }) : res.redirect("/admin");
    });
  });
  // console.log("module.exports.postLogin -> user", user);
};
