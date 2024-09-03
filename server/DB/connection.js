const mongoose = require("mongoose")

const main = async ( ) => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("DB UP")
    } catch (error) {
        console.log("DB NO UP: " + error.message)
    }   
}

module.exports = main