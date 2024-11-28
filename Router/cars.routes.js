const { Router } = require("express");
const {
  getCars,
  addCar,
  updateCar,
  deleteCar,
  getOneCar,
} = require("../Controller/car.controller");
const { checkAdmin, checkUser } = require("../Middleware/admin.middleware");
const { CarValidator } = require("../Validator/car.validate");
const verifyAccessToken = require("../Middleware/accessToken.middleware");

const CarRouter = Router();

CarRouter.get("/get_cars", [verifyAccessToken, checkUser], getCars);
CarRouter.post(
  "/add_car",
  [verifyAccessToken, checkAdmin, CarValidator],
  addCar
);
CarRouter.put("/update_car/:id", [verifyAccessToken, checkAdmin, CarValidator], updateCar);
CarRouter.delete("/delete_car/:id", [verifyAccessToken, checkAdmin], deleteCar);
CarRouter.get("/get_one_car/:id", [verifyAccessToken, checkUser], getOneCar);

module.exports = CarRouter;
