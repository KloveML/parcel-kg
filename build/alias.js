// const Path = require('path')
const { srcPath } = require('./utils/utils')
module.exports = {
  // apis名缩写
  '@apis_opt1': srcPath('/src/opt1-web/apis'),
  // components名缩写
  '@comps_opt1': srcPath('/src/opt1-web/components'),
  // config名缩写
  '@conf_opt1': srcPath('/src/opt1-web/config')
}
