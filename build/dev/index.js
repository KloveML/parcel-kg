'use strict'
require('v8-compile-cache')

// 全局依赖
const Chalk = require('chalk')
const Bundler = require('parcel-bundler')
const Ora = require('ora')
const Fs = require('fs')
const Fse = require('fs-extra')
const input = require('../utils/input')
let devConfig = require('../../config').dev
let { rootPath, srcPath, sleep } = require('../utils/utils')

// 功能区
async function bundle() {
  // 构成项目的配置项
  const bundler = new Bundler(devConfig.mainFile, devConfig)
  const port =
    Number.parseInt(devConfig.port) < 1000
      ? devConfig.port
      : Number.parseInt(devConfig.port)
  // 判断端口是否被占用，如果被占用应该做出提示
  const server = await bundler.serve(port, devConfig.https)
  if (port != server.address().port) {
    Chalk.yellow(
      `${port}端口被占用，${devConfig.https ? 'https' : 'http'}://localhost:${
        server.address().port
      }`
    )
  }
  if (devConfig.open) {
    require('opn')(
      `${devConfig.https ? 'https' : 'http'}://localhost:${
        server.address().port
      }`
    )
  }
}

async function exec() {
  // 拿到项目名和端口号 => 项目的入口文件
  const projectName = await input('请输入项目名：')
  const entry = srcPath(`${projectName}/index.html`)
  if (!Fs.existsSync(entry)) {
    console.log('项目不存在')
    input.rl.close()
    return
  }
  let port = await input('请输入端口号（默认8088）：')
  input.rl.close()
  devConfig = Object.assign({}, devConfig, {
    mainFile: entry,
    port: port || 8088
  })

  // 删除dist目录和cache目录
  const distPath = rootPath('dist')
  const cachePath = rootPath('.cache')
  const isExistDist = Fs.existsSync(distPath)
  const isExistCache = Fs.existsSync(cachePath)

  if (isExistDist || isExistCache) {
    await removeCacheFile()
  }
  // 开始打包
  bundle()

  async function removeCacheFile() {
    const spinner = new Ora('开发环境：删除打包文件，缓存文件')
    spinner.start()
    if (isExistDist) {
      Fse.removeSync(distPath)
    }
    if (isExistCache) {
      Fse.removeSync(cachePath)
    }
    await sleep(1000)
    spinner.succeed('删除成功')
  }
}
exec()
