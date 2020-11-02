const mongoose = require("mongoose");

const productModel = mongoose.model("Product");
const categoryModel = mongoose.model("Category");
const commentModel = mongoose.model("Comment");

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
module.exports.search = async (req, res) => {
  const keyword = req.query.keyword;
  const page = parseInt(req.query.page) || 1;
  const limit = 2;
  const skip = limit * page - limit;
  const filter = {};

  if (keyword) {
    filter["$text"] = {
      $search: keyword,
    };
  }
  const total = await productModel.find(filter).countDocuments();
  const totalPage = Math.ceil(total / limit);

  const products = await productModel
    .find(filter)
    .sort("-_id")
    .skip(skip)
    .limit(limit);

  res.render("site/search", {
    keyword,
    products,
    total,
    totalPage,
    page,
    pages: paginate(page, totalPage),
  });
};

module.exports.product = async (req, res) => {
  const id = req.params.id;
  const product = await productModel.findById(id);

  const filter = { prd_id: id };
  const page = parseInt(req.query.page) || 1;
  const limit = 2;
  const skip = limit * page - limit;
  const total = await commentModel.find(filter).countDocuments();
  const totalPage = Math.ceil(total / limit);

  const comments = await commentModel
    .find(filter)
    .sort("-_id")
    .skip(skip)
    .limit(limit);

  res.render("site/product", {
    product,
    comments,
    totalPage,
    page,
    pages: paginate(page, totalPage),
  });
};

module.exports.comment = async (req, res) => {
  const body = req.body;

  const comment = {
    name: body.comm_name,
    email: body.comm_mail,
    content: body.comm_details,
    prd_id: body.prd_id,
  };

  await new commentModel(comment).save();

  res.redirect(`/product.${body.prd_id}#comments-list`);
};

module.exports.cart = (req, res) => {};
module.exports.orderSuccess = (req, res) => {};
