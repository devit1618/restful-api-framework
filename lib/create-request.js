const { parse: parseUrl } = require('url')

const createRequest = incomingMessage => {
  const url = parseUrl(incomingMessage.url, true)

  const request = {
    method: incomingMessage.method,
    url: url.pathname,
    originalUrl: url.href,
    query: url.query,
    headers: incomingMessage.headers,
    setEncoding: (...args) => incomingMessage.setEncoding(...args),
    on: (...args) => incomingMessage.on(...args),
    pipe: (...args) => incomingMessage.pipe(...args)
  }

  return request
}

module.exports = createRequest
