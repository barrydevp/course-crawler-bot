/**
 * Load configs.
 */
const pathConfig = process.env.NODE_ENV === 'production' ? 'production.env' : 'dev.env'
require('dotenv').config({
    path: pathConfig
})

global.__basedir = __dirname

/**
 * Run app.
 */
try {
    require('./src/app')
} catch (e) {
    console.log('App crashed.', e)

    return process.exit(1)
}
