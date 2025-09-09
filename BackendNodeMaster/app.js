

var a = Buffer.from('Hello World!').toString('base64');
console.log(a);

var b = Buffer.from(a, 'base64').toString();

console.log(b)

var verifier = require('email-verify');
var infoCodes = verifier.infoCodes;
 
verifier.verify( 'ashokcse505sdsadfr43543654t3@gmail.com', function( err, info ){
  if( err ) 
  {
      console.log(err);
  }
  else{
    console.log( "Success (T/F): " + info.success );
    console.log( "Info: " + info.info );
 
    // //Info object returns a code which representing a state of validation:
 
    // //Connected to SMTP server and finished email verification
    // console.log(info.code === infoCodes.finishedVerification);
 
    // //Domain not found
    // console.log(info.code === infoCodes.domainNotFound);
 
    // //Email is not valid
    // console.log(info.code === infoCodes.invalidEmailStructure);
 
    // //No MX record in domain name
    // console.log(info.code === infoCodes.noMxRecords);
 
    // //SMTP connection timeout
    // console.log(info.code === infoCodes.SMTPConnectionTimeout);
 
    // //SMTP connection error
    // console.log(info.code === infoCodes.SMTPConnectionError)
  }
});

// var jwt = require('jsonwebtoken');