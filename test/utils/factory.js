'use strict'
const { createFactory } = require('ipfsd-ctl')
const merge = require('merge-options')
const { isNode, isBrowser } = require('ipfs-utils/src/env')

if (!process.env.GO_IPFS_PATH) {
  throw new Error('GO_IPFS_PATH not found in env')
}

const commonOptions = {
  test: true,
  type: 'go',
  ipfsHttpModule: require('ipfs-http-client'),
  ipfsBin: process.env.GO_IPFS_PATH,
  endpoint: 'http://localhost:57483'
}

const factory = (options = {}, overrides = {}) => {
  return createFactory(
    merge(commonOptions, options),
    overrides
  )
}

module.exports = factory
