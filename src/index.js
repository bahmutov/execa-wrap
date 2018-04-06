const execa = require('execa')
const stripAnsi = require('strip-ansi')
const R = require('ramda')
const stripLeadingIndent = require('strip-indent')
const indentString = require('indent-string')
const debug = require('debug')('execa-wrap')

const stripFields = R.evolve({
  stdout: stripAnsi,
  stderr: stripAnsi
})

const makeFilteredText = result => {
  debug('making filtered text from result %j', result)

  // indent with 2 spaces every line
  let message = ''
  if ('cmd' in result) {
    message += `  command: ${result.cmd}\n`
  }
  if ('code' in result) {
    message += `  code: ${result.code}\n`
  }
  if ('failed' in result) {
    message += `  failed: ${result.failed}\n`
  }
  if ('killed' in result) {
    message += `  killed: ${result.killed}\n`
  }
  if ('signal' in result) {
    message += `  signal: ${result.signal}\n`
  }
  if ('stdout' in result) {
    message += `  stdout:
  -------
  ${result.stdout}
  -------\n`
  }
  if ('stderr' in result) {
    message += `  stderr:
  -------
  ${result.stderr}
  -------\n`
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
    debug('filtering only %j', filter)
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
