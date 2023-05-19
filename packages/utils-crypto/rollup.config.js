// rollup Docs https://cn.rollupjs.org/configuration-options/#external
import { defineConfig } from 'rollup'
import babel from '@rollup/plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import { terser } from 'rollup-plugin-terser'
import { baseConfig } from '@baizixv/config-rollup'

import pkg from './package.json' assert { type: 'json' }

const baseConfigs = baseConfig({ pkg, babel, nodeResolve, commonjs, replace, terser }, [
  {
    formatType: 'cjs',
  },
  { formatType: 'es' },
  { formatType: 'es-browsers' },
  { formatType: 'umd-dev' },
  { formatType: 'umd' },
])

export default defineConfig(baseConfigs)
