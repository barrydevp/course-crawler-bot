const parseSite = require('./_parse')
const {getModel} = require('../../connections/database')

const _parseSite = ({name, url}) => {
    return parseSite({name, url})
}

const _updateSite = async (_id, site) => {
    const Site = getModel('Site')

    const select = 'name url status updated_at created_at'

    const doc = await Site.findByIdAndUpdate(_id, {
        ...site,
        status: "updated",
        updated_at: Date.now(),
    }, {new: true}).select(select)

    if(!doc) throw new Error("Site not exists!")

    
    return doc.toJSON()
}

module.exports = async (_id, {name, url}) => {
    const site = _parseSite({name, url})

    const document = await _updateSite(_id, site)

    return document
}
