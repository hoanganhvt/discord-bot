let data = new Date()
let day = data.getDate()
let month = data.getMonth()

let str = [day,month]
str = str.join(' ')
console.log(typeof str)
