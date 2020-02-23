module.exports = (obj, prop) => {
    const proto = obj.__proto__ || obj.constructor.prototype
    return (prop in obj) &&
        (!(prop in proto) || proto[prop] !== obj[prop])
}

