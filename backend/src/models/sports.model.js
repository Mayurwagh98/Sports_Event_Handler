const mongoose = require("mongoose")

const SportsSchema = mongoose.Schema({
    title:String,
    image: String,
    description: String,
    timing: String,
    number_of_players_limit: Number,
    userID: String
})

module.exports = mongoose.model("Sports", SportsSchema)