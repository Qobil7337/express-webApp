const { Umzug, SequelizeStorage } = require('umzug')
const sequelize = require('../models')
const path = require('path')
const seedInitialUser = require("../seeders/initial-user");

const umzug = new Umzug({
    migrations: {
        glob: ['*-*.js', { cwd: __dirname, ignore: ['**/migration.js'] }]
    },
    storage: new SequelizeStorage({ sequelize }),
    context: sequelize.getQueryInterface(),
    logger: console,
})

const runMigrations = async () => {
    try {
        const migrations = await umzug.pending()
        console.log('Pending migrations:', migrations)

        if (migrations.length > 0) {
            console.log('Running migrations...')
            await umzug.up()
            console.log('Migrations completed')
            await seedInitialUser()
        } else {
            console.log('No pending migrations')
        }
    } catch (error) {
        console.error('Migration error:', error)
        throw error
    }
}

module.exports = { runMigrations }
