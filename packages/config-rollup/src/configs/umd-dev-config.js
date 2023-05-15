import { generatePlugins } from '../tools/generate-plugins'
// UMD Development
export const umdDevelopmentConfig = (
  config,
  {
    nodeResolve,
    commonjs,
    replace,
    typescript,
    babel,
    terser,
    babelRuntimeVersion,
    external,
    pkgName,
  }
) => ({
  input: 'src/index.js',
  output: { file: 'dist/umd/index.js', format: 'umd', name: pkgName, indent: false },
  plugins: generatePlugins({
    nodeResolve,
    commonjs,
    replace,
    typescript,
    babel,
    terser,
    babelRuntimeVersion,
    external,
    formatType: 'umd-dev',
  }),
  ...config,
})
