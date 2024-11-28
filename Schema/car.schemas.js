const { Schema, model } = require("mongoose");
const carSchema = new Schema(
  {
    brandID: {
      type: Schema.Types.ObjectId,
      ref: "categorys",
      required: true,
    },
    carName: {
      type: String,
      required: true,
    },
    motor: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    gearbook: {
      type: String,
      enum: {
        values: ["Avtomat karobka", "Mexanika"],
        message: "{VALUE} bunday gearbook mavjud emas!",
      },
      required: true,
    },
    darkening: {
      type: String,
      required: true,
      enum: {
        values: ["Bor", "Yo'q"],
        message: "{VALUE} bunday darkening mavjud emas!",
      },
    },
    year: {
      type: Number,
      required: true,
    },
    distansce: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const CarSchema = model("cars", carSchema);

module.exports = CarSchema;
