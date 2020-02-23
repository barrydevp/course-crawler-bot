const Heartbeat = require('@barrydevp/heartbeat')

exports.ping = Heartbeat.ping({
    name: process.env.PROJECT_NAME
})

