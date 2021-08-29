const { Pool } = require('pg');
// informatiile pentru conectare la DB
const options = {
    host: "localhost",
    database: "backEndVacanta",
    port: 5432,
    user: "postgres",
    password: "123456",
};

const pool = new Pool(options);

const queryAsync = async (text, params) => {
    const {
        rows
    } = await pool.query(text, params);
    return rows;
}

module.exports = {queryAsync};