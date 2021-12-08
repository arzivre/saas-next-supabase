const crypto = require('crypto')

const hash = crypto.randomBytes(32).toString('hex')
console.log(hash)
// Prints:
//   c0fa1bc00531bd78ef38c628449c5102aeabd49b5dc3a2a516ea6ea959d6658e
