const Path = require('path')

exports.rootPath = function(dir) {
  return Path.resolve(__dirname, '../../', dir)
}

exports.srcPath = function srcPath(dir) {
  return Path.resolve(__dirname, '../../src/', dir)
}

exports.sleep = function(ms) {
  return new Promise((resolve, reject) => {
    let timer = setTimeout(() => {
      console.log('')
      clearTimeout(timer)
      resolve()
    }, ms)
  })
}
