require('dotenv').config(); //initialize dotenv

const { Client, Intents, Message, TextChannel } = require('discord.js');
const fs = require('fs')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const db = require('./db')
const pingTime = 28000000
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on("message",msg =>{
	if(msg.content === '.Ching'){
		msg.reply("CHONG")
		msg.channel.send("Fuck all chinese")
	}
	if(msg.content === '.vanmau'){
		fs.readFile('./vanmau.txt','utf8',(err,data) =>{
			if(err){
				msg.reply("Có cái đầu buồi")
			}
			else{
				msg.reply(data)
			}
		})
	}


	let Teaching = msg.content.split(',')
	console.log(Teaching)
	if(Teaching[0] == 'nếu bố mày nói'){
		let rawSpeech = fs.readFileSync('./speech.json')
		let Speech = JSON.parse(rawSpeech)
		if(Teaching[2] == 'thì mày phải'){
			Speech[Teaching[1]] = Teaching[3]
			let content = JSON.stringify(Speech)
			fs.writeFile('./speech.json',content,'utf8',(err,data) =>{
				if(err){
					console.log(err)
				}
				else{
					console.log('Sucess')
					msg.channel.send("Mày nghĩ t học chưa :3")
				}
			})
		}
		else{
			msg.channel.send("Bố mày đéo học đấy làm gì nhau :3")
		}
	}
	let seq = msg.content.split(' ')
	if(seq[0] == '!birth'){
		db.setBirthDay(seq[1],msg.author.toString())
	}
	let rawData = fs.readFileSync('speech.json')
	let speech = JSON.parse(rawData)
	if(speech[msg.content]){
		msg.reply(speech[msg.content])
	}

	if(typeof msg.content === 'string'){
		setInterval(()=>{
			let today = new Date()
			let birth = [today.getDay(),today.getMonth()].join('-')
			let data = db.getBirthDay()
			if(data === 'No'){
				msg.channel.send("Hôm nay đéo sinh nhật ai cả")
			}
			else{
				for(let i = 0; i < data.length();i++){
					msg.channel.send(`HAppy birthday ${data[i]}`)
				}
			}
		},pingTime)
	}
})
//always at last line no last line = gay
client.login(process.env.CLIENT_TOKEN); //login bot using token


function getRandomNum(max,min){
	return Math.random()*(max-min)+min
}