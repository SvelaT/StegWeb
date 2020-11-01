const express = require('express')
const fs = require('fs')
const upload = require('express-fileupload')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'));

app.use(upload()) // In order to use file upload module

app.listen(port, () => console.log(`Example app listening on port ` + port + `!: ` + `http://127.0.0.1:3000`)) //Server starting

app.get('/', (req, res) => res.redirect("/loading")) //Redirecting to loading HTML file

app.get('/loading', (req, res) => res.sendFile(__dirname + "/loading.html")) //Getting HTML from file

app.get('/unloading', (req, res) => res.sendFile(__dirname + "/unloading.html")) //Getting HTML from file
