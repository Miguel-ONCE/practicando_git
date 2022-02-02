const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
    

    const id =  Number(req.body.selectedId);
    const url = `https://rickandmortyapi.com/api/character/${id}#`;

    https.get(url, function (response) {
        response.on("data", function (data) {
           const character = JSON.parse(data);
           const characterName = character.name
           const imageURL = character.image

           res.write(`<h1>${characterName}<h1/>`)
           res.write(`<img src=${imageURL}>`)
           res.send();
        })
    })
})


app.listen(3000, function () {
    console.log("Server is runnnig on port 3000");
})
