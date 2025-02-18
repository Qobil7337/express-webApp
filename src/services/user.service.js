const User = require('../models/user.model')
const sequelize = require('../models/index')
const getUserById = async (id, transaction = null) => {
    return await User.findByPk(id, { transaction })
}
const updateBalance = async (id, amount) => {
    try {
        return await sequelize.transaction(async (t) => {
            let user = await getUserById(id)

            if (!user) throw new Error("User not found")

            user = await User.findByPk(id, { transaction: t, lock: t.LOCK.UPDATE })
            if (!user) throw new Error("User not found within transaction")

            if (user.balance + amount < 0) throw new Error("Balance cannot be negative")

            user.balance += amount;
            await user.save({ transaction: t })

            return user;
        })
    } catch (e) {
        console.error(e);
        throw e;
    }
}

module.exports = { updateBalance }
