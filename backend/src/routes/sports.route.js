const router = require("express").Router()
const {getEvents, createEvent, deleteEvent, updateEvent, singleEvent} = require("../controllers/sports.controller")
const authorization = require("../middleware/authorization")

router.get("/events", getEvents)
router.get("/events/:_id", singleEvent)
router.post("/events/create", authorization,createEvent)
router.patch("/events/update/:id", updateEvent)
router.delete("/events/delete/:id", deleteEvent)

module.exports = router

