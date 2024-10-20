const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const prisma = require("../../lib/prisma")

// handle register requests
const register = async (req, res, next) => {
    const { username, password } = req.body

    try {        
        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        })

        // create a new user and dave to db
        res.status(200).send(`${username} created successfully.`)
    } catch (error) {
        res.status(500).json({ msg: "Failed to create new user." })
        console.error("Failed to create a new user.")
    }
}

// handle login requests
const login = async (req, res, next) => {
    try {
        res.status(200).json({ message: "successfully done" })
    } catch (error) {
        res.status(500).json({ msg: "Failed to login." })
        console.error("Failed to login.")
    }
}

// handle logout
const logout = async (req, res, next) => {
    try {
        res.status(200).json({ message: "successfully logged out" })
    } catch (error) {
        res.status(500).json({ msg: "Failed to logout." })
        console.error("Failed to log out.")
    }
}

module.exports = { register, login, logout }