import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';
// console.log('process wtf', process);

export default {
  input: 'src/index.js',

  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',

      sourcemap: true,
      plugins: [
        terser({
          compress: {
            drop_console: process.env.NODE_ENV == 'production'
          }
        })
      ]
    },
    {
      file: pkg.module,
      exports: 'named',
      format: 'es',
      sourcemap: true,
      plugins: [
        terser({
          compress: {
            drop_console: process.env.NODE_ENV == 'production'
          }
        })
      ]
    }
  ],

  plugins: [
    external(),

    url(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    resolve({ preferBuiltins: true, mainFields: ['browser'] }),
    commonjs()
  ]
};
