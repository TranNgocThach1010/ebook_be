const sql = require('mssql');

const { HOST, USER, PASSWORD, DATABASE } = process.env;

const config = {
    server: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
    trustServerCertificate: true,
};

const conn = new sql
    .ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL')
        return pool
    })
    .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
    sql, conn
};
