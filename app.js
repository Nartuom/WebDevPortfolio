/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable linebreak-style */
/* eslint-disable no-inner-declarations */
const express = require('express');
const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
const bodyParser = require('body-parser');

const app = express();
const https = require('https');
const fs = require('fs');
const enforce = require('express-sslify');

require('dotenv').config();

const Recaptcha = require('express-recaptcha').RecaptchaV3;

const recaptcha = new Recaptcha(
  '6LcOuPsUAAAAAFBlAuCUCQ6kui7xBynfNBmXwPz1',
  process.env.SECRET_KEY,
  { callback: 'cb' },
);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.get('/', recaptcha.middleware.render, (req, res) => {
  res.render('index', { captcha: res.recaptcha });
});

app.get('/success', (req, res) => {
  res.render('success');
});
// body Parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Nodemailer
app.post('/', recaptcha.middleware.verify, (req, res) => {
  if (!req.recaptcha.error) {
    async function main() {
      const email = `${req.body.user_email}`;
      const name = `${req.body.user_name}`;
      const message = `<div><h3>New message from:</h3>${email}</div> 
                <div><h4>Name:</h4> ${name} </div>
                <div><h5>Message:</h5> ${req.body.user_message}</div>`;
      // Nodemailer route fror emails
      const transporter = nodemailer.createTransport(
        nodemailerSendgrid({
          apiKey: process.env.SENDGRID_API_KEY,
        }),
      );

      // send mail with defined transport object
      transporter.sendMail(
        {
          from: email, // sender address
          to: 'thomas.burton.lawl@gmail.com', // list of receivers
          subject: 'Client Enquiry', // Subject line
          html: message,
        },
        (error) => {
          if (error) {
            res.render('error');
          } else {
            res.render('success');
          }
        },
      );
    }
    main().catch(console.error);
  } else {
    // error code
    res.render('error');
  }
});

app.get('*', (req, res, next) => {
  fs.readFile('/file-does-not-exist', (error) => {
    if (error) {
      const error = new Error(`Someone tried to reach ${req.originalUrl}`);
      res.status(404).render('error');
      next(error);
    }
    res.render('index');
  });
});
console.log(process.env.USERDOMAIN);
if (process.env.USERDOMAIN === 'MARVIN' || process.env.USERDOMAIN === 'EGONSPENGLER') {
  https
    .createServer(
      {
        key: fs.readFileSync('../domain.key'),
        cert: fs.readFileSync('../rootSSL.pem'),
      },
      app,
    )
    .listen(3000, () => {
      console.log(
        'Example app listening on port 3000! Go to https://localhost:3000/',
      );
    });
} else {
  app.listen(process.env.PORT || 3000, process.env.IP, () => {
    console.log(`Server Live at ${process.env.IP}`);
  });
}
