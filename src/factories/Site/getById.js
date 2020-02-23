const {getModel} = require('../../connections/database')

const _findSiteById = async _id => {
    const Site = getModel('Site')
    const select = 'name url status updated_at created_at'
    const doc = await Site.findById(_id)
        .select(select)

    if (!doc) throw new Error("Site not exists!")
    return doc.toJSON()
}

module.exports = _id => {
    return _findSiteById(_id)
}