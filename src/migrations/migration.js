const { Umzug, SequelizeStorage } = require('umzug')
const sequelize = require('../models')
const path = require('path')
const seedInitialUser = require("../seeders/initial-user");

const umzug = new Umzug({
    migrations: {
        glob: path.join(__dirname, '[0-9]*-*.js')
    },
    storage: new SequelizeStorage({ sequelize }),
    context: sequelize.getQueryInterface(),
    logger: console,
})

const runMigrations = async () => {

    const migrations = await umzug.pending()

    if (migrations.length > 0) {
        console.log('Running migrations...')
        await umzug.up()
        console.log('Migrations completed')
        await seedInitialUser()
    } else {
        console.log('No pending migrations')
    }
}

module.exports = { runMigrations }
