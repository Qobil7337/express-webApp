const User = require('../models/user.model')

async function seedInitialUser() {
    try {
        const initialUser = await User.create({
            balance: 10000
        })
        console.log('Initial user seeded successfully:', initialUser.toJSON())
    } catch (error) {
        console.error('Error seeding initial user:', error)
    }
}

module.exports = seedInitialUser
