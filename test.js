const { wrap } = require('module')
const vm = require('vm')
a = ''
vm.runInContext("console.log('hello world)",a)
console.log(a)