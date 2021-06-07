const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const url = process.env.MONGODB_URI

console.log("connection to the mongodb...")

mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	})
	.then(() => console.log("connected to the mongodb!"))
	.catch((err) => console.log("error connection to the mongoDB : ", err))

const contactSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		unique: true,
		required: true
	},
	number: {
		type: String,
		minLength: 8,
		required: true
	}
})

contactSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

contactSchema.plugin(uniqueValidator)

module.exports = mongoose.model("Contact", contactSchema)
