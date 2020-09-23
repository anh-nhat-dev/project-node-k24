module.exports.getLogin = (req, res) => {
  res.render("login", { error: null });
};

const users = [
  {
    email: "admin@gmail.com",
    pass: "123456",
  },
];

module.exports.postLogin = (req, res) => {
  const { mail, pass } = req.body;

  const user = users.find((user) => user.email === mail);
  let error;

  if (!user) {
    error = "Tài khoản không tồn tại!";
  }

  if (user && user.pass !== pass) {
    error = "Mật khẩu không đúng!";
  }

  return error ? res.render("login", { error }) : res.redirect("/admin");
};
