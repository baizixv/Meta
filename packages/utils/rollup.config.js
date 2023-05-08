import path from 'path'

export default {
  input: 'src/index.js',
  output: {
    dir: path.dirname('lib/bundle.js'),
    format: 'umd',
    name: 'bai-utils',
  },
}
