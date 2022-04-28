const express = require("express");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 8080;
const app = express();

app.use(cookieParser());

app.get("/", (req, res) => {
	res.cookie("myCooie", "myValue", { secure: true });
	res.cookie("cookie#2", "cookieValue#2", { maxAge: 10000 });
	res.end("hello world");
	console.log(res.getHeaders());
	console.log(req.cookie);
});

app.listen(`${port}`, () => {
	console.log(`Server running on locahost: ${port}`);
});
