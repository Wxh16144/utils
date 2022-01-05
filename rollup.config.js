import path from 'path'
import fs from 'fs'
import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import buble from '@rollup/plugin-buble'
import { terser } from 'rollup-plugin-terser'
import dts from 'rollup-plugin-dts'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import merge from 'lodash.merge'
import glob from 'glob'

import pkg from './package.json'

const resolveCwd = (...arg) => path.resolve(process.cwd(), ...arg)
const outputDir = resolveCwd('./dist')

const libName = pkg.name.replace(/^@.*\//, '')
const banner = `/*!
* ${libName} v${pkg.version}
* (c) ${new Date().getFullYear()} ${pkg.author.name}<${pkg.author.email}>
*/`

const buildUmd = config => merge({
  file: pkg.main,
  format: 'umd',
  name: libName,
  exports: 'named',
  sourcemap: 'inline',
  banner,
}, config)

const buildUmdMin = config => merge({
  file: pkg.main.replace('.js', '.min.js'),
  format: 'umd',
  name: libName,
  exports: 'named',
  // sourcemap: "inline",
  banner,
  plugins: [terser()],
}, config)

const buildEsm = config => merge({
  file: pkg.module,
  format: 'esm',
  banner,
}, config)

const buildDts = config => merge(defineConfig({
  file: pkg.types,
  format: 'es',
}), config)

const globalPlugins = [
  esbuild(),
  buble(),
]

const browserPlugins = [
  nodeResolve({ browser: true, preferBuiltins: false }),
  commonjs(),
]

const nodePlugins = [
  nodeResolve(),
  commonjs(),
]

const modules = glob.sync(resolveCwd('./src/*'))

const modulesRollupConfigs = modules.reduce((configs, path) => {
  const moduleName = path.split('/').pop()
  if (fs.statSync(path).isDirectory() && moduleName !== 'Node') {
    const input = resolveCwd(path, 'index.ts')
    const moduleNameLower = moduleName.toLowerCase()
    configs.push(
      defineConfig(
        {
          input,
          output: [
            buildUmd({ file: resolveCwd(outputDir, `${moduleNameLower}/index.js`), name: `${libName}${moduleName}` }),
            buildUmdMin({ file: resolveCwd(outputDir, `${moduleNameLower}/index.min.js`), name: `${libName}${moduleName}` }),
            buildEsm({ file: resolveCwd(outputDir, `${moduleNameLower}/index.esm.js`) }),
          ],
          plugins: [].concat(globalPlugins, browserPlugins),
        },
      ),
      defineConfig({
        input,
        output: [buildDts({ file: resolveCwd(outputDir, `${moduleNameLower}/index.d.ts`) })],
        plugins: [dts()],
      }),
    )
  }
  return configs
}, [])

const NodeModuleConfig = [
  defineConfig({
    input: resolveCwd('./src/Node/index.ts'),
    output: [
      { file: resolveCwd(outputDir, 'node/index.js'), format: 'cjs', name: `${libName}Node`, sourcemap: 'inline', banner },
      { file: resolveCwd(outputDir, 'node/index.min.js'), format: 'cjs', name: `${libName}Node`, banner, plugins: [terser()] },
      buildEsm({ file: resolveCwd(outputDir, 'node/index.esm.js') }),
    ],
    plugins: [].concat(globalPlugins, nodePlugins),
  }),
  defineConfig({
    input: resolveCwd('./src/Node/index.ts'),
    output: [buildDts({ file: resolveCwd(outputDir, 'node/index.d.ts') })],
    plugins: [dts()],
  }),
]

export default [].concat(
  defineConfig({
    input: resolveCwd('./src/index.ts'),
    output: [
      buildUmd(),
      buildUmdMin(),
      buildEsm(),
      buildDts(),
    ],
    plugins: [].concat(globalPlugins, browserPlugins),
  }),
  defineConfig({
    input: resolveCwd('./src/index.ts'),
    output: [buildDts()],
    plugins: [dts()],
  }),
  modulesRollupConfigs,
  NodeModuleConfig,
)
