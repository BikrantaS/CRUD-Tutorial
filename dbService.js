const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();
let instance = null;

var connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});


connection.connect((err) => {
    if (!err) {
        console.log('db ' + connection.state);
    }
    else {
        console.log(err.message);
    }
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }
}

module.exports = DbService;

