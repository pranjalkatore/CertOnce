const pool = require('./database');
const format = require('pg-format');

var fs = require('fs');  
var path = require('path');
const  exec  = require('child_process').exec;

function os_func() {    
   //*
    this.execCommand = function (cmd) {
        return new Promise((resolve, reject)=> {
           exec(cmd, (error, stdout, stderr) => {
             if (error) {
                reject(error);
                return;
            }
            resolve(stdout)
           });
       })
   }
   //*/
}
module.exports =async(content,sub,to,logfilename="/home/ubuntu/logs/default.log") => {
    const { google } = require("googleapis");
    const OAuth2 = google.auth.OAuth2;
    var nodemailer = require('nodemailer');
    
    var transporter;
    var from='admin@certonce.com';
    // var cc = account['cc'];
    var host=process.env.SMTP_HOST;
    var port=process.env.SMTP_PORT || '587';
    var username='admin@certonce.com';
    var password=process.env.PASSWORD;
    
    var transporter = nodemailer.createTransport({

        host: host,
        port: port,
        //secure: true,        
        secureConnection: false,
        pool: true,
        auth: {
            user: username,
            pass: password
        },
        tls: {
            ciphers:'SSLv3'
        }        
    });

    var mailOptions = {
        from: from,
        to: to,
        //cc: cc,
        subject: sub,
        html: content
    };

    var result = {};

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        result.status=200;
        result.message=info.response;
        var logdirpath = path.dirname(logfilename);
        var os = new os_func();            
        if (!await fs.existsSync(logdirpath))
        {
            await os.execCommand('sudo mkdir -p "'+logdirpath+'"');
            await os.execCommand('sudo chmod -R 777 "'+logdirpath+'"');
        }
        var logStream = fs.createWriteStream(logfilename, {flags: 'a'});   
        let date_ob = new Date();
        // current date
        // adjust 0 before single digit date
        let date = ("0" + date_ob.getDate()).slice(-2);

        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        // current year
        let year = date_ob.getFullYear();

        // current hours
        let hours = date_ob.getHours();

        // current minutes
        let minutes = date_ob.getMinutes();
        // current seconds
        let seconds = date_ob.getSeconds();  
        logStream.write("Success "+year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds+" from "+from+" to "+to+"\n");
        logStream.end();        
    } catch (error) {
        console.error('There was an error: ', error);
        result.status=400;
        result.message=error;
        var logdirpath = path.dirname(logfilename);
        var os = new os_func();            
        if (!await fs.existsSync(logdirpath))
        {
            await os.execCommand('sudo mkdir -p "'+logdirpath+'"');
            await os.execCommand('sudo chmod -R 777 "'+logdirpath+'"');
        }
        var logStream = fs.createWriteStream(logfilename, {flags: 'a'});  

        let date_ob = new Date();
        // current date
        // adjust 0 before single digit date
        let date = ("0" + date_ob.getDate()).slice(-2);

        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        // current year
        let year = date_ob.getFullYear();

        // current hours
        let hours = date_ob.getHours();

        // current minutes
        let minutes = date_ob.getMinutes();
        // current seconds
        let seconds = date_ob.getSeconds();

        logStream.write("Fail "+year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds+" from "+from+" to "+to+"\n");
        logStream.end();
    }
    return result;        
}

