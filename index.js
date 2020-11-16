const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// test endpoint
app.get('/', (req, res) => {
  res.send('Personal website api test');
});

// send email service endpoint
app.post('/sendmessage', (req, res) => {
  var data = req.body;

  // configure simple mail transport protocol
  var smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    auth: { user: process.env.SENDER_EMAIL, pass: process.env.SENDER_PASSWORD },
  });

  // configure email
  var mailOptions = {
    from: data.email,
    to: process.env.RECEIVER_EMAIL,
    subject: `${data.email} - MESSAGE SENT FROM DEVENSWIERGIEL.COM`,
    html: `<p>From: ${data.name}</p> <p>Email: ${data.email}</p> <p>Message: ${data.message}</p>`,
  };

  // send email
  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.send(error);
    } else {
      res.send('Message Sent Successfully!');
    }
    smtpTransport.close();
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
