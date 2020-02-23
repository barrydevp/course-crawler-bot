const Confidence = require('confidence')

const config = {
    port: {
        $filter: "env",
        $default: process.env.PORT || 1700,
        staging: process.env.PORT || 1701,
        _production: process.env.PORT || 1700,
        production: process.env.PORT || 1700,
    },

    mongodb: {
        $filter: "env",
        $default: process.env.MONGODB_URI || 'mongodb://localhost:27017/tenant_dev',
        staging: process.env.MONGODB_URI || 'mongodb://localhost:27017/tenant',
        _production: process.env.MONGODB_URI || 'mongodb://localhost:27017/tenant',
        production: process.env.MONGODB_URI || 'mongodb://localhost:27017/tenant',
    },

    redis: {
        $filter: "env",
        $default: process.env.REDIS_URI || 'redis://localhost:6379/1',
        staging: process.env.REDIS_URI || 'redis://localhost:6379/1',
        _production: process.env.REDIS_URI || 'redis://localhost:6379/1',
        production: process.env.REDIS_URI || 'redis://localhost:6379/1',
    },

    nats: {
        $filter: "env",
        $default: {
            url: process.env.NATS_URI || 'nats://localhost:4222',
            json: true,
        },
        staging: {
            url: process.env.NATS_URI || 'nats://localhost:4222',
            json: true,
        },
        _production: {
            url: process.env.NATS_URI || 'nats://localhost:4222',
            json: true,
        },
        production: {
            url: process.env.NATS_URI || 'nats://localhost:4222',
            json: true,
        },
    },

}

const store = new Confidence.Store(config)
const criteria = {
    env: process.env.NODE_ENV || 'development'
}

module.exports = (key, defaultValue = null) => {
    return store.get(key, criteria) || defaultValue
}
