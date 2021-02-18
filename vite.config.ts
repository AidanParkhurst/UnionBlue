export default {
  server: {
    proxy: {
      '^/api': {
        changeOrigin: true,
        secure: false,      
        ws: false,
        target: 'http://localhost:3001/',
      },
    },
  },
}
