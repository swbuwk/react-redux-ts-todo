const {Pool} = require("pg")
require('dotenv').config()

const pool = new Pool({
    database: "clocker",
    user: "postgres",
    password: process.env.DB_PASSWORD,
    host: "localhost",
    port: 5432
})

module.exports = pool