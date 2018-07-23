'use strict'

const Product = require('../models/product')


function getProduct(req,res){
	let productId = req.params.productId
	Product.findById(productId, (err, product) => {
		if (err) res.status(500).send({ message: `Error: ${err}` })
		if (!product) res.status(404).send({ message: `${productId} does not exist` })

		res.status(200).send({ product })
	})
}


function getProducts(req,res){
	Product.find({}, (err, products) => {
		if (err) res.status(500).send({ message: `Error: ${err}` })
		if (!products) res.status(404).send({ message: `There are no products` })

		res.status(200).send({ products })
	})
}


function saveProduct(req,res){
	let product = new Product()
	product.name = req.body.name
	product.picture = req.body.picture
	product.price = req.body.price
	product.category = req.body.category
	product.description = req.body.description

	product.save((err, productStored) => {
		if (err) res.status(500).send({ messsage: `Failed to save to the database ${err}` })

		res.status(200).send({ product: productStored })
	})
}


function updateProduct(req,res){
	let productId = req.params.productId
	let update = req.body

	Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
		if (err) res.status(500).send({ message: `Error: ${err}` })
		if (!productUpdated) res.status(404).send({ message: `${productId} does not exist` })

		res.status(200).send({ message: `${productId} has been updated` })
	})
}


function deleteProduct(req,res){
	let productId = req.params.productId
	Product.findById(productId, (err, product) => {
		if (err) res.status(500).send({ message: `Error: ${err}` })
		if (!product) res.status(404).send({ message: `${productId} does not exist` })

		product.remove(err => {
			if (err) res.status(500).send({ message: `Error: ${err}` })

			res.status(200).send({ message: `${productId} has been removed` })
		})
	})
}


module.exports = {
	getProduct,
	getProducts,
	saveProduct,
	updateProduct,
	deleteProduct
}


//END product.js
