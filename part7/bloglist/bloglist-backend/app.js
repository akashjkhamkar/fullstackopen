require("dotenv").config();
const express = require("express");
require("express-async-errors");

const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const blogsRouter = require("./controllers/routes");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const testingRoute = require("./controllers/testing");

const errorHandler = require("./middlewares/errorhandler");

const mongoUrl = process.env.NODE_ENV === "test" 
	? process.env.TEST_MONGODB_URI
	: process.env.MONGODB_URI;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
	.then(()=>console.log("connected to mongo"))
	.catch("failed to connect");

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if(process.env.NODE_ENV === "test"){
	app.use("/api/testing", testingRoute);
}

app.use(errorHandler);
module.exports = app;