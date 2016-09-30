const { IncomingMessage } = require('http')
const createRequest = require('../../lib/create-request.js')

const incomingMessage = new IncomingMessage()
const request = createRequest(incomingMessage)

test('"method" property  to be defined', () => {
  expect(request.method).toBeDefined()
})

test('"url" property to be defined', () => {
  expect(request.url).toBeDefined()
})

test('"originalUrl" property to be defined', () => {
  expect(request.originalUrl).toBeDefined()
})

test('"query" property to be defined', () => {
  expect(request.query).toBeDefined()
})

test('"headers" property to be defined', () => {
  expect(request.headers).toBeDefined()
})

test('"setEncoding" function to be defined', () => {
  expect(request.setEncoding).toBeDefined()
})

test('"on" function to be defined', () => {
  expect(request.on).toBeDefined()
})

test('"pipe" function to be defined', () => {
  expect(request.pipe).toBeDefined()
})
