exports.isUndef = v => v === null || v === undefined
exports.isNotUndef = v => v !== null && v !== undefined
exports.isFunc = f => typeof f === "function"
exports.isNumber = n => typeof n === "number" && !Number.isNaN(n)
exports.isString = s => typeof s === "string"
exports.isArray = Array.isArray
exports.isObject = obj => obj && !array(obj) && typeof obj === "object"
exports.isPromise = p => p && func(p.then)
exports.isIterator = it => it && func(it.next) && func(it.throw)
exports.isIterable = it =>
  it && func(Symbol) ? func(it[Symbol.iterator]) : array(it)
exports.isStringableFunc = f => func(f) && f.hasOwnProperty("toString")
exports.isSymbol = sym =>
  Boolean(sym) &&
  typeof Symbol === "function" &&
  sym.constructor === Symbol &&
  sym !== Symbol.prototype
exports.isDate = date => !isNaN(Date.parse(date))
