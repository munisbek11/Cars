const CarSchema = require("../Schema/car.schemas")
const BaseError = require("../Utils/BeseError");

const getCars = async (req, res, next) => {
  try {
    const cars = await CarSchema.find().populate("brandID", "-updatedAt -createdAt -_id")
    res.json(cars);
  } catch (err) {
    next(err);
  }
};

const addCar = async (req, res, next) => {
  try {
    const {
      brandID,
      carName,
      motor,
      color,
      gearbook,
      darkening,
      year,
      distansce,
      price,
      description
    } = req.body;

    await CarSchema.create({
      brandID,
      carName,
      motor,
      color,
      gearbook,
      darkening,
      year,
      distansce,
      price,
      description,
    });
    res.json({
      message: "Added new car",
    });
  } catch (err) {
    next(err);
  }
};

const updateCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      brandID,
      carName,
      motor,
      color,
      gearbook,
      darkening,
      year,
      distansce,
      price,
      description
    } = req.body;

    const foundedCar = await CarSchema.findById(id);
    if (!foundedCar) {
      throw BaseError.BadRequest("Car not founded");
    }

    let result = await CarSchema.findByIdAndUpdate(
      id,
      {
        brandID,
      carName,
      motor,
      color,
      gearbook,
      darkening,
      year,
      distansce,
      price,
      description
      },
      { new: true }
    );

    res.json({
      message: "Updated a car",
      result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;

    const foundedCar = await CarSchema.findById(id);
    if (!foundedCar) {
      throw BaseError.BadRequest("Car not founded");
    }

    await CarSchema.findByIdAndDelete(id);

    res.json({
      message: "Deleted a car",
    });
  } catch (err) {
    next(err);
  }
};

const getOneCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const foundedCar = await CarSchema.findById(id);
    if (!foundedCar) {
      throw BaseError.BadRequest("Car not founded");
    }
    res.json(foundedCar);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCars,
  addCar,
  updateCar,
  deleteCar,
  getOneCar
}