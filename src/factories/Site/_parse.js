const safeTrim = require('../../helpers/safeTrim')

module.exports = ({name, url}) => {
    const _name = safeTrim(name)
    const _url = safeTrim(url)

    const site = {}

    if(_name) site.name = _name
    if(_url) site.url = _url

    return site
}
