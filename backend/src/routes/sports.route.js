const router = require("express").Router()
const {getEvents, createEvent, deleteEvent, updateEvent} = require("../controllers/sports.controller")

router.get("/events", getEvents)
router.post("/events/create", createEvent)
router.patch("/events/update/:id", updateEvent)
router.delete("/events/delete/:id", deleteEvent)

module.exports = router

