const path = require('path')

export default {
  input: 'src/index.js',
  output: {
    // file: 'lib/bundle.js',
    dir: path.dirname('lib/bundle.js'),
    format: 'umd',
  },
}
