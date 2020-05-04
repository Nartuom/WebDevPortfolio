var express = require("express"),
    nodemailer  = require("nodemailer"),
    nodemailerSendgrid = require('nodemailer-sendgrid'),
	bodyParser = require('body-parser'),
	ejs		= require("ejs"),
    app		= express(),
    https = require('https'),
    fs = require("fs"),
    enforce = require('express-sslify');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(enforce.HTTPS({ trustProtoHeader: true }));


app.get("/", function(req, res){
	res.render("index");
});

app.get("/success", function(req, res){
    res.render("success");
});

//body Parser middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


// Nodemailer
app.post("/", function(req, res, next){
    async function main() {

    const email = `${req.body.user_email}`;
    const name  = `${req.body.user_name}`;
    const message = 
        `<div><h3>New message from:</h3>${email}</div> 
        <div><h4>Name:</h4> ${name} </div>
        <div><h5>Message:</h5> ${req.body.user_message}</div>`      
        ;
    
    //Nodemailer route fror emails
    const transporter = nodemailer.createTransport(
        nodemailerSendgrid({
            apiKey: process.env.SENDGRID_API_KEY,
        })
    );

    // send mail with defined transport object
    transporter.sendMail({
        from: email, // sender address
        to: "thomas.burton.lawl@gmail.com", // list of receivers
        subject: "Client Enquiry", // Subject line
        html: message,
        }, function(error, info){
        if(error) {
            console.log(error);
            res.render("index");
        } else {
            console.log("Message sent successfully:");
            res.render("success");
            }
        });
    }
    main().catch(console.error);
    
});
app.get("*", function(req, res, next){
    fs.readFile("/file-does-not-exist", function(err, data){
        if(err){
            let err = new Error(`Someone tried to reach ${req.originalUrl}`);
            res.status(404).render("error");
            next(err);
        } 
        res.render("index");
    })
});

var url = process.env;
if(process.env.USERDOMAIN == "MARVIN"){
https.createServer({
    key: fs.readFileSync('../private-key.key'),
    cert: fs.readFileSync('../rootSSL.pem')
    }, app)
    .listen(3000, function () {
    console.log('Example app listening on port 3000! Go to https://localhost:3000/')
      });
  } else {
app.listen(process.env.PORT||3000, process.env.IP, function(){
    console.log("Server Live at " + process.env.IP);
  });
}
