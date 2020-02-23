const crawler = require('./crawler')
const {isNumber} = require('../helpers/is')
const {resolveQuiz} = require('./courseCrawlerService')

const DEFAULT_CRAWLER_TIMES = parseInt(process.env.DEFAULT_CRAWLER_TIMES || 10)
const DEFAULT_CRAWLER_TIME_OUT = 1000 * parseInt(process.env.DEFAULT_CRAWLER_TIME_OUT || 60)

const MAX_CRAWLERS = parseInt(process.env.MAX_CRAWLERS || 5)

const crawlers = new Array(MAX_CRAWLERS)
for(let i = 0; i < MAX_CRAWLERS; i++) {
    crawlers[i] = null
}

const _createBot = async (_store, _bot) => {
	if(!_bot || _bot.current !== null) {
		_store.status = 'empty_bot'
		return {}
	}

	const {code, name, session, times} = _store

	const res = (await resolveQuiz({code}, {code, name})).data
	
	if(!res.success) throw new Error('Error when resolveQuiz code.')

	const quiz = res.data.data
	const _createTimeout = () => setTimeout(async () => {
        try {
        	++_store.count
        	console.log(`Start Crawler for bot_id ${_store._id} - count: ${_store.count}`)
            await crawler({code, session, quiz_id: quiz._id})
            
            if(_store.count >= times) {
                _bot.current = null
                _store.status = 'done'

                return
            }

            if(_store.status === 'started') _bot.current = _createTimeout()
        } catch(e) {
        	console.log(e)
            _bot.current = null
            _store.status = 'error'
        }
		
        console.log(`Complete Crawler for bot_id ${_store._id} - count: ${_store.count}`)
	}, DEFAULT_CRAWLER_TIME_OUT)

	// return start, stop bot function
	return {
		start: () => {
			if(_bot.current !== null) return false

			_bot.current = _createTimeout()
            _store.status = 'started'

			return true
		},
		stop: () => {
			if(_bot.current == null) return false
			clearTimeout(_bot.current)
			_bot.current = null
            _store.status = 'stopped'

			return true
		},
		clear: () => {
			if(_bot.current !== null) clearTimeout(_bot.current)

			_bot.current = null
            _store.status = 'cleared'
            crawlers[_store._id] = null

			return true
		}
	}
}

exports.create = async (_id, {code, name, session, times}) => {

    if(!isNumber(_id)) throw new Error('invalid bot_id.')
	if(!code) throw new Error('code is require.')
	if(!session) throw new Error('session is require.')

	const _store = {
        _id,
        status: 'created',
		code,
		name,
		session,
		times: parseInt(times || DEFAULT_CRAWLER_TIMES),
		count: 0,
	}

	const _bot = {
		current: null
	}

	const _monitorBot = await _createBot(_store, _bot)

	return {
		monitor: _monitorBot,
		_bot,
		store: _store,
	}
}

exports.crawlers = crawlers