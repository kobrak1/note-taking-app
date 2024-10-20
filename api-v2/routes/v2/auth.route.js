const express = require("express")
const { register, login, logout } = require("../../controllers/v1/auth.controller") 

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)

module.exports = router;