const parseParams = (match, keys) =>
  match.slice(1).reduce((params, value, index) => {
    params[keys[index]] = value
    return params
  }, {})

module.exports = parseParams
