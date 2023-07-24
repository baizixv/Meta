const path = require('path')

module.exports = {
  eslint: {
    enable: true /* (default value) */,
    mode: 'extends' /* (default value) */ || 'file',
    configure: {
      /* ... */
    },
    pluginOptions: {
      /* ... */
    },
  },
  babel: {
    presets: ['@babel/typescript'],
    plugins: [
      /* ... */
    ],
    loaderOptions: {
      /* ... */
    },
  },
  typescript: {
    enableTypeChecking: true /* (default value) */,
    compilerOptions: {
      target: 'ESNext',
    },
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    plugins: {
      add: [],
      remove: [],
    },
    devServer: {
      port: 80,
      host: 'baizixv.com',
    },
    configure: (webpackConfig: any, { env, paths }: any) => {
      webpackConfig.resolve = {
        ...webpackConfig.resolve,
        fallback: {
          fs: false,
          crypto: false,
        },
      }
      return webpackConfig
    },
  },
}
