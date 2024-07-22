import * as utils from '../src'

const globalJsdom = require('jsdom-global')

globalJsdom('', { url: `https://github.com/wxh16144?v=${Date.now()}` })

console.log(
  utils.genCombinations([
    '\u200B',
    '\u200C',
    '\u200D',
    '\u200E',
    '\u200F',
    '\uFEFF',
  ], {
    ignoreOrder: false,
  }),
)
