const Crawler = require('../crawler')
const {isNumber} = require('../helpers/is')
const MAX_CRAWLERS = parseInt(process.env.MAX_CRAWLERS || 5)

const crawlers = Crawler.crawlers

const parseId = _id => {
    const id = parseInt(_id)

    if(!isNumber(id)) throw new Error(`Invalid bot_id.`)

    return id
}

exports.getListCrawler = async () => {
    return {
        crawlers: crawlers.map(c => {
            return c && {crawler: c.store}
        })
    }
}

exports.getCrawler = async _id => {
    _id = parseId(_id)
    const crawler = crawlers[_id]

    if(!crawler) throw new Error(`Crawler _id ${_id} not initial.`)

    return {bot_id: _id, crawler: crawler.store}
}

exports.createCrawler = async ({code, name, session, times}) => {
    const _nullIndex = crawlers.indexOf(null)
	if(_nullIndex === -1) throw new Error('Maximum crawler-bot.')
    const crawler = await Crawler.create(_nullIndex, {code, name, session, times})
    
    crawlers[_nullIndex] = crawler

    return {bot_id: _nullIndex, crawler: crawler.store}
}

exports.startCrawler = async _id => {
    _id = parseId(_id)
    const crawler = crawlers[_id]

    if(!crawler) throw new Error(`Crawler _id ${_id} not initial.`)

    crawler.monitor.start()

    return {bot_id: _id, crawler: crawler.store}
}

exports.stopCrawler = async _id => {
    _id = parseId(_id)
    const crawler = crawlers[_id]

    if(!crawler) throw new Error(`Crawler _id ${_id} not initial.`)

    crawler.monitor.stop()

    return {bot_id: _id, crawler: crawler.store}
}

exports.clearCrawler = async _id => {
    _id = parseId(_id)
    const crawler = crawlers[_id]

    if(!crawler) throw new Error(`Crawler _id ${_id} not initial.`)

    crawler.monitor.clear()

    return {bot_id: _id, crawler: crawler.store}
}