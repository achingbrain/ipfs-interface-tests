'use strict'

if (!process.env.GO_IPFS_PATH) {
  throw new Error('GO_IPFS_PATH not found in env')
}

const { createServer } = require('ipfsd-ctl')
const EchoServer = require('aegir/utils/echo-server')

let echoServer = new EchoServer()
let ipfsdServer

module.exports = {
  bundlesize: { maxSize: '560kB' },
  karma: {
    files: [{
      pattern: 'node_modules/interface-ipfs-core/test/fixtures/**/*',
      watched: false,
      served: true,
      included: false
    }],
    browserNoActivityTimeout: 600 * 1000
  },
  webpack: {
    node: {
      // required by the nofilter module
      stream: true,

      // required by the core-util-is module
      Buffer: true
    }
  },
  hooks: {
    node: {
      pre: async () => {
        await echoServer.start()
        return {
          env: {
            ECHO_SERVER: `http://${echoServer.host}:${echoServer.port}`
          }
        }
      },
      post: async () => {
        await echoServer.stop()
      }
    },
    browser: {
      pre: async () => {
        await echoServer.start()
        ipfsdServer = await createServer({
          host: '127.0.0.1',
          port: 57483
        }, {
          type: 'go',
          ipfsBin: process.env.GO_IPFS_PATH,
          ipfsHttpModule: require('ipfs-http-client')
        }).start()

        return {
          env: {
            ECHO_SERVER: `http://${echoServer.host}:${echoServer.port}`
          }
        }
      },
      post: async () => {
        await ipfsdServer.stop()
        await echoServer.stop()
      }
    }
  }
}
