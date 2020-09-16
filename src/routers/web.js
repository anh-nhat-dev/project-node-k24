const { Router } = require("express");
const AdminController = require("../apps/controllers/admin");
const router = Router();

router.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

router.get("/admin", AdminController.dashboard);

module.exports = router;
