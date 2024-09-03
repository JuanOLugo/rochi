const { Schema, model } = require("mongoose");

const storeSchema = new Schema({
  storename: String,
  storepass: String,
  storeowner: {
    type: Schema.ObjectId,
    ref: "USER",
  },
  storegastos: {
    type: Array,
    ref: "GASTOS",
  },
  storeclients: {
    type: Array,
    ref: "CLIENT",
  },

  
});


const storemodel = model("STORE", storeSchema)

module.exports = storemodel
