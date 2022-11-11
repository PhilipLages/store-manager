const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'store_manager',
  user: 'root',
  password: 'password',
  database: 'db',
  port: 3306
})

module.exports = connection;