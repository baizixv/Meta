import babel from 'rollup-plugin-babel'
export default {
  input: 'src/index.js',
  output: {
    file: 'lib/bundle.js',
    format: 'umd',
    name: '@baizixv/polyfill-node',
  },
  plugins: [
    babel({
      exclude: ['node_modules/**'],
    }),
  ],
}
