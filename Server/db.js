import mysql from "mysql2";

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.error("❌ Kết nối MySQL thất bại:", err);
        return;
    }
    console.log("✅ Kết nối MySQL thành công!");
});

export default connection;
