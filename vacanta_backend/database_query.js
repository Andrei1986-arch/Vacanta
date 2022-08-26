// import Pool e un obiect care are functii si ma ajuta sa ma conectez la baza de date
// si sa lucrez cu ea 
// informatiile necesare le pastrez in "options" --> cel putin cele gasite in "options"

const { Pool } = require('pg'); // pg = postgres
// informatiile pentru conectare la DB
const options = {
    host: "localhost",
    database: "backEndVacanta",
    port: 5432,
    user: "postgres",
    password: "123456",
    // max --> nr max de clienti / conexiuni in acelasi timp
};

const pool = new Pool(options);

const queryAsync = async (text, params) => {
    const { rows } = await pool.query(text, params);
    return rows;
}

module.exports = {queryAsync};