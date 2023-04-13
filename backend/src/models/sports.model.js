const mongoose = require("mongoose")

const SportsSchema = mongoose.Schema({
    title:String,
    description: String,
    timing: String,
    number_of_players_limit: Number
})

module.exports = mongoose.model("Sports", SportsSchema)