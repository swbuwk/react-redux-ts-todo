const Router = require("express")
const eventController = require("../controllers/EventController")

const eventRouter = new Router()

eventRouter.get("/", eventController.getEvents)
eventRouter.post("/", eventController.createEvent)

module.exports = eventRouter