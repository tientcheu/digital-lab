
var express = require("express");
var app = express();

var agreementController = require("./src/agreement/agreement.controller.js");
var translationController = require("./src/translation/translation.controller.js");

/* serves main page */
app.get("/", function(req, res) {

    translationController.sayHelloInEnglish();

    agreementController.save(req, res);

    res.sendfile('./ressources/data/agreements.json')

});

/* serves main page */
app.get("/agreement/one", function(req, res) {

    agreementController.findOne(req, res);

    res.sendfile('./ressources/data/agreements/find-one.json')
});

/* serves main page */
app.get("/agreement/all", function(req, res) {

    agreementController.findAll(req, res);

    res.sendfile('./ressources/data/agreements/find-all.json')
});

app.post("/user/add", function(req, res) {
    /* some server side logic */
    res.send("OK");
});

/* serves all the static files */
app.get(/^(.+)$/, function(req, res){
    console.log('static file request : ' + req.params);
    res.sendfile( __dirname + req.params[0]);
});

var port = process.env.PORT || 5000;

app.listen(port, function() {
    console.log("Listening on " + port);
});