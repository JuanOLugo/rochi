const { Schema, model, SchemaType } = require("mongoose");

const abonoSchema = new Schema({
  clientOwner: {
    type: Schema.ObjectId,
    ref: "CLIENT"
  },
  abonoamount: Number,
  storeowner: {
    type: Schema.ObjectId,
    ref: "STORE",
  },
  abonodate: String,
  creditAbono: {
    type: Schema.ObjectId,
    ref: "CREDITO",
  }
});


const abonomodel = model("ABONO", abonoSchema)

module.exports = abonomodel
