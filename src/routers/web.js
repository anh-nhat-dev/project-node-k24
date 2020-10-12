const { Router } = require("express");
const app = require("../app");
const AdminController = require("../apps/controllers/admin");
const AuthController = require("../apps/controllers/auth");
const ProductController = require("../apps/controllers/product");
const checkGuest = require("../apps/middlewares/check-guest");
const checkLogin = require("../apps/middlewares/check-login");
const checkLevel = require("../apps/middlewares/check-level");
const router = Router();

router.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

router.use("/admin", checkGuest, checkLevel);
router.get("/admin", AdminController.dashboard);
router.get("/admin/products", ProductController.index);
router
  .route("/login")
  .all(checkLogin)
  .get(AuthController.getLogin)
  .post(AuthController.postLogin);

router.get("/admin/logout", AuthController.logout);

module.exports = router;
