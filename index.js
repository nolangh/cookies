const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const port = process.env.PORT || 8080;
const app = express();
app.use(cookieParser());

app.use(
	session({
		secret: "test string that remains secret",
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 100000 }, // NOTE: time is in miliseconds
	})
);

//ANCHOR this is middleware that calls next

app.use((req, res, next) => {
	next();
});

app.get("/", (req, res) => {
	res.cookie("myCookie", "myValue", { secure: true });
	res.cookie("cookie#2", "cookieValue#2", { maxAge: 10000 });
	res.end("hello world");
	console.log(res.getHeaders());
	console.log(req.cookie);
});

app.get("/views", (req, res) => {
	if (!req.session.views) {
		req.session.views = 1;
		res.end("Web Page\n");
		res.write(`views: ${req.session.views}`);
	} else {
		req.session.views++;
		res.write("Web Page\n");
		res.write(`views: ${req.session.views}\n`);
		res.write(`expires in: ${req.session.cookie.maxAge / 1000} seconds`);
		res.end();
	}
});

app.listen(`${port}`, () => {
	console.log(`Server running on locahost: ${port}`);
});
