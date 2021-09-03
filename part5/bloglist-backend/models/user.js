const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		minLength: 3,
		unique: true,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	passwordhash: {
		type: String,
		required: true
	},
	blogs: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Blog",
		default: []
	}]
});

userSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;

		// hiding the password
		delete returnedObject.passwordhash;
	}
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
