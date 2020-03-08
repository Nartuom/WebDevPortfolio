var express = require("express"),
	nodemailer  = require("nodemailer"),
	bodyParser = require('body-parser'),
	ejs		= require("ejs"),
	app		= express();

    require("dotenv").config();
const key = require("./key.json");

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
        `New message from: ${email}
        Name: ${name} 
        Message: ${req.body.user_message}`      
        ;
    
    //Nodemailer route fror emails
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

    // send mail with defined transport object
    transporter.sendMail({
        from: email, // sender address
        to: process.env.AD_EMAIL, // list of receivers
        subject: "Client Enquiry", // Subject line
        text: message,
        }, function(error, info){
        if(error) {
            console.log(error);
        } else {
            console.log("Message sent successfully: %s", info.messageId);
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
