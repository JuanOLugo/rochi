const { Schema, model } = require("mongoose");

const clientSchema = new Schema({
  clientname: String,
  clientcreditos: {
    type: Array,
    ref: "CREDITOS"
  },
  storeowner: {
    type: Schema.ObjectId,
    ref: "STORE",
  },
  clientdate: String,
  clientabonos: {
    type: Array,
    ref: "ABONOS"
  }
});


const clientmodel = model("CLIENT", clientSchema)

module.exports = clientmodel
