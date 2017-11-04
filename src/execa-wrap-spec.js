'use strict'

/* eslint-env mocha */
const execaWrap = require('.')
const snapshot = require('snap-shot-it')
const os = require('os')

if (os.platform() !== 'win32') {
  describe('execa-wrap', () => {
    it('ls', () => {
      return execaWrap('ls', ['src']).then(snapshot.bind(null, 'ls src'))
    })

    it('failing', () => {
      return execaWrap('boo', ['src']).then(snapshot.bind(null, 'boo src'))
    })

    it('can filter single field', () => {
      return execaWrap('ls', ['src'], { filter: 'stdout' }).then(
        snapshot.bind(null, 'single field filter')
      )
    })
    it('can filter several fields', () => {
      return execaWrap('ls', ['src'], { filter: ['cmd', 'stdout'] }).then(
        snapshot.bind(null, 'fields filter')
      )
    })
  })
}
