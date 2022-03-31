const express = require("express");
const https = require("https");

const app = express();
const temp = "";
const weatherDesc = "Search for Temperature";
const query = "";

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("index", {
    temp1: temp,
    des: weatherDesc,
    place: query,
  });
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apikey = "d024875057b2e29e0afbb08d0a9c2a0a";
  const unit = "metric";
  let url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apikey +
    "&units=" +
    unit;
  https.get(url, (response) => {
    console.log(response.statusCode);

    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const temperature1 = temp + "° C";
      const weatherDesc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;

      res.render("index", {
        temp1: temperature1,
        des: weatherDesc,
        place: query,
      });
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});
