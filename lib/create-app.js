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
      if (!injectedFirtsMiddleware) {
        middlewareArray.unshift(next =>
          next(createRequest(incomingMessage))
        )
        injectedFirtsMiddleware = true
      }

      waterfall(middlewareArray)
        .then(...createResponse(serverResponse))
    }
  }
}

module.exports = createApp
