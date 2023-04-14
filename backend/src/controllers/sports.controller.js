const Sports = require("../models/sports.model")

const getEvents = async(req, res) =>{

    try {
        let sports = await Sports.find()

        return res.status(200).send(sports)
    } catch (error) {
        return res.status(500).send({message: error.message})        
    }
}

// ------ get single event --------
const singleEvent = async(req, res) =>{


    try {
        let singleEvent = await Sports.findById(req.params._id)

        return res.status(200).send(singleEvent)

    } catch (error) {
        return res.status(500).send({message: error.message})        
    }
}

const createEvent = async(req, res) =>{

    try {
        
            const newEvent = await Sports.create(req.body)

            return res.status(201).send({message:"Event created successfully!", newEvent})
        
    } catch (error) {
        return res.status(500).send({message: error.message})        
    }
}

const updateEvent = async(req, res) =>{

    let eventId = req.params.id

    let singleEvent = await Sports.findOne({eventId})

    try {
        
        if(!singleEvent){
            return res.status(404).send({message: "Event not found"})
        }
        else{

            const updatedEvent = await Sports.findByIdAndUpdate({_id:eventId}, req.body)

            return res.status(201).send({message:"Event updated", updatedEvent})
        }
    } catch (error) {
        return res.status(500).send({message: error.message})        
    }
}


const deleteEvent = async(req, res) =>{

    let eventId = req.params.id

    let singleEvent = await Sports.findOne({eventId})

    try {
        if(!singleEvent){
            return res.status(404).send({message:"Event not found"})
        }
        else{
            let deleting_event = await Sports.findByIdAndDelete({_id:eventId})

            return res.status(200).send({message:"Event deleted"})
        }
    } catch (error) {
        return res.status(500).send({message: error.message})        
    }
}

module.exports = {getEvents, createEvent, deleteEvent, updateEvent, singleEvent}