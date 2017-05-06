const express =  require('express');
const path = require('path');
const bodyParser = require('body-parser');
//const expressValidator = require('express-validator');
const nodemailer = require('nodemailer');

const  app = express();
const port = process.env.PORT || 8080;



/** Body Parser Middleware**/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/** Set Static Path**/
app.use(express.static(path.join(__dirname, './public/')));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,  './public/index.html'));
});

app.post('/', function (req, res) {
    let newUser = {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    };
    console.log(newUser);
    res.send('Message sent');
});

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'google',
    auth: {
        user: 'baklantat@gmail.com',
        pass: 'goodjoboriented'
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
    to: 'baklant@i.ua', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});


app.listen(port, function()  {
    console.log('Running on port ' + port);
});