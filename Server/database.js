const mysql = require('mysql2');
require('dotenv').config();

// Kết nối MySQL - Sử dụng mysql2 để hỗ trợ MySQL 8.0+ authentication
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 3306
});

connection.connect((err) => {
    if (err) {
        console.error('❌ Error connecting to database:', err);
        return;
    }
    console.log('✅ Connected to MySQL database');
});

module.exports = connection;

