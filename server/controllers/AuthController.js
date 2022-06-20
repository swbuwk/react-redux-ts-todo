const pool = require("../db")
const bcrypt = require("bcrypt")

class AuthController {
    async registration (req, res) {
        try {
            const {email, name, password} = req.body
            console.log(req.body)
            const candidate = (await pool.query("SELECT * FROM person WHERE email = $1", [email])).rows[0]
            if (candidate) return res.json({message: "Пользователь с таким email существует"})
            const hashPassword = bcrypt.hashSync(password, 4)
            const person = (await pool.query("INSERT INTO person (email, name, password) VALUES ($1, $2, $3) RETURNING *",
            [email, name, hashPassword])).rows[0]
            return res.json({reg: 1, ...person})
        } catch (e) {
            console.log(e)
        }
    }

    async login (req, res) {
        try {
            const {email, password} = req.body
            const person = (await pool.query("SELECT * FROM person WHERE email = $1", [email])).rows[0]
            if (!person) return res.json({message: "Пользователя с таким email не существует"})
            const isPasswordValid = await bcrypt.compare(password, person.password)
            if (!isPasswordValid) return res.json({message: "Неверный пароль"})
            return res.json({auth: 1, ...person})
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new AuthController() 