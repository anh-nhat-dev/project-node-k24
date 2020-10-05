const { Router } = require("express");
const AdminController = require("../apps/controllers/admin");
const AuthController = require("../apps/controllers/auth");
const ProductController = require("../apps/controllers/product");

const router = Router();

router.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

router.get("/admin", AdminController.dashboard);
router.get("/admin/products", ProductController.index);
router
  .route("/login")
  .get(AuthController.getLogin)
  .post(AuthController.postLogin);

module.exports = router;
