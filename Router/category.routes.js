const { Router } = require("express");
const {
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
  getOneCategory,
} = require("../Controller/category.controller");
const { checkAdmin, checkUser } = require("../Middleware/admin.middleware");
const verifyAccessToken = require("../Middleware/accessToken.middleware");
const { CategoryValidator } = require("../Validator/category.validate");

const CategoryRouter = Router();

CategoryRouter.get(
  "/get_categories",
  [verifyAccessToken, checkUser],
  getCategory
);
CategoryRouter.post(
  "/add_category",
  [verifyAccessToken, checkAdmin, CategoryValidator],
  addCategory
);
CategoryRouter.put(
  "/update_category/:id",
  [verifyAccessToken, checkAdmin, CategoryValidator],
  updateCategory
);
CategoryRouter.delete(
  "/delete_category/:id",
  [verifyAccessToken, checkAdmin],
  deleteCategory
);
CategoryRouter.get(
  "/get_one_category/:id",
  [verifyAccessToken, checkUser],
  getOneCategory
);

module.exports = CategoryRouter;
