'use strict'

const services = require('../services')


function isAuth(req, res, next) {
	if (!req.headers.authorization){
		return res.status(403).send({ message: `HTTP 403 Forbidden`})
	}

	const token = req.headers.authorization.split(' ')[1]

	services.decodeToken(token)
		.then(response => {
			req.user = response
			next()
		})
		.catch(response => {
			res.status(response.status)
		})
}


module.exports = isAuth


// END index.js
