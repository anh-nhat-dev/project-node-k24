const mongoose = require("mongoose");
const paginate = require("../../common/paginate");

const ProductModel = mongoose.model("Product");

module.exports.index = async function (req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = limit * page - limit;
  const total = await ProductModel.find().countDocuments();
  const totalPage = Math.ceil(total / limit);
  const products = await ProductModel.find()
    .populate({
      path: "cat_id",
    })
    .skip(skip)
    .limit(limit);
  // console.log("products", products);

  res.render("admin/products/index", {
    products,
    totalPage,
    page,
    pages: paginate(page, totalPage),
  });
};
