const env = process.env.NODE_ENV
env === 'development' ? require('./dev') : require('./prod')
