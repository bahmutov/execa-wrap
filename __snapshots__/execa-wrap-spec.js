exports['fields filter 1'] = `
  command: ls src
  stdout:
  -------
  execa-wrap-spec.js
  index.js
  windows-spec.js
  -------
  
`

exports['ls src 1'] = `

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
  windows-spec.js
  -------
  stderr:
  -------
  
  -------
  
`

exports['boo src 1'] = `

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

exports['single field filter 1'] = `
  stdout:
  -------
  execa-wrap-spec.js
  index.js
  windows-spec.js
  -------
  
`
