const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const paginate = require("../../common/paginate");

const ProductModel = mongoose.model("Product");
const CategoryModel = mongoose.model("Category");

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

module.exports.create = async (req, res) => {
  const categories = await CategoryModel.find();
  res.render("admin/products/add-product", { categories });
};

module.exports.store = async (req, res) => {
  const body = req.body;
  const file = req.file;

  const product = {
    prd_name: body.prd_name,
    prd_price: body.prd_price,
    prd_warranty: body.prd_warranty,
    prd_accessories: body.prd_accessories,
    prd_new: body.prd_new,
    prd_promotion: body.prd_promotion,
    prd_status: body.prd_status,
    prd_featured: body.prd_featured,
    prd_details: body.prd_details,
    cat_id: body.cat_id,
  };

  if (file) {
    fs.renameSync(
      file.path,
      path.resolve("src/public/images/products", file.originalname)
    );

    product["prd_image"] = file.originalname;
  }

  await new ProductModel(product).save();

  return res.redirect("/admin/products");
};
