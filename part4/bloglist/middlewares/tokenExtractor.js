const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getToken = async (request, response, next) => {
	const auth = request.get("authorization");
	if (auth && auth.toLowerCase().startsWith("bearer ")) {
		const token = auth.substring(7);
		const decodedToken = jwt.verify(token, process.env.SECRET);

		request.decodedToken = decodedToken;
		request.user = await User.findById(decodedToken.id);
	}else{
		response.status(401).json({error: "no valid token found !"});
	}
	next();
};

module.exports = getToken;