const bcrypt = require("bcrypt")
const User = require("../models/user.model")
const jwt = require("jsonwebtoken")


let Signup = async(req, res) =>{
    
    let {username, email, password} = req.body

    let user = await User.findOne({email})
    try {
        
        if(user){
    
            return res.status(200).send({message: "User already exists"})
        }
    
        const hashPassword = await bcrypt.hash(password, 8)
    
        const newUser = await User.create({username, email, password: hashPassword})
    
        const token = jwt.sign({email: newUser.email}, 'blah')
    
        return res.status(200).send({message: "User registered", newUser, token})

    } catch (error) {
        console.log(error.message)   
    }

}

let Login = async(req, res) =>{

    let {username, password} = req.body

    let user = await User.findOne({username})
    try {

        if(!user){
            return res.status(400).send({message: "User doesn't exists"})
        }

        const matchPassword = await bcrypt.compare(password, user.password)

        if(!matchPassword){
            return res.status(404).send({message: "Wrong Credentials"})
        }

        const token = jwt.sign({userID: user._id},'blah')

        return res.status(200).send({message: "Login Successful!", token: token,userId: user._id})
        
    } catch (error) {
        return res.status(500).send({message: error. message})
    }
}

module.exports = {Signup, Login}