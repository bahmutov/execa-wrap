const execa = require('execa')
const stripAnsi = require('strip-ansi')
const R = require('ramda')
const stripLeadingIndent = require('strip-indent')
const indentString = require('indent-string')

const stripFields = R.evolve({
  stdout: stripAnsi,
  stderr: stripAnsi
})

const makeText = execResult => {
  const stdout = indentString(stripLeadingIndent(execResult.stdout), 2).trim()

  return `
  command: ${execResult.cmd}
  code: ${execResult.code}
  failed: ${execResult.failed}
  killed: ${execResult.killed}
  signal: ${execResult.signal}
  timedOut: ${execResult.timedOut}

  stdout:
  -------
  ${stdout}
  -------
  stderr:
  -------
  ${execResult.stderr}
  -------
  `
}

function execWrapper (cmd, args) {
  const child = execa(cmd, args)
  child.stdout.pipe(process.stdout)
  child.stderr.pipe(process.stderr)
  return child.then(stripFields).then(makeText)
}

module.exports = execWrapper
