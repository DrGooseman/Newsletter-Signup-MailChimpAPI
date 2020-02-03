const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: { FNAME: firstName, LNAME: lastName }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/c3df8950ad",
    method: "POST",
    headers: {
      Authorization: "key cb9751abc8ea909fb4f3fbd0bc89fd3f-us4"
    },
    body: jsonData
  };

  request(options, function(error, response, body) {
    if (error) res.sendFile(__dirname + "/failure.html");
    else {
      if (response.statusCode === 200)
        res.sendFile(__dirname + "/success.html");
      else res.sendFile(__dirname + "/failure.html");
    }
  });
});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000");
});

//cb9751abc8ea909fb4f3fbd0bc89fd3f-us4
//c3df8950ad
