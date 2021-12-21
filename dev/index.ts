const globalJsdom = require('jsdom-global')
globalJsdom('', { url: `https://github.com/wxh16144?v=${Date.now()}` })

import * as utils from '../src'

console.log(utils.getURLParameters())

