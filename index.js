const express = require('express')
const fs = require('fs')
const upload = require('express-fileupload')
const spawn = require("child_process").spawn;

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'));

app.use(upload()) // In order to use file upload module

app.listen(port, () => console.log(`Example app listening on port ` + port + `!: ` + `http://127.0.0.1:3000`)) //Server starting

app.get('/', (req, res) => res.redirect("/loading")) //Redirecting to loading HTML file

app.get('/loading', (req, res) => res.sendFile(__dirname + "/loading.html")) //Getting HTML from file

app.get('/unloading', (req, res) => res.sendFile(__dirname + "/unloading.html")) //Getting HTML from file

app.post('/loading', function (req, res) { //When posting from this route, from the form
    if (typeof (req.files.file) != 'undefined') {
        req.files.file.name = "image.png"
        var image = req.files.file.name //Uploaded filename
        var imagePath = './upload/' + image //Move file to local server path
        req.files.file.mv(imagePath)
    }
    if (typeof (req.files.text) != 'undefined') {
        req.files.text.name = "text.txt"
        var text = req.files.text.name //Uploaded filename
        var textPath = './upload/' + text //Move file to local server path
        req.files.text.mv(textPath)
    }

    if (fs.existsSync("./upload/image.png") && fs.existsSync("./upload/text.txt")) {
        var process = spawn('python', ["./steganoImagePut.py",
            "./upload/image.png",
            "./upload/text.txt",
            "./steganoImage.png"]);

        process.stdout.on('data', function (data) {
            res.send(data.toString());
        })
         
    }

})


