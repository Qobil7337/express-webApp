const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT || 'postgres',
        logging: false,
        pool: {
            max: 100,
            min: 5,
            acquire: 30000,
            idle: 10000
        }
    }
)

sequelize
    .authenticate()
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.error("Database connection error:", err))

module.exports = sequelize;
