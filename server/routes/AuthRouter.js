const Router = require("express")
const authController = require("../controllers/AuthController")

const authRouter = new Router()

authRouter.post("/login", authController.login)
authRouter.post("/registration", authController.registration)

module.exports = authRouter