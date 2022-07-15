const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")

const app = express()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res) {
  const first = req.body.fname;
  const last = req.body.lname;
  const email = req.body.email;

  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: first,
        LNAME: last
      }
    }]
  }

  var jsonData = JSON.stringify(data)
  const url = "https://us20.api.mailchimp.com/3.0/lists/2963ab3a53"
  const options = {
    method: "POST",
    auth: "aarya:2994536ae0b03edefb98b914fde0d1ca-us20"
  }

  const request = https.request(url, options, function(response) {

    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html")
    } else {
      res.sendFile(__dirname + "/failure.html")
    }

    response.on("data", function(data) {
      console.log(JSON.parse(data))
    })
  })
  request.write(jsonData)
  request.end()
})

app.post("/failure", function(req, res){
  res.redirect("/")
})
app.listen(process.env.PORT || 3000, function() {
  console.log("success");
})


// 2994536ae0b03edefb98b914fde0d1ca-us20
//2963ab3a53
