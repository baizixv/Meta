import { defineConfig } from 'rollup'
import babel from '@rollup/plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json' assert { type: 'json' }

const babelRuntimeVersion = pkg.dependencies['@babel/runtime'].replace(/^[^0-9]*/, '')

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
].map(name => RegExp(`^${name}($|/)`))

export default defineConfig([
  // CommonJS
  {
    input: 'src/index.js',
    output: { file: 'dist/cjs/index.js', format: 'cjs', indent: false },
    external,
    plugins: [
      nodeResolve(),
      commonjs(),
      babel({
        plugins: [['@babel/plugin-transform-runtime', { version: babelRuntimeVersion }]],
        babelHelpers: 'runtime',
      }),
    ],
  },

  // ES
  {
    input: 'src/index.js',
    output: { file: 'dist/es/index.js', format: 'es', indent: false },
    external,
    plugins: [
      nodeResolve(),
      babel({
        plugins: [
          [
            '@babel/plugin-transform-runtime',
            { corejs: 3, version: babelRuntimeVersion, useESModules: true },
          ],
        ],
        babelHelpers: 'runtime',
      }),
    ],
  },

  // ES for Browsers
  {
    input: 'src/index.js',
    output: { file: 'dist/es/index.mjs', format: 'es', indent: false },
    plugins: [
      nodeResolve(),
      commonjs(),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      babel({
        exclude: 'node_modules/**',
        skipPreflightCheck: true,
        babelHelpers: 'bundled',
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
        },
      }),
    ],
  },

  // UMD Development
  {
    input: 'src/index.js',
    output: {
      file: 'dist/umd/index.dev.js',
      format: 'umd',
      name: pkg.name,
      indent: false,
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
      }),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
    ],
  },

  // UMD Production
  {
    input: 'src/index.js',
    output: {
      file: 'dist/umd/index.min.js',
      format: 'umd',
      name: pkg.name,
      indent: false,
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
        skipPreflightCheck: true,
        babelHelpers: 'bundled',
      }),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
        },
      }),
    ],
  },
])
