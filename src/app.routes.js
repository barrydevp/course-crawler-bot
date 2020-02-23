const express = require('express')
const router = express.Router()
const {response} = require('@barrydevp/common')

router.get('/', (req, res) => res.send(`Hi! I'm ${process.env.PROJECT_NAME}`))
router.get('/ping', (req, res) => res.send(`${process.env.PROJECT_NAME}:pong`))

const heartbeatCtl = require('./controllers/heartbeat')
router.get('/heartbeat/ping', heartbeatCtl.ping)

/**
 * Sites.
 */
const crawlerCtrl = require('./controllers/crawler')
router.get('/crawlers', crawlerCtrl.getListCrawler)
router.get('/crawlers/:_id', crawlerCtrl.getCrawler)
router.post('/crawlers', crawlerCtrl.createCrawler)
router.get('/crawlers/start/:_id', crawlerCtrl.startCrawler)
router.get('/crawlers/stop/:_id', crawlerCtrl.stopCrawler)
router.delete('/crawlers/:_id', crawlerCtrl.clearCrawler)

/**
 * 404 page.
 */
router.get('*', response.send404)

/**
 * Exports.
 */
module.exports = router
