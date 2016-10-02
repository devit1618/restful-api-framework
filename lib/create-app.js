const createRequest = require('./create-request')
const waterfall = require('./waterfall')
const createResponse = require('./create-response')

const createApp = () => {
  const middlewareArray = []

  return {
    use: fn => {
      middlewareArray.push(fn)
    },

    httpHandler: (incomingMessage, serverResponse) => {
      const fullMiddlewareArray = [
        next => next(createRequest(incomingMessage)),
        ...middlewareArray
      ]

      waterfall(fullMiddlewareArray)
        .then(...createResponse(serverResponse))
    }
  }
}

module.exports = createApp
