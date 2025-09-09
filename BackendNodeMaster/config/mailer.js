var nodemailer = require("nodemailer");
var xoauth2 = require('xoauth2');


module.exports = (content,sub,to) => {
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
        /*host: 'smtp.office365.com',
        port: 587,
        auth: {
            user: 'admin@certonce.com',
            pass: 'process.env.SMTP_PASS'
        }
        */       
        //*
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
           auth: {
             user: process.env.SMTP_USER,
             pass: process.env.SMTP_PASS,
           }
        //*/
        /*
        host: 'smtp-relay.sendinblue.com',
        port: 587,
        auth: {
            user: 'admin@certonce.com',
            pass: process.env.SENDINBLUE_PASS,
        }
        //*/
    });

    var mailOptions = {
        from: 'CertOnce Admin <admin@certonce.com>',
        to: to,
        subject: sub,
        html: content
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}