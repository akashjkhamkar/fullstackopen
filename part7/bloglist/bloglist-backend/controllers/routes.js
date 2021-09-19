const blogsRouter = require("express").Router(); 
const Blog = require("../models/blogs");
const tokenExtractor = require("../middlewares/tokenExtractor");

blogsRouter.get("/",  async (request, response) => {
	const result = await Blog.find({}).populate("user", {username: 1, name: 1, id: 1});
	response.json(result);
});

blogsRouter.post("/", tokenExtractor, async (request, response) => {
	const user = request.user;

	const newBlog = {
		title: request.body.title,
		url: request.body.url,
		likes: request.body.likes,
		author: request.body.author,
		user: user.id
	}; 
	
	const blog = new Blog(newBlog);
	const savedBlog = await blog.save();
	
	user.blogs = user.blogs.concat(savedBlog.id);
	
	await user.save();
	response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", tokenExtractor, async (request, response) => {
	const user = request.user;

	const blogToBeDeleted = await Blog.findById(request.params.id);
	
	if (!blogToBeDeleted) {
		response.status(400).send("not found");
	}

	if (blogToBeDeleted.user.toString() !== user.id) {
		return response.status(401).json({error: "not authenticated"});
	}

	user.blogs = user.blogs.map(blog => blog.id !== blogToBeDeleted.id);
	user.save();

	await Blog.findByIdAndRemove(blogToBeDeleted.id);
	response.status(204).end();
});

// blogsRouter.put("/likes/:id", async (request, response) => {
// 	const id = request.params.id;
// 	const updatedBlog = {
// 		likes: request.body.likes
// 	};

// 	const res = await Blog.findByIdAndUpdate(id, updatedBlog, {
// 		runValidators: true,
// 		new: true
// 	});

// 	if (res) {
// 		response.json(res);
// 	}else{
// 		response.status(400).end();
// 	}
// });

blogsRouter.put("/likes/:id", tokenExtractor, async (request, response) => {
	const id = request.params.id;
	
	const blogTochange = await Blog.findById(id);
		
	if (!blogTochange) {
		response.status(400).send("not found");
	}

	console.log("mod",blogTochange.likes);
	blogTochange.likes++;
	
	const res = await Blog.findByIdAndUpdate(id, blogTochange, {
		runValidators: true,
		new: true
	}).populate("user", {username: 1, name: 1, id: 1});

	if (res) {
		response.json(res);
	}else{
		response.status(400).end();
	}
});

blogsRouter.put("/comments/:id", tokenExtractor, async (request, response) => {
	const id = request.params.id;
	const comment = request.body.comment;

	console.log(comment);
	const blogTochange = await Blog.findById(id);
			
	if (!blogTochange) {
		response.status(400).send("not found");
	}

	blogTochange.comments.push(comment);

	const res = await Blog.findByIdAndUpdate(id, blogTochange, {
		runValidators: true,
		new: true
	}).populate("user", {username: 1, name: 1, id: 1});

	if (res) {
		response.json(res);
	}else{
		response.status(400).end();
	}
});

module.exports = blogsRouter;