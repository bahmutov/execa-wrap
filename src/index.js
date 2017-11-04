const execa = require('execa')
const stripAnsi = require('strip-ansi')
const R = require('ramda')
const stripLeadingIndent = require('strip-indent')
const indentString = require('indent-string')

const stripFields = R.evolve({
  stdout: stripAnsi,
  stderr: stripAnsi
})

const makeFilteredText = result => {
  // indent with 2 spaces every line
  let message = ''
  if (result.cmd) {
    message += `  command: ${result.cmd}\n`
  }
  if (result.code) {
    message += `  code: ${result.code}\n`
  }
  if (result.failed) {
    message += `  failed: ${result.failed}\n`
  }
  if (result.killed) {
    message += `  killed: ${result.killed}\n`
  }
  if (result.signal) {
    message += `  signal: ${result.signal}\n`
  }
  if (result.stdout) {
    message += `  stdout:
  -------
  ${result.stdout}
  -------
  `
  }
  if (result.stderr) {
    message += `  stderr:
  -------
  ${result.stderr}
  -------
  `
  }
  return message
}

const makeAllText = execResult => {
  return `
  command: ${execResult.cmd}
  code: ${execResult.code}
  failed: ${execResult.failed}
  killed: ${execResult.killed}
  signal: ${execResult.signal}
  timedOut: ${execResult.timedOut}

  stdout:
  -------
  ${execResult.stdout}
  -------
  stderr:
  -------
  ${execResult.stderr}
  -------
  `
}

const makeText = (options = {}) => execResult => {
  let { filter } = options

  const result = R.clone(execResult)
  result.stdout = indentString(stripLeadingIndent(result.stdout), 2).trim()
  result.stderr = indentString(stripLeadingIndent(result.stderr), 2).trim()

  if (typeof filter === 'string') {
    filter = [filter]
  }
  if (Array.isArray(filter) && filter.length) {
    return makeFilteredText(R.pick(filter, result))
  }

  return makeAllText(result)
}

function execWrapper (cmd, args, options = {}) {
  const child = execa(cmd, args)
  child.stdout.pipe(process.stdout)
  child.stderr.pipe(process.stderr)
  return child.then(stripFields, stripFields).then(makeText(options))
}

module.exports = execWrapper
