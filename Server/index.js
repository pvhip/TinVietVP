const express = require('express');
const cors = require('cors');
const path = require("path");
require('dotenv').config();
const bodyParser = require('body-parser');

const port = process.env.SERVER_PORT || 3200;

const server = express();

// body parser
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());

// static
server.use(express.static(path.join(__dirname, "src")));

// Import connection từ file database.js
const connection = require('./database');

server.on('close', () => {
    connection.end();
    console.log('🔌 Connection to database closed');
});

// ROUTES
server.use("/api", require("./src/routes/apis.route"));

server.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});

// Export connection để tương thích với code cũ
module.exports = connection;
