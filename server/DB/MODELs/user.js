const {Schema, model} = require("mongoose")

const userSchema = new Schema({
    username: String,
    userpass: {type: String},
    userstore:{
        type: Array,
        ref: "STORE"
    }
})

userSchema.set("toJSON", {
    transform: (doc, ret, options) => {
        delete ret.userpass
        ret.id = ret._id
        delete ret._id
        delete ret.__v
    }
})


const userModel = model("USER", userSchema)

module.exports = userModel
