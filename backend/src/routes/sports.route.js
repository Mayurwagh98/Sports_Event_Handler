const router = require("express").Router()
const {getEvents, createEvent, deleteEvent} = require("../controllers/sports.controller")

router.get("/events", getEvents)
router.post("/events/create", createEvent)
router.delete("/events/delete/:id", deleteEvent)

module.exports = router

