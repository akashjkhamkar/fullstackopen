const listHelper = require("../utils/list_helper");
const app = require("../app");
const supertest = require("supertest");
const mongoose = require("mongoose");
const Blog = require("../models/blogs");

const api = supertest(app);

const blogs = listHelper.blogs;

beforeEach(async () => {
	console.log("resetting the db");
	await Blog.deleteMany({});
	console.log("db reset");
});
  
describe("api", () => {
	test("correct number of blogs returned", async () => {
		let blogObject = new Blog(blogs[0]);
		await blogObject.save();
		blogObject = new Blog(blogs[1]);
		await blogObject.save();

		const res = await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/);

		expect(res.body.length).toBe(2);
	});

	test("correct number of blogs for single element", async () => {
		let blogObject = new Blog(blogs[0]);
		await blogObject.save();

		const res = await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/);
        
		expect(res.body.length).toBe(1);
	});

	test("Verifying the existence of id property", async () => {
		let blogObject = new Blog(blogs[0]);
		await blogObject.save();
        
		const res = await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/);
        
		expect(res.body[0].id).toBeDefined();
	});

	test("Verifying adding a blog works", async () => {
		let blogObject = new Blog(blogs[0]);
		await blogObject.save();
        
		const newBlog = {
			title: "Importance of fresh air",
			author: "Rubeus Hagrid",
			url: "https://gatekeeping101.com/",
			likes: 7
		};

		await api
			.post("/api/blogs")
			.send(newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		//now making get request to check added blog exists
		const allBlogs = await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/);
        
		expect(allBlogs.body.length).toBe(2);
		expect(allBlogs.body)
			.toContainEqual(
				expect.objectContaining(newBlog)
			);
	});

	test("Verifying if default value of likes is 0", async () => {
		// no like field
		const newBlog = {
			title: "Importance of fresh air",
			author: "Rubeus Hagrid",
			url: "https://gatekeeping101.com/",
		};

		const res = await api
			.post("/api/blogs")
			.send(newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		expect(res.body.likes).toBe(0);
	});

	test("Verifying if validation works", async () => {

		// no tile and url
		const newBlog = {
			author: "niggas"
		};

		await api
			.post("/api/blogs")
			.send(newBlog)
			.expect(400)
			.expect("Content-Type", /application\/json/);
	});
});

afterAll(() => {
	mongoose.connection.close();
});

jest.setTimeout(10000);