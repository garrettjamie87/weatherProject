const express = require("express");
const https = require("https");

const app = express();

//runs in browser (home)
app.get("/", function (req, res) {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=Barcelona&APPID=b7eabe995546dde5f08786249f6b2228&units=metric";

  https.get(url, function (response) {
    //     console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write(`<p>the weather is currently ${weatherDescription}</p>`);
      res.write(`<h1>The temp in BCN is ${temp} degrees Celcius.</h1>`);
      res.write(`<img src=${imageURL}>`);
      res.send();
    });
  });
});

//runs in terminal
app.listen(3000, function () {
  console.log("server is running");
});
