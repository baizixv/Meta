import { generatePlugins } from '../tools/generate-plugins'
// CommonJS
export const commonjsConfig = (
  config,
  { nodeResolve, typescript, babel, babelRuntimeVersion, external }
) => ({
  input: 'src/index.js',
  output: { file: 'dist/cjs/index.js', format: 'cjs', indent: false },
  external,
  plugins: generatePlugins({
    nodeResolve,
    typescript,
    babel,
    babelRuntimeVersion,
    external,
    formatType: 'cjs',
  }),
  ...config,
})
