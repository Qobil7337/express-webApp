const User = require('../models/user.model')

const getUserById = async (id) => {
    return await User.findByPk(id)
}
const updateBalance = async (id, amount) => {
    const user = await getUserById(id)
    if (!user) throw new Error("User not found")
    if (user.balance + amount < 0) throw new Error("Balance cannot be negative")
    user.balance += amount
    await user.save()
    return user
}

module.exports = { updateBalance }
