var nodemailer = require("nodemailer");
var xoauth2 = require('xoauth2');


module.exports =async(content,sub,to,host,port,username,password,attachmentjsonfile="",attachmentpdffile="",attachment_filename="") => {

   if(host==""||port==""||username=="")
   {
       host='smtp.gmail.com';
       port='465';
       username=process.env.SMTP_USER;
       password=process.env.SMTP_PASS;
   }
    cc="info@enhelion.com";
    return new Promise((resolve,reject)=>{
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({


        host: host,
        port: port,
        //secure: true,        
        secureConnection: false,
        auth: {
            user: username,
            pass: password
        },
        tls: {
            ciphers:'SSLv3'
        }
        
    });

    var mailOptions = {
        from: username,
        to: to,
        cc: cc,
        subject: sub,
        html: content
    };

    if(attachmentpdffile!==""&&attachmentjsonfile!=="")
    {
        mailOptions = {
        from: username,
        to: to,
        cc: cc,
        subject: sub,
        html: content,
        attachments:[{path:attachmentjsonfile,filename:attachment_filename+".json"},{path:attachmentpdffile,filename:attachment_filename+".pdf"}]
       };
    }
    else if(attachmentpdffile!==""&&attachmentjsonfile=="")
    {
        mailOptions = {
        from: username,
        to: to,
        cc: cc,
        subject: sub,
        html: content,
        attachments:[{path:attachmentpdffile,filename:attachment_filename+".pdf"}]
       };
    }
    else if(attachmentpdffile==""&&attachmentjsonfile!=="")
    {
        mailOptions = {
        from: username,
        to: to,
        cc: cc,
        subject: sub,
        html: content,
        attachments:[{path:attachmentjsonfile,filename:attachment_filename+".json"}]
       };
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            resolve(false);
        } else {
            console.log('Email sent: ' + info.response);
            resolve(true);
        }
    });
  });
}

