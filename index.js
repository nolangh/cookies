const express = require("express");

const app = express();

app.get("/", (req, res) => {
	res.cookie("myCooie", "myValue");
	res.end("hello world");
});

app.get();
