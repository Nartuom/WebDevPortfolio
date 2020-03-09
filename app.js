var express = require("express"),
    nodemailer  = require("nodemailer"),
    nodemailerSendgrid = require('nodemailer-sendgrid'),
	bodyParser = require('body-parser'),
	ejs		= require("ejs"),
	app		= express();

    require("dotenv").config();

app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get("/", function(req, res){
	res.render("index");
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
<<<<<<< HEAD
    const transporter = nodemailer.createTransport(
        nodemailerSendgrid({
            apiKey: process.env.SENDGRID_API_KEY,
        })
    );
=======
    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: false,
        auth: {
        user: process.env.AD_EMAIL, // generated ethereal user
        pass: process.env.AD_PASSWORD // generated ethereal password
        },
        tls:{
            requireTLS: true,
            rejectUnauthorized:false,
        }
    });
>>>>>>> 9c07927f4484f500d928e07da7779275015ea595

    // send mail with defined transport object
    transporter.sendMail({
        from: email, // sender address
<<<<<<< HEAD
        to: "thomas.burton.lawl@gmail.com", // list of receivers
        subject: "Client Enquiry", // Subject line
        html: message,
=======
        to: process.env.AD_EMAIL, // list of receivers
        subject: "Client Enquiry", // Subject line
        text: message,
>>>>>>> 9c07927f4484f500d928e07da7779275015ea595
        }, function(error, info){
        if(error) {
            console.log(error);
        } else {
<<<<<<< HEAD
            console.log("Message sent successfully:");
=======
            console.log("Message sent successfully: %s", info.messageId);
>>>>>>> 9c07927f4484f500d928e07da7779275015ea595
            }

        });
    }
    main().catch(console.error);
    next(res.render("index"));  
    
});

// var port = process.env.PORT || 3000;
var url = process.env.DATABASEURL;
app.listen(process.env.PORT||3000, process.env.IP, function(){
	console.log("Server Live at " + url);
});
