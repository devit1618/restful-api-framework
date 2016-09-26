const createApp = () => {
  const middlewareArray = []

  return {
    use: fn => {
      middlewareArray.push(fn)
    },

    httpHandler: () => {
    }
  }
}

module.exports = createApp
