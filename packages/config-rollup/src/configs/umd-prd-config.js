import { generatePlugins } from '../tools/generate-plugins'
// UMD Production
export const umdProductionConfig = (
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
  output: { file: 'dist/umd/index.min.js', format: 'umd', name: pkgName, indent: false },
  plugins: generatePlugins({
    nodeResolve,
    commonjs,
    replace,
    typescript,
    babel,
    terser,
    babelRuntimeVersion,
    external,
    formatType: 'umd',
  }),
  ...config,
})
