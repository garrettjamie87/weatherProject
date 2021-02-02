const express = require("express");
const https = require("https");

const app = express();

//runs in browser (home)
app.get("/", function (req, res) {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=Barcelona&APPID=b7eabe995546dde5f08786249f6b2228&units=metric";

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function(data){
          const weatherData = JSON.parse(data)
          console.log(weatherData);
          const temp = weatherData.main.temp
          console.log(temp)
          const weatherDescription = weatherData.weather[0].description
          console.log(weatherDescription)      
      })
  });

  res.send("server is running bread bin");
});

//runs in terminal
app.listen(3000, function () {
  console.log("server is running");
});
