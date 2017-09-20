'use strict'

/* eslint-env mocha */
const execaWrap = require('.')
const snapshot = require('snap-shot-it')

function print (s) {
	console.log(s)
	return s
}

describe('execa-wrap', () => {
  it('ls', () => {
    return execaWrap('ls', ['src'])
    	.then(print)
    	.then(snapshot)
  })

  it('failing', () => {
    return execaWrap('boo', ['src'])
    	.then(print)
    	.then(snapshot)
  })
})
