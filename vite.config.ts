import vue from '@vitejs/plugin-vue'
import path from 'path'

export default {
  resolve: {
    alias: [{find: '@', replacement: path.resolve(__dirname, 'src')}],
  },
  plugins: [vue()],
  server: {
    proxy: {
      '^/api': {
        changeOrigin: true,
        secure: false,      
        ws: false,
        target: 'http://localhost:3001/',
      },
      '^/img': {
        changeOrigin: true,
        secure: false,      
        ws: false,
        target: 'http://localhost:3001/',
      }
    },
  },
}
