'use strict'

/* eslint-env mocha */
const execaWrap = require('.')
const snapshot = require('snap-shot-it')

describe('execa-wrap', () => {
  it('ls', () => {
    return execaWrap('ls', ['src']).then(snapshot)
  })
})
