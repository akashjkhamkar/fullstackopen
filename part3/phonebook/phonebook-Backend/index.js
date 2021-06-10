require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const Contact = require("./models/contact.js")
const app = express()

app.use(express.static("build"))
app.use(express.json())
app.use(cors())

morgan.token("body", (req) => JSON.stringify(req.body))

app.use(
	morgan(":method :url :status :res[content-length] - :response-time ms :body")
)


app.get("/", (req, res) => {
	res.send("hello world!")
})

app.get("/api/persons", (req, res, next) => {
	Contact.find({})
		.then((Contacts) => res.json(Contacts))
		.catch((err) => next(err))
})

app.get("/api/persons/:id", (req, res, next) => {
	const id = req.params.id
	Contact.findById(id)
		.then((contact) => {
			if (contact) {
				res.json(contact)
			} else {
				res.status(404).end()
			}
		})
		.catch((err) => {
			next(err)
		})
})

app.delete("/api/persons/:id", (req, res, next) => {
	const id = req.params.id
	Contact.findByIdAndRemove(id)
		.then((result) => {
			if (result) {
				res.status(204).end()
			}
			return res.status(400).end()
		})
		.catch((err) => next(err))
})

app.post("/api/persons", (req, res, next) => {
	const body = req.body

	const newContact = new Contact({
		name: body.name,
		number: body.number
	})

	newContact
		.save()
		.then((savedContact) => {
			res.json(savedContact)
		})
		.catch((err) => next(err))
})

app.put("/api/persons/:id", (req, res, next) => {
	const body = req.body
	const id = req.params.id

	const updatedContact = {
		number: body.number
	}

	Contact.findByIdAndUpdate(id, updatedContact, {
		runValidators: true,
		new: true
	})
		.then((result) => {
			if (result) {
				res.json(result)
			}
			return res.status(400).end()
		})
		.catch((err) => next(err))
})

app.get("/info", (req, res, next) => {
	Contact.countDocuments({}, (err, count) => {
		let r = `Phonebook has info for ${count} people`
		let date = "<br>" + new Date()
		res.send(r + date)
	}).catch(err=>next(err))
})

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: "unknown endpoint" })
}

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" })
	} else if (error.name === "ValidationError") {
		return response.status(400).send({ error: error.message })
	}

	next(error)
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
	console.log("server is running on 3001 !")
})
