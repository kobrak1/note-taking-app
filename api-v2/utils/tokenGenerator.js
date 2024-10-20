const jwt = require("jsonwebtoken");

function tokenGenerator(user, username) {
    const payload = { id: user.id, username }
    const secret = process.env.SECRET
    const options = {
        expiresIn: "1h",
        issuer: "estateApp"
    }

    const token = jwt.sign(payload, secret, options)
    return token
}

module.exports = tokenGenerator;