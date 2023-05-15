import { generatePlugins } from '../tools/generate-plugins'

// ES for Browsers
export const esBrowsersConfig = (
  config,
  { nodeResolve, commonjs, replace, typescript, babel, terser, babelRuntimeVersion, external }
) => ({
  input: 'src/index.js',
  output: { file: 'dist/es/index.mjs', format: 'es', indent: false },
  plugins: generatePlugins({
    nodeResolve,
    commonjs,
    replace,
    typescript,
    babel,
    terser,
    babelRuntimeVersion,
    external,
    formatType: 'es-browsers',
  }),
  ...config,
})
