import path from 'path'
import fs from 'fs'
import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import buble from '@rollup/plugin-buble'
import { terser } from 'rollup-plugin-terser'
import dts from 'rollup-plugin-dts'
import merge from 'lodash.merge'
import glob from 'glob'

import pkg from './package.json'

const resolveCwd = (...arg) => path.resolve(process.cwd(), ...arg)
const outputDir = resolveCwd('./dist')
const descriptionEntryDir = resolveCwd('./temp')

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

const modules = glob.sync(resolveCwd('./src/*'))

const modulesRollupConfigs = modules.reduce((configs, path) => {
  if (fs.statSync(path).isDirectory()) {
    const moduleName = path.split('/').pop()
    const input = resolveCwd(path, 'index.ts')
    configs.push(
      defineConfig(
        {
          input,
          output: [
            buildUmd({ file: resolveCwd(outputDir, `${moduleName.toLowerCase()}.js`), name: `${libName}${moduleName}` }),
            buildUmdMin({ file: resolveCwd(outputDir, `${moduleName.toLowerCase()}.min.js`), name: `${libName}${moduleName}` }),
            buildEsm({ file: resolveCwd(outputDir, `${moduleName.toLowerCase()}.esm.js`) }),
          ],
          plugins: globalPlugins,
        },
      ),
      defineConfig({
        input,
        output: [buildDts({ file: resolveCwd(outputDir, `${moduleName.toLowerCase()}.d.ts`) })],
        plugins: [dts()],
      }),
    )
  }
  return configs
}, [])

export default [].concat(
  defineConfig({
    input: resolveCwd('./src/index.ts'),
    output: [
      buildUmd(),
      buildUmdMin(),
      buildEsm(),
      buildDts(),
    ],
    plugins: globalPlugins,
  }),
  defineConfig({
    input: resolveCwd('./src/index.ts'),
    output: [buildDts()],
    plugins: [dts()],
  }),
  modulesRollupConfigs,
)
