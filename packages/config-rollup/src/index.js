import {
  commonjsConfig,
  esConfig,
  esBrowsersConfig,
  umdDevelopmentConfig,
  umdProductionConfig,
} from './configs/index'

export const baseConfig = (
  {
    pkg = {},
    packageName,
    extensions = [],
    nodeResolve,
    commonjs,
    replace,
    typescript,
    babel,
    terser,
  },
  configs
) => {
  const babelRuntimeVersion = pkg.dependencies?.['@babel/runtime'].replace(/^[^0-9]*/, '')
  const pkgName = packageName || pkg.name || `baizixv_${+new Date()}`
  const external = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ].map(name => RegExp(`^${name}($|/)`))

  const injectConfigFunc = (func, config) => {
    func.call(null, config, {
      nodeResolve,
      commonjs,
      replace,
      typescript,
      babel,
      terser,

      babelRuntimeVersion,
      pkgName,
      external,

      extensions,
    })
  }

  return configs.map(config => {
    switch (true) {
      // CommonJS
      case config.formatType == 'cjs':
        return injectConfigFunc(commonjsConfig, config)
      // ES
      case config.formatType === 'es':
        return injectConfigFunc(esConfig, config)
      // UMD Development
      case config.formatType === 'es-browsers':
        return injectConfigFunc(esBrowsersConfig, config)
      // UMD Development
      case config.formatType === 'umd-dev':
        return injectConfigFunc(umdDevelopmentConfig, config)
      // UMD Production
      case config.formatType === 'umd':
        return injectConfigFunc(umdProductionConfig, config)
      // default CommonJS
      default:
        return injectConfigFunc(commonjsConfig, config)
    }
  })
}
