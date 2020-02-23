const {getModel} = require('../../connections/database')
const parseSite = require('./_parse')

const _parseSite = ({name, url}) => {
    return parseSite({name, url})
}

const _insertSite = async site => {
    const Site = getModel('Site')
    const _site = new Site(site)
    const doc = await _site.save()

    return doc.toJSON()
}

const _isSiteUrlExists = async ({url}) => {
    const Site = getModel('Site')
    const _site = await Site.findOne({url})
    return !!_site
}

module.exports = async ({name, url}) => {
    const site = _parseSite({name, url})

    const isSiteUrlExists = await _isSiteUrlExists({url: site.url})
    if (isSiteUrlExists) throw new Error('Site url is exists!')

    const document = await _insertSite(site)

    return document
}
