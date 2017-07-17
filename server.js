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

    forwardUserMessage(newUser);
    res.send('Message sent');
});

function forwardUserMessage(newUser) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'yandex',
        auth: {
            user: 'testapps.baklan@yandex.ru',
            pass: 'test9999'
        }
    });

// setup email data with unicode symbols
    let mailOptions = {
        from: ' "Autonomous Classroom Vehicles" <testapps.baklan@yandex.ru>', // sender address
        to: 'baklantat@gmail.com', // list of receivers
        replyTo: newUser.email,
        subject: 'Autonomous Classroom Vehicles', // Subject line
        text: newUser.name + ":\n"  + newUser.message, // plain text body
    };

// send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log("Send mail error: ", error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}


app.listen(port, function()  {
    console.log('Running on port ' + port);
});