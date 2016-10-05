const pathToRegexp = require('path-to-regexp')
const waterfall = require('./waterfall')


const getMatcher = pattern => {
  const keys = []
  const regex = pathToRegexp(pattern, keys)

  return {
    regex,
    keys: keys.map(k => k.name)
  }
}

const parseParams = (match, keys) =>
  match.slice(1).reduce((params, value, index) => {
    params[keys[index]] = value
    return params
  }, {})

const verbs = [
  'GET',
  'POST',
  'PATCH',
  'PUT',
  'DELETE'
]

const createRouter = options => {
  const middlewareArray = []
  const routes = []

  const _route = (methods, pattern, ...actions) => {
    if (typeof methods === 'string')
      methods = [methods]

    const matcher = getMatcher(pattern)
    routes.push({ methods, matcher, actions })
  }

  return {
    use: fn => {
      middlewareArray.push(fn)
    },
    route: _route,
    match: _route,
    get: (...args) => _route('GET', ...args),
    post: (...args) => _route('POST', ...args),
    patch: (...args) => _route('PATCH', ...args),
    put: (...args) => _route('PUT', ...args),
    delete: (...args) => _route('DELETE', ...args),
    del: (...args) => _route('DELETE', ...args),
    all: (...args) => _route(verbs, ...args),
    any: (...args) => _route(verbs, ...args),
    middleware: (request, next) => {
      for (const route of routes) {
        if (!route.methods.includes(request.method))
          continue

        const match = route.matcher.regex.exec(request.url)

        if (!match)
          continue

        request.params = parseParams(match, route.matcher.keys)

        return waterfall([
          next => next(request),
          ...middlewareArray,
          ...route.actions
        ])
      }

      return next(request)
    }
  }
}

module.exports = createRouter
