const express = require("express")

const app = express()
const cors = require("cors")

const Signup = require("./routes/user.route")
const Login = require("./routes/user.route")
const GetEvents = require("./routes/sports.route")
const SingleEvent = require("./routes/sports.route")
const CreateEvents = require("./routes/sports.route")
const UpdateEvents = require("./routes/sports.route")
const DeleteEvents = require("./routes/sports.route")

app.use(express.json())
app.use(cors())

app.use("/api", Signup)
app.use("/api", Login)
app.use("/api", GetEvents)
app.use("/api", SingleEvent)
app.use("/api", CreateEvents)
app.use("/api", UpdateEvents)
app.use("/api", DeleteEvents)



module.exports = app