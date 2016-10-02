const createRequest = require('./create-request')
const waterfall = require('./waterfall')
const createResponse = require('./create-response')

const createApp = () => {
  const middlewareArray = []
  let injectedFirtsMiddleware = false

  return {
    use: fn => {
      middlewareArray.push(fn)
    },

    httpHandler: (incomingMessage, serverResponse) => {
      const request = createRequest(incomingMessage)
      const first = next => next(request)

      if (!injectedFirtsMiddleware) {
        middlewareArray.unshift(first)
        injectedFirtsMiddleware = true
      } else {
        middlewareArray[0] = first
      }

      waterfall(middlewareArray)
        .then(...createResponse(serverResponse))
    }
  }
}

module.exports = createApp
