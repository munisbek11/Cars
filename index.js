const express = require("express")
require("dotenv").config()
const cors = require("cors");
const connectDB = require("./db/config.db");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./Middleware/error.middleware");
const CarRouter = require("./Router/cars.routes");
const CategoryRouter = require("./Router/category.routes");
const registerRouter = require("./Router/register.routes");


const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

connectDB()

app.use(CarRouter)
app.use(CategoryRouter)
app.use(registerRouter)


app.use(errorMiddleware)


app.listen(PORT, () => {
  console.log(`Server is running on the port: ${PORT}`);
})