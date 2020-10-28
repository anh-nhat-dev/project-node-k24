const mongoose = require("mongoose");

const categoryModel = mongoose.model("Category");
module.exports = async function (req, res, next) {
  res.locals.categories = await categoryModel.find();
  next();
};
