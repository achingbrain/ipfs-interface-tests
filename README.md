# interface tests for go-ipfs

These are the interface-core tests extracted from [js-ipfs](https://github.com/ipfs/js-ipfs), intended to be run by go-ipfs developers.

They spin up go-IPFS node(s) and use the [ipfs-http-client](https://npmjs.com/packages/ipfs-http-client) to test the go daemon.

## Use

1. Install node 14+ either from [nodejs.org](https://nodejs.org/en/download/) or by using a version manager like [nvm](https://github.com/nvm-sh/nvm) or [n](https://github.com/tj/n).

```console
$ git clone https://github.com/achingbrain/ipfs-interface-tests
$ cd ipfs-interface-tests
$ npm install
$ GO_IPFS_PATH=/path/to/ipfs/bin npx aegir test
```

The suite includes a lot of tests, some of which will pass against go-IPFS and some that will not.  See [test/interface.spec.js](test/interface.spec.js) for the setup.

Tests are organised by functional area and those that will not run are are skipped by name, so remove the skip from any if you are implementing these features in go-IPFS.

### Options

Several options can be used to customise the test run.  To look at them all:

```console
$ npx aegir test --help
```

To fail fast:

```console
$ GO_IPFS_PATH=/path/to/ipfs/bin npx aegir test --bail
```

To test in different environments (useful options for `-t` are `node`, `browser`, `webworker`, `electron-main` or `electron-renderer`, multiples can be specified):

```
$ GO_IPFS_PATH=/path/to/ipfs/bin npx aegir test -t node -t browser
```

To test in different browsers:

```
$ GO_IPFS_PATH=/path/to/ipfs/bin npx aegir test -t browser --browsers Firefox,Safari
```
