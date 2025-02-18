const sequelize = require('./index')
const { DataTypes } = require('sequelize')

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        balance: {
            type: DataTypes.FLOAT,
            allowNull: false,
        }
    }
)

module.exports = User
