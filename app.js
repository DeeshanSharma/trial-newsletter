const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
	const fname = req.body.fname;
	const lname = req.body.lname;
	const email = req.body.email;
	const data = {
		members: [
			{
				email_address: email,
				status: "subscribed",
				merge_fields: {
					FNAME: fname,
					LNAME: lname,
				},
			},
		],
	};

	const jsonData = JSON.stringify(data);
	const url = "https://us7.api.mailchimp.com/3.0/lists/ed12ed24fb";
	const options = {
		method: "POST",
		auth: "elliot:dd66bfe1f1fcac0839efcff6037d216f-us7",
	};

	const request = https.request(url, options, (request) => {
		if (request.statusCode === 200) {
			res.sendFile(__dirname + "/success.html");
		} else {
			res.sendFile(__dirname + "/failure.html");
		}
	});

	request.write(jsonData);
	request.end();
});

app.listen(process.env.PORT, () => console.log("Server is running on port 3000"));

// API
// dd66bfe1f1fcac0839efcff6037d216f-us7

// List id
// ed12ed24fb
