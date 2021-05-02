/* eslint-disable @typescript-eslint/no-var-requires */

const transpileModules = require('next-transpile-modules')
const withTM = transpileModules(['nanoevents'])

module.exports = withTM({})
