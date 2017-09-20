exports['execa-wrap ls 1'] = `
  command: ls src
  code: 0
  failed: false
  killed: false
  signal: null
  timedOut: false

  stdout:
  -------
  execa-wrap-spec.js
  index.js
  -------
  stderr:
  -------
  
  -------
  `

exports['execa-wrap failing 1'] = `
  command: boo src
  code: ENOENT
  failed: true
  killed: false
  signal: null
  timedOut: false

  stdout:
  -------
  
  -------
  stderr:
  -------
  
  -------
  `

exports['execa-wrap windows ls 1'] = `
  command: ls src
  code: ENOENT
  failed: true
  killed: false
  signal: null
  timedOut: false

  stdout:
  -------
  
  -------
  stderr:
  -------
  'ls' is not recognized as an internal or external command,
  operable program or batch file.
  -------
  `

exports['execa-wrap windows failing 1'] = `
  command: boo src
  code: ENOENT
  failed: true
  killed: false
  signal: null
  timedOut: false

  stdout:
  -------
  
  -------
  stderr:
  -------
  'boo' is not recognized as an internal or external command,
  operable program or batch file.
  -------
  `

