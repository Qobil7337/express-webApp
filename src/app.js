const express = require('express')
const userRoutes = require('./routes/user.routes')
const app = express()
const port = 3000
const { runMigrations } = require('./migrations/migration')

app.use(express.json())
app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

runMigrations()
    .then(() => {
        console.log('Migrations are up to date.')
        app.listen(port, () => {
            console.log('Server is running on port 3000')
        });
    })
    .catch(err => {
        console.error('Migration failed:', err)
        process.exit(1)
    })
