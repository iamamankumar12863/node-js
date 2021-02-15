const express = require('express')
const app = express();
const path = require('path')
const hbs = require("hbs")
const requests = require("requests")

const templatePath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")

app.set("view engine", "hbs");
app.set("views", templatePath)
hbs.registerPartials(partialPath)

app.get("/", (req, res) => {
    res.render('index', {
        name: "aman"
    })
})

app.get("/about", (req, res) => {
    requests(`http://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&appid=b79cb3e381f78df44ad4b0947183ee09`)
        .on('data', (chunk) => {
            const objData = JSON.parse(chunk)
            const arrayData = [objData]
            console.log(`city name is ${arrayData[0].name} and teprature is ${arrayData[0].main.temp}`)
            // const realTimeData = arrayData.map((val) => {
            //     res.write(replaceVal(homeFile, val))
            // }).join("")
            res.write(arrayData[0].name);
        })
        .on('end', (err) => {
            if (err) return console.log('connection closed due to errors', err);
            res.end()
            console.log('end');
        });
})

app.get("/about/*", (req, res) => {
    res.render("404", {
        warning: "About Page Not Found"
    })
})


app.get("*", (req, res) => {
    res.render("404", {
        warning: "Page Not Found"
    })
})





app.listen(8000, () => {
    console.log("hello")
})