const app = require("./app.js")
const connectDB = require("./config/db")
require("dotenv").config()

const port = process.env.PORT || 8000

app.listen(port, () => {
    connectDB()
       console.log(`listening to port http://localhost:${port}`);
})