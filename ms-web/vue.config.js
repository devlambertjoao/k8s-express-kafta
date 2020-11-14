module.exports = {
    devServer: {
      proxy: {
        '^/api/producer': {
          target: 'http://192.168.49.2:30890',
        //   ws: true,
        //   changeOrigin: true
        },
        '^/api/consumer': {
            target: 'ws://192.168.49.2:30891',
            ws: true,
        },
      }
    }
  }
  