const Router = require("express")
const userController = require("../controllers/UserController")

const userRouter = new Router()

userRouter.get("/", userController.getUsers)

module.exports = userRouter