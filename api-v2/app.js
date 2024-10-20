const cors = require("cors")
const cookieParser = require("cookie-parser")
const express = require("express");
const app = express()

// routers
const authRouterV1 = require("./routes/v1/auth.route")
const authRouterV2 = require("./routes/v2/auth.route")


// middlewares
app.use(cors())
app.use(express.json())
app.use(cookieParser())

// mounted routes
app.use("/api/auth/v1", authRouterV1)
app.use("/api/auth/v2", authRouterV2)

module.exports = app;

