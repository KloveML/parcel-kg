const Path = require('path')
/**
 * outDir  打包之后的输出目录
 * publicURL 嵌入html中静态文件的域名地址
 * watch 是否监听文件变化 开发模式默认true 生成环境默认false
 * cache 是否开启缓存  默认true
 * cacheDir 缓存的文件目录  默认.cache
 * killWorkers 是否开启多核打包模式  默认true
 * minify 打包时是否压缩  开发模式默认false 生成环境默认true
 * hmr 是否启动热加载  开发模式默认true 生成环境默认false
 * hmrPort 热加载的ws服务器端口 默认为0
 * logLevel 日志等级 默认3
 */
const config = {
  dev: {
    outDir: Path.resolve(__dirname, '../dist'),
    https: false,
    port: 8088,
    open: false
  },
  prod: {
    outDir: Path.resolve(__dirname, '../app')
  }
}

module.exports = config
