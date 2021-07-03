const pg = require('pg');

const Pool = pg.Pool;
const pool = new Pool({
    database: 'weekend-to-do-app',
    hots: 'localhost',
    port: 5432,
    max: 10,
    idleTimeOutMillis: 30000
});

pool.on('connect', () => {
    console.log('Postgresql connected');
});

pool.on('error', error => {
    console.log('Error with postgresql', error);
});

module.exports = pool;