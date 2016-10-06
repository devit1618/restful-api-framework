const respond = (body, statusCode = 200, headers = {}) => {
  const response = { statusCode, headers, body }
  if (typeof body === 'string')
    response.body = { message: body }
  return response
}

module.exports = respond
