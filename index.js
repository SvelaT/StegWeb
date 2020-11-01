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

app.post('/loading', function (req, res) { //When posting from this route, from the form
    handleRequest("PartialDigest", req, res);
})

function handleRequest(type, req, res) {
    var filename = req.files.file.name //Uploaded filename
    var path = './files/' + filename //Move file to local server path
    var search = req.body.text.replace(/ /g, '') //Getting sequence inserted

    req.files.file.mv(path, function (err) { //Moving file to specified local path
        if (err) {
            res.send(err)
        } else {
            try {
                readDNA(path, search) //if successfully completed start reading file
            } catch (e) {
                console.error(e)
            }
            const file = `${__dirname}/filesWrite.txt`;
            if (type == "BruteForceAlgorithm") {
                brute.main(n, x, dx, res)
            } else {
                partial.main(n, x, dx, res)
            }
        }
    })
}