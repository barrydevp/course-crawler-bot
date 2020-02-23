const express = require('express')
const app = express()
const errorHandler = require('errorhandler')
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const logger = require('morgan')

/**
 * Express configuration.
 */
app.set('trust proxy', 1)
app.disable('x-powered-by')
app.use(compression())
app.use(bodyParser.json({limit: '5mb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '5mb'}))
app.use(errorHandler())
app.use(cors())
app.use(logger('dev'))


setTimeout(async () => {
    /**
     * Config routes.
     */
    app.use(require('./app.routes'))

    const PORT = process.env.PORT || 2900
    console.log(PORT)

    const server = require('http').createServer(app)
    server.listen(PORT, () => {
        console.info(`Listening on port ${PORT}...`)
    })

}, 0)