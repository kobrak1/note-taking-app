const bcrypt = require("bcrypt")
const prisma = require("../../lib/prisma")
const tokenGenerator = require("../../utils/tokenGenerator")

// handle register requests
const register = async (req, res, next) => {
    const { username, email, password } = req.body

    try {        
        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })
        console.log(newUser)
        // create a new user and dave to db
        res.status(200).send(`${newUser.username} created successfully.`)
    } catch (error) {
        res.status(500).json({ msg: "Failed to create new user." })
        console.error("Failed to create a new user.")
    }
}

// handle login requests
const login = async (req, res, next) => {
    const { username, password } = req.body

    try {
        // check if the user exists
        const user = await prisma.user.findUnique({
            where: { username }
        })

        if (!user) return res.status(400).json({ message: "invalid credentials" })

        // check if the password is correct
        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) return res.status(400).json({ message: "invalid credentials" })
        
        // generate cookie token and send to the user
        const token = tokenGenerator(user, username)

        // extract the user password from user info and apply it on the cookie
        const  { password: userPassword, ...userInfo } = user

        res
            .cookie("token", token, {
                httpOnly: true,
                // secure: true,
                maxAge: 1000 * 60 * 60
            })
            .status(200)
            .json(userInfo)
    } catch (error) {
        res.status(500).json({ msg: "Failed to login." })
        console.error("Failed to login.")
    }
}

// handle logout request
const logout = async (req, res, next) => {
    res.clearCookie("token").status(200).json({ message: "Logout successful" })
}

module.exports = { register, login, logout }