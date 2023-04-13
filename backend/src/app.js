const express = require("express")

const app = express()
const cors = require("cors")

const Signup = require("./routes/user.route")
const Login = require("./routes/user.route")

app.use(express.json())
app.use(cors())

app.use("/api", Signup)
app.use("/api", Login)



module.exports = app