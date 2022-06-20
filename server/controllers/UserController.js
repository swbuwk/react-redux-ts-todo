const pool = require("../db")

class UserController {
    async getUsers (req, res) {
        try {
            const users = (await pool.query("SELECT * FROM person")).rows
            return res.json(users)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new UserController()