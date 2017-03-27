var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var books = require('../models/books');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'engineeringbooksbuyandsell@gmail.com',
        pass: 'Engineeringbooks'
    }
});


router.get('/', function(req, res, next){
        var data = {
            title: "Engineering Books Buy & Sell",
            user: req.user
        }
    res.render('contact', {title: 'Contact'});  
});

router.post('/send-email', function(req, res, next){
    var inquiry = {
        from: 'engineeringbooksbuyandsell@gmail.com',
        to: 'engineeringbooksbuyandsell@gmail.com',
        subject: 'Buy and Sell Engineering Books',
        text: "Name: " + req.body.name + '\n' +
        "Email: " + req.body.email + '\n' +
        "Message: " + req.body.message
    }
    
    var mailOptions = {
        from: 'Team Engineering Books Buy and Sell <engineeringbooksbuyandsell@gmail.com>',
        to: req.body.email,
        subject: 'You got a Buyer!',
        text: "Name of the Buyer: " + req.body.name + '\n' +
        "Contact Number of the Buyer: " + req.body.number + '\n' +
        "Message of the Buyer: " + req.body.message
    }

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.redirect('/');
        } else {
            console.log('Message Sent: '+info.response);
            res.redirect('/contact');
        }
    });
});
module.exports = router;