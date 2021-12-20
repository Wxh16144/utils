const globalJsdom = require('jsdom-global')
globalJsdom('', { url: 'https://github.com/wxh16144' })

import * as utils from '../src'

console.log(utils.default)

