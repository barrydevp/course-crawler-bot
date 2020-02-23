const {response} = require('@barrydevp/common')
const CrawlerActions = require('../actions/CrawlerActions')

exports.getListCrawler = (req, res) => {
    CrawlerActions.getListCrawler()
        .then(response.sendSuccess(req, res))
        .catch(response.sendError(req, res))
}

exports.getCrawler = (req, res) => {
    const {_id} = {...req.params}

    CrawlerActions.getCrawler(_id)
        .then(response.sendSuccess(req, res))
        .catch(response.sendError(req, res))
}

exports.createCrawler = (req, res) => {
    const {code, name, session, times} = {...req.body}

    CrawlerActions.createCrawler({code, name, session, times})
        .then(response.sendSuccess(req, res))
        .catch(response.sendError(req, res))
}

exports.startCrawler = (req, res) => {
    const {_id} = {...req.params}

    CrawlerActions.startCrawler(_id)
        .then(response.sendSuccess(req, res))
        .catch(response.sendError(req, res))
}

exports.stopCrawler = (req, res) => {
    const {_id} = {...req.params}

    CrawlerActions.stopCrawler(_id)
        .then(response.sendSuccess(req, res))
        .catch(response.sendError(req, res))
}

exports.clearCrawler = (req, res) => {
    const {_id} = {...req.params}

    CrawlerActions.clearCrawler(_id)
        .then(response.sendSuccess(req, res))
        .catch(response.sendError(req, res))
}