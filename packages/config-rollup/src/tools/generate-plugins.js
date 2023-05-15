const noDeclarationFiles = { compilerOptions: { declaration: false } }

// 生成通用插件配置
export const generatePlugins = ({
  nodeResolve,
  commonjs,
  replace,
  typescript,
  babel,
  terser,
  babelRuntimeVersion,
  formatType,
}) => {
  const plugins = []

  // import nodeResolve from '@rollup/plugin-node-resolve'
  if (nodeResolve) {
    if (extensions?.length > 0) {
      plugins.push(
        nodeResolve({
          extensions,
        })
      )
    } else {
      plugins.push(nodeResolve())
    }
  }

  // import commonjs from '@rollup/plugin-commonjs'
  if (['es-browsers', 'umd-dev', 'umd'].includes(formatType) && commonjs) {
    plugins.push(commonjs())
  }

  // import replace from '@rollup/plugin-replace'
  if (['es-browser', 'umd-dev', 'umd'].includes(formatType) && replace) {
    const env = ['umd-dev'].includes(formatType) ? 'development' : 'production'
    plugins.push(
      replace({
        'process.env.NODE_ENV': JSON.stringify(env),
        preventAssignment: true,
      })
    )
  }

  // import typescript from 'rollup-plugin-typescript2'
  if (typescript) {
    plugins.push(typescript({ tsconfigOverride: noDeclarationFiles }))
  }

  // import babel from '@rollup/plugin-babel'
  if (babel) {
    const thePlugins = []

    if (['cjs', 'es'].includes(formatType)) {
      const useESModules = ['es'].includes(formatType)
      thePlugins.push([
        '@babel/plugin-transform-runtime',
        { version: babelRuntimeVersion, useESModules },
      ])
    }

    const babelConfig = {
      plugins: thePlugins,
    }

    if (['es-browsers', 'umd-dev', 'umd'].includes(formatType)) {
      babelConfig.exclude = 'node_modules/**'
    }

    // extensions
    if (extensions) {
      babelConfig.extensions = extensions
    }
    // skipPreflightCheck
    if (['es-browsers', 'umd'].includes(formatType)) {
      const skipPreflightCheck = {
        umd: true,
      }
      babelConfig.skipPreflightCheck = skipPreflightCheck(formatType)
    }

    // babelHelpers
    if (['cjs', 'es', 'es-browsers', 'umd-dev', 'umd'].includes(formatType)) {
      const babelHelpers = {
        cjs: 'runtime',
        es: 'runtime',
        'es-browsers': 'bundled',
        'umd-dev': 'bundled',
        umd: 'bundled',
      }
      babelConfig.babelHelpers = babelHelpers(formatType)
    }

    plugins.push(babel(babelConfig))
  }

  // import { terser } from 'rollup-plugin-terser'
  if (['es-browsers', 'umd'].includes(formatType) && terser) {
    const terserConfig = {
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
      },
    }
    plugins.push(terser(terserConfig))
  }

  return plugins
}
