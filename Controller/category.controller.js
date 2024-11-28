const CarSchema = require("../Schema/car.schemas");
const CategorySchema = require("../Schema/category.schemas");
const BaseError = require("../Utils/BeseError");

const getCategory = async (req, res, next) => {
  try {
    const category = await CategorySchema.find();
    res.json(category);
  } catch (err) {
    next(err);
  }
};

const addCategory = async (req, res, next) => {
  try {
    const { categoryName } = req.body;

    await CategorySchema.create({
      categoryName,
    });
    res.json({
      message: "Added new category",
    });
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;

    const foundedCategory = await CategorySchema.findById(id);
    if (!foundedCategory) {
      throw BaseError.BadRequest("Category not founded");
    }

    let result = await CategorySchema.findByIdAndUpdate(
      id,
      {
        categoryName,
      },
      { new: true }
    );

    res.json({
      message: "Updated a category",
      result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const foundedCategory = await CategorySchema.findById(id);
    if (!foundedCategory) {
      throw BaseError.BadRequest("Category not founded");
    }

    await CategorySchema.findByIdAndDelete(id);

    res.json({
      message: "Deleted a category",
    });
  } catch (err) {
    next(err);
  }
};

const getOneCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const foundedCategory = await CarSchema.find({ brandID: id });
    if (!foundedCategory) {
      throw BaseError.BadRequest("Category not founded");
    }
    res.json(foundedCategory);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
  getOneCategory,
};
