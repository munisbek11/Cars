const {Schema, model} = require("mongoose")

const categorySchema = new Schema({
  categoryName:{
    type: String,
    required: true
  }
},
{
  versionKey: false,
  timestamps: true
}) 

const CategorySchema = model("categorys", categorySchema)

module.exports = CategorySchema