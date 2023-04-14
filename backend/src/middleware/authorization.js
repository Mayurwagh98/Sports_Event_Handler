const jwt = require("jsonwebtoken")

const authorization = async(req, res, next) =>{
    
    const token = req.headers.authorization.split(" ")[1]

    try {
        
        if(token){

            const decoded = jwt.verify(token, "blah")
            if(decoded){

                const userID = decoded.userID
    
                req.body.userID = userID

                next()
            }
            else{
                return res.send("You need to login")
            }
        }
        else{
            return res.status(400).send({message: "You need to login"})
        }


    } catch (error) {
        return res.status(500).send({message: error.message})
    }
}

module.exports = authorization