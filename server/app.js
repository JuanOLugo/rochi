const express = require("express")
const cors =  require("cors")
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/user", require("./Routes/user.routes"))
app.use("/api/store", require("./Routes/store.routes"))

app.listen(process.env.PORT, () => {
    console.log("El servidor ha iniciado correctamente" , process.env.PORT )
    require("./DB/connection")()
})