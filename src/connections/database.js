const {create} = require('@barrydevp/common')
const database = require('@barrydevp/course-schemas')

const MONGODB_URI = process.env.MONGODB_URI
console.log('MONGODB_URI:', MONGODB_URI)

const originConnection = create.MongoConnection(MONGODB_URI, {
    poolSize: 5,
    debug: false
})

module.exports = database(originConnection)
