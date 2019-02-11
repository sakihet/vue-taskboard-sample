module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-taskboard-sample/'
    : '/',
  outputDir: 'docs'
}
