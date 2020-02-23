const hasOwnProperty = require('./hasOwnProperty')
const {isNumber} = require('./is')

const _parseLimit = (limit, defaultValue, maxValue) => {
    if (!isNumber(+limit)) return defaultValue

    const v = +limit
    if (v < 1 || v > maxValue) return defaultValue
    return v
}

const _parsePage = (page, defaultValue) => {
    if (!isNumber(+page)) return defaultValue

    const v = +page
    if (v < 1) return defaultValue
    return v
}

module.exports = (_paging, DEFAULT_LIMIT = 10, MAX_LIMIT = 1000, DEFAULT_PAGE = 1) => {
    if (!_paging) return {
        limit: DEFAULT_LIMIT,
        page: DEFAULT_PAGE,
    }

    const paging = {}
    paging.limit = hasOwnProperty(_paging, 'limit') ? _parseLimit(_paging.limit, DEFAULT_LIMIT, MAX_LIMIT) : DEFAULT_LIMIT
    paging.page = hasOwnProperty(_paging, 'page') ? _parsePage(_paging.page, DEFAULT_PAGE) : DEFAULT_PAGE

    return paging
}
