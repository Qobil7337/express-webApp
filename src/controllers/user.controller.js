const userService = require('../services/user.service')

const updateBalance = async (req, res) => {
    try {
        const { userId, amount } = req.body
        if (!userId || amount === undefined || amount === 0) {
            return res.status(400).json({ message: "Invalid request data" })
        }

        const user = await userService.updateBalance(userId, amount)
        res.json({
            message: `Balance ${amount > 0 ? 'increased' : 'decreased'}`,
            balance: user.balance
        })

    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

module.exports = { updateBalance }
