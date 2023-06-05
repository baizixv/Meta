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
    alias: {},
    plugins: {
      add: [],
      remove: [],
    },
    configure: (webpackConfig: any, { env, paths }: any) => {
      //   console.log(
      //     '%c Line:37 🍬 webpackConfig',
      //     'font-size:18px;color:#7f2b82;background:#33a5ff',
      //     webpackConfig
      //   )
      //   throw ''
      /* ... */
      return webpackConfig
    },
  },
}
