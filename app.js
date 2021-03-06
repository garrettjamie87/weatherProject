const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "public/style.css");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "b7eabe995546dde5f08786249f6b2228";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&APPID=" +
    apiKey +
    "&units=" +
    unit;

  https.get(url, function (response) {
    //     console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(`<p>the weather is currently ${weatherDescription}</p>`);
      res.write(`<h1>The temp in ${query} is ${temp} degrees Celcius.</h1>`);
      res.write(`<img src=${imageURL}>`);
      res.send();
    });
  });
});

//

//runs in terminal
app.listen(3000, function () {
  console.log("server is running");
});
