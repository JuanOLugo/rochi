const { Schema, model } = require("mongoose");

const creditoSchema = new Schema({
  creditoamount: Number,
  storeowner: {
    type: Schema.ObjectId,
    ref: "STORE",
  },
  clientOwner: {
    type: Schema.ObjectId,
    ref: "CLIENT"
  },
  creditodate: String,
  creditdescription: String
});


const creditomodel = model("CREDITO", creditoSchema)

module.exports = creditomodel
