const bcrypt = require("bcrypt")
const User = require("../models/user.model")
const jwt = require("jsonwebtoken")


let Signup = async(req, res) =>{
    
    let {name, email, password} = req.body

    let user = await User.findOne({email})
    try {
        
        if(user){
    
            res.status(200).send({message: "User already exists"})
        }
    
        const hashPassword = await bcrypt.hash(password, 8)
    
        const newUser = await User.create({name, email, password: hashPassword})
    
        const token = jwt.sign({email: newUser.email}, 'blah')
    
        res.status(200).send({message: "User registered", newUser, token})
    } catch (error) {
        console.log(error.message)   
    }

}

let Login = async(req, res) =>{

    let {email, password} = req.body

    let user = await User.findOne({email})
    try {

        if(!user){
            res.status(400).send({message: "User doesn't exists"})
        }

        const matchPassword = await bcrypt.compare(password, user.password)

        if(!matchPassword){
            res.status(404).send({message: "Wrong Credentials"})
        }

        const token = jwt.sign({userID: user._id},'blah')

        res.status(200).send({message: "Login Successful!", token: token})
        
    } catch (error) {
        res.status(500).send({message: error. message})
    }
}

module.exports = {Signup, Login}