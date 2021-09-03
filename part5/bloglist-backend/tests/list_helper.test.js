const listHelper = require("../utils/list_helper");
const blogs = listHelper.blogs;
const listWithOneBlog = listHelper.listWithOneBlog;

test("dummy returns one", () => {
	const blogs = [];

	const result = listHelper.dummy(blogs);
	expect(result).toBe(1);
});

describe("total likes", () => {
	test("when list has only one blog, equals the likes of that", () => {
		const result = listHelper.totalLikes(listWithOneBlog);
		expect(result).toBe(5);
	});

	test("when list has many blogs", () => {
		const result = listHelper.totalLikes(blogs);
		expect(result).toBe(36);
	});
});

describe("favourite blog", ()=>{
	test("when list has only one blog", () => {
		const result = listHelper.favoriteBlog(listWithOneBlog);
		expect(result).toEqual(listWithOneBlog[0]);
	});

	test("when list has many blogs", () => {
		const result = listHelper.favoriteBlog(blogs);
		const expected = {
			_id: "5a422b3a1b54a676234d17f9",
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
			url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
			likes: 12,
			__v: 0
		};
		expect(result).toEqual(expected);
	});
});

describe("most blogs", () => {

	test("when list has only one blog", () => {
		const result = listHelper.mostBlogs(listWithOneBlog);
		expect(result).toEqual({"Edsger W. Dijkstra":1});
	});

	test("when list many blogs", () => {
		const result = listHelper.mostBlogs(blogs);
		expect(result).toEqual({"Robert C. Martin": 3});
	});
});

describe("most likes", () => {
	test("when list has many blogs", ()=>{
		expect(listHelper.mostLikes(blogs)).toEqual({ "Edsger W. Dijkstra": 17 });
	});
});


module.exports = {
	blogs,
	listWithOneBlog
};