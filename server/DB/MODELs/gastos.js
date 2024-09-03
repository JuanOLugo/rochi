const { Schema, model } = require("mongoose");

const gastoSchema = new Schema({
  gastoname: String,
  gastoamount: Number,
  storeowner: {
    type: Schema.ObjectId,
    ref: "STORE",
  },
  gastodate: String,
});


const gastomodel = model("gasto", gastoSchema)

module.exports = gastomodel
