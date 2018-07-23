module.exports = {
	port: process.env.PORT || 3001,
	db: process.env.MONGODB || 'mongodb://localhost:27018/shop',
	SECRET_TOKEN: 'miclavedetokens'
}

//END config.js
