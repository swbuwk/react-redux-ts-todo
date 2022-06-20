const pool = require("../db")

class EventController {
    async getEvents (req, res) {
        try {
            const {id} = req.query
            const events = (await pool.query("SELECT * FROM event WHERE person_id = $1 OR guest_id = $1", [id])).rows
            return res.json(events)
        } catch (e) {
            console.log(e)
        }
    }

    async createEvent (req, res) {
        try {
            const {id} = req.query
            const {date, title, description, guestId} = req.body
            await pool.query("INSERT INTO event (person_id, title, description, guest_id, event_date) VALUES ($1, $2, $3, $4, $5)",
            [id, title, description, guestId, date])
            return res.json({message: "Ивент добавлен"})
        } catch (e) {
            console.log(e)
        }
    }

}


module.exports = new EventController() 