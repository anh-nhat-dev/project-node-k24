const mongoose = require("mongoose");

const productModel = mongoose.model("Product");
const categoryModel = mongoose.model("Category");

const paginate = require("../../common/paginate");

module.exports.home = async (req, res) => {
  const products = await productModel.find().sort("-_id").limit(6);
  const productFeatureds = await productModel
    .find({ prd_featured: true })
    .sort("-_id")
    .limit(6);

  res.render("site/index", { products, productFeatureds });
};
module.exports.category = async (req, res) => {
  const id = req.params.id;

  const page = parseInt(req.query.page) || 1;
  const limit = 2;
  const skip = limit * page - limit;
  const filter = {
    cat_id: id,
  };
  const total = await productModel.find(filter).countDocuments();
  const totalPage = Math.ceil(total / limit);
  const products = await productModel
    .find(filter)
    .sort("-_id")
    .skip(skip)
    .limit(limit);
  const category = await categoryModel.findById(id);
  res.render("site/category", {
    category,
    products,
    total,
    totalPage,
    page,
    pages: paginate(page, totalPage),
  });
};
module.exports.search = (req, res) => {
  res.render("site/search");
};
module.exports.product = (req, res) => {};
module.exports.cart = (req, res) => {};
module.exports.orderSuccess = (req, res) => {};
