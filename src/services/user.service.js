const { Op, literal } = require('sequelize')
const User = require('../models/user.model')

const updateBalance = async (id, amount) => {
    const [updatedRows, [updatedUser]] = await User.update(
        { balance: literal(`balance + ${amount}`) },
        {
            where: { id, balance: { [Op.gte]: -amount } }, // Prevent negative balance
            returning: true // Return the updated user
        }
    )

    if (!updatedRows) {
        return { success: false, message: "Insufficient balance" } // Indicate failure
    }
    return updatedUser
}

module.exports = { updateBalance }
