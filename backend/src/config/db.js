const mongoose = require("mongoose")

// deprecation warning
mongoose.set("strictQuery",true)

module.exports = async () =>{
    return mongoose.connect(process.env.MongoUrl).then((data) =>{
        console.log(`Working on:${data.connection.host}`)
    }).catch((err) =>{
        console.log(err.message)
    })
}