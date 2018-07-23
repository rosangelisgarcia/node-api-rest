'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services')


function signUp(req,res) {
	const user = new User({
		email: req.body.email,
		name: req.body.name,
		password: req.body.password
	})

	user.save((err) => {
		if (err) res.status(500).send({ messsage: `Error creating the user: ${err}` })

		return res.status(200).send({ token: service.createToken(user) })
	})
}


function signIn(req,res){
	User.find({ email: req.body.email }, (err, user) => {
		if (err) res.status(500).send({ messsage: `Failed to login - ${err}` })
		if (!user) res.status(404).send({ messsage: `Don't exist ${user} user` })
		
		req.user = user
		res.status(200).send({ 
			messsage: `You have successfully logged in`,
			token: service.createToken(user)
		})
	})
}


module.exports = {
	signUp,
	signIn
}


//END user.js
