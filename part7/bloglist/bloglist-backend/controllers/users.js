const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.get("/", async (request, response) => {
	// await User.deleteMany({});
	// await Blog.deleteMany({});
	const result = await User.find({}).populate("blogs", {title: 1, author: 1, url: 1});
	response.json(result);
});

usersRouter.post("/", async (request, response) => {
	const saltrounds = 10;
	const body = request.body;

	if (Object.keys(body).length == 0) {
		return response.status(400).json({
			error: "empty body"
		});
	}

	if (!body.password || body.password.length < 3) {
		return response.status(401).json({
			error: "password needs to be at least 3 characters long !"
		});	
	}
	
	const passwordhash = await bcrypt.hash(body.password, saltrounds);
	const newUser = new User({
		name: body.name,
		username: body.username,
		passwordhash
	});

	const savedUser = await newUser.save();
	response.json(savedUser);
});

module.exports = usersRouter;