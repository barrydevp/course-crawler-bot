const {validateString} = require('../../helpers/parser')
const hasOwnProperty = require('../../helpers/hasOwnProperty')
const moment = require('moment')

module.exports = _query => {
    const defaultStartDate = moment().subtract(3, 'months')
    const defaultEndDate = moment()

    const query = {}

    if (hasOwnProperty(_query, 'url') && _query.url) query.url = {'$regex': new RegExp(validateString(_query.url).replace(/\s+/g, '\\s+'), 'g')}

    if (hasOwnProperty(_query, 'name') && _query.name) query.name = {'$regex': new RegExp(validateString(_query.name).replace(/\s+/g, '\\s+'), 'g')}

    if (hasOwnProperty(_query, 'status') && _query.status) query.status = validateString(_query.status)

    const startDate = moment(_query.start_date).isValid() ? moment(_query.start_date) : defaultStartDate
    const endDate = moment(_query.end_date).isValid() ? moment(_query.end_date) : defaultEndDate
    const isDateValid = endDate.isAfter(startDate)

    query.created_at = {
        '$gte': isDateValid ? startDate.toDate() : defaultStartDate.toDate(),
        '$lte': isDateValid ? endDate.toDate() : defaultEndDate.toDate(),
    }

    return query
}
