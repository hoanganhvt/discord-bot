const fs = require('fs')

const setBirthDay = (birth,id) => {
	let rawData = fs.readFileSync('db.json')
	let data = JSON.parse(rawData)
	if(!data[birth]){
		data[birth] = [id]
	}
	else{
		data[birth].push(id)
	}
	let jsonContent = JSON.stringify(data)
	fs.writeFile('./db.json',jsonContent,'utf8',(err,data) =>{
		if(err){
			console.log(err)
		}
		else{
			console.log('Sucess!')
		}
	})
}

const getBirthDay = (birth) => {
	let rawData = fs.readFileSync('db.json')
	let data = JSON.parse(rawData)
	if(data[birth]){
		return data[birth]
	}
	else{
		return "No"
	}
}
module.exports.setBirthDay = setBirthDay
module.exports.getBirthDay = getBirthDay