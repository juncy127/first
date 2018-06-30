// import Mock from 'mockjs'

const mockApis = {
  '/api': {
    target: 'http://localhost:3000/',
    pathRewrite: {
      '^/api': '/api'
    },
    changeOrigin: true
  },
  '/rest': {
    target: 'http://localhost:3000/',
    pathRewrite: {
      '^/rest': '/rest'
    },
    changeOrigin: true
  }
}

module.exports = mockApis
