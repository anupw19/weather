require("dotenv").config();
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")
const app = express();
const ejs = require("ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine' ,'ejs');
app.use(express.static("public"));

app.get("/",function(req,res){
    res.render("index");
})

app.post("/",function(req, res){

    var city = req.body.cityName;
    var unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+process.env.APPKEY+"&units="+unit;
    https.get(url, function(response){
        
        // console.log(response.statusCode);

        response.on("data",function(data){
           const weatherData = JSON.parse(data)
        //    console.log(weatherData.main.temp);
           const temp = weatherData.main.temp
           const weatherDescription = weatherData.weather[0].description
           const icon = weatherData.weather[0].icon
           const imageURL = "https://openweathermap.org/img/wn/"+ icon +"@2x.png"

           res.render("data",{weatherDiscription: weatherDescription, temperature: temp, image: imageURL,cityName: city})


        //    res.write("<p>The weather is currently : " + weatherDescription + "<p>")
        //    res.write("<h1>The temperature in "+city+" is : "+ temp +" degree celcius.</h1>")
        //    res.write("<img src=" + imageURL + ">")
        //    res.send()
        })

        
    });
    
})





app.listen(3000,function(req,res){
   console.log("server is running on port 3000");
})