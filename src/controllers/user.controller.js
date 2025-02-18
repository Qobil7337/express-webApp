const userService = require('../services/user.service')

const increaseBalance = async (req, res) => {
    try {
        const { userId, amount } = req.body
        if (!userId || amount <= 0 || !amount) {
            return res.status(400).json({ message: "Invalid request data" })
        }

        const user = await userService.updateBalance(userId, amount)
        res.json({message: 'Balance increased', balance: user.balance})

    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const decreaseBalance = async (req, res) => {
    try {
        const { userId, amount } = req.body
        if (!userId || amount <= 0 || !amount) {
            return res.status(400).json({ message: "Invalid request data" })
        }

        const user = await userService.updateBalance(userId, -amount)
        res.json({message: 'Balance decreased', balance: user.balance})

    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

module.exports = { increaseBalance, decreaseBalance }
