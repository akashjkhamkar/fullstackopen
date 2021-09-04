const loginRouter = require("express").Router(); 
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

loginRouter.post("/", async (request, response) => {
	const body = request.body;

	const user = await User.findOne({ username: body.username });
	
	const passwordCorrect = user === null
		? false
		: await bcrypt.compare(body.password, user.passwordhash);
  
	if (!(user && passwordCorrect)) {
		return response.status(401).json({
			error: "invalid username or password"
		});
	}
    
	const userfortoken = {
		username: user.username,
		id: user.id
	};

	const token = jwt.sign(userfortoken, process.env.SECRET,  { expiresIn: 60*60*24 });

	response.send({
		token,
		username: user.username,
		name: user.name
	});
});


module.exports = loginRouter;