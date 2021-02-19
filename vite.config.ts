import vue from '@vitejs/plugin-vue'

export default {
  plugins: [vue()],
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
