const express = require("express")
const cors = require("cors")
const authRouter = require("./routes/AuthRouter")
const eventRouter = require("./routes/EventRouter")
const userRouter = require("./routes/UserRouter")

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(cors())

app.use("/auth", authRouter)
app.use("/users", userRouter)
app.use("/events", eventRouter)


app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`))