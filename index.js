'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')


mongoose.connect(config.db, { useNewUrlParser: true }, (err,res) => {
	if (err) {
		return console.log(`Error establishing a database connection: ${err}`);
	}

	console.log('Database connection established');

	app.listen(config.port, () => {
		console.log(`API REST Node.js running in http://localhost:${config.port}`)
	})
})


//END index.js
