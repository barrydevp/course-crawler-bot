exports.validateString = (source) => {
    return typeof source === 'string' ? source.trim() : ''
}

exports.validateArray = (source) => {
    const arr = Array.isArray(source) ? source : []

    return arr.map(item => {
        if (typeof item === 'string') return item.trim()

        return item
    })
}

exports.validateNumber = (source) => {
    return !isNaN(+source) ? parseFloat(source) : null
}

exports.validateInteger = (source) => {
    return !isNaN(+source) ? parseInt(source) : 0
}

exports.validateBoolean = (source) => {
    return !!source
}
