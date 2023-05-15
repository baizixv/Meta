import { generatePlugins } from '../tools/generate-plugins'

// ES
export const esConfig = (
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
    extensions,
  }
) => {
  return {
    input: 'src/index.js',
    output: { file: 'dist/es/index.js', format: 'es', indent: false },
    external,
    plugins: generatePlugins({
      nodeResolve,
      commonjs,
      replace,
      typescript,
      babel,
      terser,
      babelRuntimeVersion,
      extensions,
      formatType: 'es',
    }),
    ...config,
  }
}
