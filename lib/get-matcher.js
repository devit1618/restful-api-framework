const pathToRegexp = require('path-to-regexp')

const matcherCache = {}

const getMatcher = pattern => {
  let matcher = matcherCache[pattern]

  if (!matcher) {
    const keys = []
    const regex = pathToRegexp(pattern, keys)
    matcher = matcherCache[pattern] = {
      regex,
      keys: keys.map(k => k.name)
    }
  }

  return matcher
}

module.exports = getMatcher
