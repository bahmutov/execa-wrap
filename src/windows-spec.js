'use strict'

/* eslint-env mocha */
const execaWrap = require('.')
const snapshot = require('snap-shot-it')
const os = require('os')

if (os.platform() === 'win32') {
  describe('execa-wrap windows', () => {
    it('ls', () => {
      return execaWrap('ls', ['src']).then(
        snapshot.bind(null, 'windows ls src')
      )
    })

    it('failing', () => {
      return execaWrap('boo', ['src']).then(
        snapshot.bind(null, 'windows boo src')
      )
    })
  })
}
