const userService = require('../services/user.service')

const updateBalance = async (req, res) => {
    try {
        const { userId, amount } = req.body
        if (!userId || amount === undefined || amount === 0) {
            return res.status(400).json({ message: "Invalid request data" })
        }

        const result = await userService.updateBalance(userId, amount)
        if (!result.success) {
            return res.status(400).json({ message: "Insufficient balance" }) // Explicit failure
        }

        res.status(200).json({ message: "Balance updated successfully" })

    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

module.exports = { updateBalance }
