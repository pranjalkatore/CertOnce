const { fromPath } = require('pdf2pic'); // Import fromPath from pdf2pic
const pngjs = require('pngjs');
const JSQR = require('jsqr');
const Jimp = require('jimp');
const QRCode = require("qrcode");
const { PDFDocument } = require('pdf-lib');
const XLSX = require('xlsx');
const { BlobServiceClient } = require('@azure/storage-blob');
const mime = require('mime-types');
// const JSBARCODE = require("jsbarcode");
const { createCanvas, loadImage, Canvas, Image } = require("canvas");
const mergeImages = require('merge-images');
var path = require('path');
const pdfparse = require('pdf-parse');
const request_native = require("request-promise-native");
var pngitxt = require('png-itxt');
const getUuid = require('uuid-by-string');
const UUID = require('uuid');
var readline = require('readline');
var stream = require('stream');
var fs = require('fs'); 
var AdmZip = require("adm-zip");
var multiparty = require('multiparty');
const axios = require('axios');
const qs = require('qs');
const { Poppler } = require("node-poppler");
var IMAGES = require("images");
const etherscanapi = require('etherscan-api').init('BY6WHRJ7D6V427Y5QWJ569CQGR4B3DQVUU');

var common_content = fs.readFileSync("../backend-common-lib/commonfuncs.js");
common_content = common_content.toString();
fs.writeFileSync("../backend-node-master/app/User/commonfuncs.js", common_content);
var common_lib = require("./commonfuncs.js");
var module_1_content = fs.readFileSync("../backend-common-lib/template_module_1.js");
module_1_content = module_1_content.toString();
fs.writeFileSync("../backend-node-master/app/User/template_module_1.js", module_1_content);
var template_module_1 = require("./template_module_1.js");
const fsExtra = require('fs-extra');
var extfs = require('extfs');
const {promisify} = require("util");
const writeFile = promisify(fs.writeFile);
var csvWriter = require('csv-write-stream')
//const exec = promisify(require('child_process').exec);
const exec = require('child_process').exec;
var user_1 = {};
const pool = require('../../config/database');
const format = require('pg-format');
var config = require("../../config/config");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var verifier = require('email-verify');
var infoCodes = verifier.infoCodes;

var mailler = require("../../config/mailer");
var mailler_forinvite = require("../../config/mailer_forinvite");
var multer = require('multer');
var pdfforscanqrcode_path="/tmp/pdfforscanqrcode";
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, pdfforscanqrcode_path)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
});
var upload = multer({ storage: storage }).single('fileInput');
var extract = require('extract-zip');
const puppeteer = require('puppeteer');
const hb = require('handlebars');
const fetch = require('node-fetch');
var validator = require("email-validator");
const ethWallet = require('ethereumjs-wallet');
var aws = require("aws-sdk");
aws.config.update({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  region: config.region,
});
const kms = new aws.KMS({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  region: config.region,
});
const utils = require("../utils.js");

const GALGOTIAS_IMAGE_PATH = "/home/ubuntu/certificate_manage/Galgotias-Image/";
const MANAV_IMAGE_PATH = "/home/ubuntu/certificate_manage/Manav-Image/";
const CUTM_IMAGE_PATH = "/home/ubuntu/certificate_manage/CUTM-Image/";
const DOWNLOAD_ZIP_PATH = "/var/www/html/download/";
const DOWNLOAD_TEMP_PATH = "/tmp/download_certificate/";
var myip="https://www.certonce.com";
//var myverifyip="https://verify.certonce.com";
var homedir="/home/ubuntu";
var wwwdir="/var/www/html";
var subwwwurl="";
var containerid = "db8c0971d871";
var containeridgs = "a6295fa568d0";

var jsonbasepathgs=homedir+"/datags/"
//var verifier_url=myverifyip+subwwwurl+"/verifier.php";
//var verifier_url_direct=myverifyip+subwwwurl+"/verifier/";
var verifier_url=myip+subwwwurl+"/verifier.php";
var verifier_url_direct=myip+subwwwurl+"/verifier/";

var bucket_name="certonce";
var bucket_region="us-east-2";
var bucket_key="signedcertificates/education/json/";
var bucket_key_pdf="signedcertificates/education/pdf/";
var bucket_key_img="signedcertificates/education/img/";
var bucket_object_base_url="https://"+bucket_name+".s3."+bucket_region+".amazonaws.com/";
//////////////////////////////////live params//////////////////////
var issuer_revocation_base_url=myip+subwwwurl+"/blockchain/";
var issuer_revocation_base_path=wwwdir+subwwwurl+"/blockchain/";


/////////openbadges issuer//////////
var issuer_revocation_openbadges_base_url=myip+subwwwurl+"/openbadges/issuer/";
var issuer_revocation_openbadges_base_path=wwwdir+subwwwurl+"/openbadges/issuer/";
var openbadges_base_path=wwwdir+subwwwurl+"/openbadges/baked/";
var openbadges_api_base_path=wwwdir+subwwwurl+"/openbadges/api/";
////////////////////////////////////

var introport=":5000";

var receipientsbasedir=homedir+"/cert-tools/sample_data/rosters/";
var receipientsfilename="roster_testnet.csv";
var certtemplatebasedir=homedir+"/cert-tools/sample_data/certificate_templates/";
var certtemplatefilename="test.json";


var unsignedcertificatetemppath=homedir+"/cert-tools/sample_data/unsigned_certificates/"
var unsignedcertificatepath=wwwdir+subwwwurl+"/blockchain/certificates/unsignedcertificate/"
var unsignedcertificatebaseurl=myip+subwwwurl+"/blockchain/certificates/unsignedcertificate/"
var signedcertificatepath=wwwdir+subwwwurl+"/blockchain/certificates/signedcertificate/"
var signedcertificatebaseurl=myip+subwwwurl+"/blockchain/certificates/signedcertificate/"



var issuerfilename="issuer.json";
var revokelistfilename="revocation-list.json";
var issuercontent = require("../../issuer_revocation/"+issuerfilename);
var revokelistcontent = require("../../issuer_revocation/"+revokelistfilename);
////////////////////////////////live params end/////////////////////
//////////////////////////Get started params////////////////////////
var templatecontentgs = require("../../getstarted/unsignedtemplate/template.json");
var unsignedcertificatepathgs=wwwdir+subwwwurl+"/blockchain/certificates/gs/unsignedcertificate/"
var signedcertificatepathgs=wwwdir+subwwwurl+"/blockchain/certificates/gs/signedcertificate/"
var unsignedcertificatebaseurlgs=myip+subwwwurl+"/blockchain/certificates/gs/unsignedcertificate/"
var signedcertificatebaseurlgs=myip+subwwwurl+"/blockchain/certificates/gs/signedcertificate/"
//////////////////////////Get started params end////////////////////

//IILM parameter
var global_campus_name ={"20108":"IILM University, Greater Noida","20109":"IILM University, Gurugram","11":"IILM University, Gurugram", "20117": "IILM Academy of Higher Learning, Lucknow"};
var global_pdf_type ={"transcript":"transcript", "semesterwisegradecard":"marksheet"};

var logfiledir="/home/ubuntu/logs/";
var oauth_account = {
  'username': process.env.OAUTH_USERNAME,
  'password': process.env.OAUTH_PASS,
  'grant_type': 'password',
  'client_id': process.env.OAUTH_CLIENT_ID,
  'client_secret': process.env.OAUTH_CLIENT_SECRET
};

var generator = require('generate-password');
const { string } = require("pg-format");
var password = generator.generate({
  length: 10,
  numbers: true
});
function isEmpty(obj) {
  for (var key in obj) {
    if ( obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

function change_json_field_name_for_student(data){
  let collegefieldreplace = {    
    'iilm_gurugram_student': {
      'batch': 'subother1',
      'programme': 'competencyname',
      'convocationday': 'subother2',
      'convocationmonth': 'subother3',
      'convocationyear': 'subother4',
      'degreenumber': 'subother5',
    },
    'iilm_gurugram_transcript': {
      'trimesternumber': 'semesternumber',
      'coursecode': 'subjecttype',
      'coursename': 'subjectname',
      'gradeobtained': 'semesother1',
      'gradepoint': 'semesother2',
      'creditpoint': 'semesother3',
      'totalcredit': 'other1',
      'totalcreditpoint': 'other2',
      'sgpa': 'other3'
    },
    'iilm_gn_bonafide': {
      'programme': 'competencyname',
      'year': 'subother1',
      'sessionyear': 'subother2',
      'purpose': 'subother3'
    },
    'iilm_gn_degree': {
      'programme': 'competencyname',
      'convocationday': 'subother2',
      'convocationmonth': 'subother3',
      'convocationyear': 'subother4'
    },
    'iilm_gn_migration': {
      'programme': 'competencyname',
      'migrationnumber': 'subother1',
      'passingyear': 'subother2',
      'division': 'subother3'
    },
    'iilm_gn_transfer': {
      'programme': 'competencyname',
      'programmelength': 'subother1',
      'transfrerid': 'subother2',
      'yearrange': 'subother3',
      'division': 'subother4',
      'currentyear': 'subother5'
    },
    'iilm_gn_relieving': {
      'address': 'subother1',
      'organizationdate': 'subother2'
    },
    'iilm_gn_marksheet_student': {
      'batch': 'subother1'
    },
    'iilm_gn_marksheet_transcript': {
      'coursecode': 'subjecttype',
      'coursename': 'subjectname',
      'gradeobtained': 'semesother1',
      'gradepoint': 'semesother2',
      'creditpoint': 'semesother3',
      'totalcredit': 'other1',
      'totalcreditpoint': 'other2',
      'sgpa': 'other3'
    }
  }
  if("experientialpoints" in data[0]) {
    data.map(function(student){        
      student['other40'] = student['experientialpoints'];
      delete student['experientialpoints']
    })
  }
  if("college" in data[0]){
    let collegename = data[0].college;
    if (collegename.toLowerCase() in collegefieldreplace){
      let tempobj = collegefieldreplace[collegename.toLowerCase()];
      data.map(function(student){
        Object.keys(tempobj).forEach(key => {
          // console.log(key, tempobj[key]);
          student[tempobj[key]] = student[key];
          delete student[key]
        });
      })      
    }       
  }
  return data; 
}

async function getPermission(cid,funcname)
{
  try {

     var permissionQuery = format(`SELECT * from role_function WHERE accountid = ${cid}`);
     var fetchcheckresult=await pool.query(permissionQuery);
     if (fetchcheckresult.rows && fetchcheckresult.rows.length != 0) 
     {
       if(funcname=="getStudents")
       {
         return fetchcheckresult.rows[0].managemember;
       }
       else if(funcname=="uploadstuduents")
       {
         return fetchcheckresult.rows[0].uploadmember;
       }
       else if(funcname=="sendInvitation")
       {
         return fetchcheckresult.rows[0].sendinvite;
       }
       else if(funcname=="previewInviteEmail")
       {
         return fetchcheckresult.rows[0].previewinviteemail;
       }
       else if(funcname=="fetchCertificateTemplate"||funcname=="updateCertificateTemplate")
       {
         return fetchcheckresult.rows[0].designcertificate;
       }
       else if(funcname=="manageCertificate")
       {
         return fetchcheckresult.rows[0].managecertificate;
       }       
       else if(funcname=="generateCertificate")
       {
         return fetchcheckresult.rows[0].generatecertificate;
       }
       else if(funcname=="previewCertificate")
       {
         return fetchcheckresult.rows[0].previewcertificate;
       }
       else if(funcname=="issueCertificate")
       {
         return fetchcheckresult.rows[0].issuecertificate;
       }
       else if(funcname=="senddCertificate")
       {
         return fetchcheckresult.rows[0].sendcertificate;
       }
       else if(funcname=="uploadLogoImage")
       {
         return fetchcheckresult.rows[0].changelogo;
       }
       else if(funcname=="validate")
       {
         return fetchcheckresult.rows[0].validate;
       }
       
     }
    }
   catch (err) {
      return false;   
   }    
}

async function getParentAccountIdFromId(cid)
{
  try {

     var parentCheckQuery = format(`SELECT parent_accountid from USERMASTER WHERE user_id = ${cid}`);
     var fetchcheckresult=await pool.query(parentCheckQuery);
     if (fetchcheckresult.rows && fetchcheckresult.rows.length != 0) 
     {
       //console.log(fetchcheckresult.rows[0].parent_accountid);
       if(fetchcheckresult.rows[0].parent_accountid=="0")
         return cid;
       else
         return fetchcheckresult.rows[0].parent_accountid;
     }
    }
   catch (err) {
      return 0;   
   }    
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getOnetimecode(n)
{
    var characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var randomString = "";

    for(var i=0;i<n;i++)
    {
       index=getRandomInt(characters.length-1);
       randomString+= characters[index];
    }
    return randomString;
}

async function decrypt(source) {
  const params = {
    CiphertextBlob: Buffer.from(source, 'base64'),
  };
  const { Plaintext } = await kms.decrypt(params).promise();
  return Plaintext.toString();
}

async function getUserIDFromApiKey(apikey)
{  
  try 
  {
    //console.log("apikey=", decodeURIComponent(apikey));
    let decdata= await decrypt(decodeURIComponent(apikey));   
    return decdata;
  }
  catch(ex)
  {
    console.log(ex);
    return null;
  }
}

user_1.uploadstudentbyapi = async (req, res, next) => {
  try{
    if (req.user.business_is_verified == false) {
      var obj = {
        Status: 400,
        message: "Your account is currently under verification, please contact certonce team."
      };
      res.json(obj);
      return;
    }
   
    var permission = await getPermission(req.user.user_id, "uploadstuduents");
    if (permission == false) {
      var obj = {
        Status: 400,
        message: "Access denied."
      };
      res.json(obj);
      return;
    }
    var puserid = await getParentAccountIdFromId(req.user.user_id);

    var smtpaccount = {
      'type' : true,
      'username' : "", 
      'clientid' : "",
      'clientsecret' : "",
      'refreshtoken' : "",
      'from': ""
    };
    
    var cc="";
    var contact_email = "";
    var querySmtp=format(`SELECT * FROM setting where accountid='${puserid}';`);
    var smtpresult = await pool.query(querySmtp);
    
    if(smtpresult && smtpresult.rowCount > 0){
      smtpaccount['type'] = smtpresult.rows[0].smtptype;
      smtpaccount['host'] = smtpresult.rows[0].smtphost;
      smtpaccount['port'] = smtpresult.rows[0].smtpport;
      smtpaccount['username'] = smtpresult.rows[0].smtpusername;
      smtpaccount['password'] = smtpresult.rows[0].smtppassword;
      smtpaccount['from'] = smtpresult.rows[0].smtpfrom;

      smtpaccount['clientid'] = smtpresult.rows[0].smtpclientid;
      smtpaccount['clientsecret'] = smtpresult.rows[0].smtpclientsecret;
      smtpaccount['refreshtoken'] = smtpresult.rows[0].smtprefreshtoken;

      smtpaccount['isoffice365'] = smtpresult.rows[0].isoffice365;
      smtpaccount['office365accesstoken'] = smtpresult.rows[0].office365accesstoken;
      cc=smtpresult.rows[0].smtpcc;
      contact_email = smtpresult.rows[0].contact_email;      
      if (contact_email == null || contact_email == undefined) contact_email = "";
      if (contact_email == ""){
        var obj = {
          Status: 400,
          message: `Contact Email is not defined. Please set contact email in /My PROFILE/Setting/CONTACT INFORMATION`
        };
        return res.json(obj);
      }
    }

    logfilename ="/home/ubuntu/logs/"+puserid+"/createCohortWithStudents.txt"
    var logdirpath = path.dirname(logfilename);    
    if (!fs.existsSync(logdirpath))
    {
        await os.execCommand('sudo mkdir -p "'+logdirpath+'"');
        await os.execCommand('sudo chmod -R 777 "'+logdirpath+'"');
    }
    var today = new Date();    
    fs.appendFileSync(logfilename, '\nStart section on '+today + '\n');    
    fs.appendFileSync(logfilename, JSON.stringify(req.body));    
    fs.appendFileSync(logfilename, '\nEnd section on '+today + '\n');


    var obj = {
      Status: 200,
      message: 'Please wait the student data is being uploaded , on completion you will receive an email.',
    }
    res.json(obj);
    
    var paid=req.body.paid;
    var selected=req.body.selected;    
    var certtype=req.body.certtype;
    var semester=req.body.semester;
    var year=req.body.year;
    
    if(certtype=="" || certtype==null || certtype==undefined) certtype="degree";
    if (puserid == "20108" || puserid == "20109" || puserid == "20117" || puserid == "11")
    {
      if(certtype=="degree")
      {
       
        await uploadIILMDegree(puserid, smtpaccount, contact_email, selected, paid, certtype);
      }
      else if(certtype=="transcript" || certtype=="semesterwisegradecard")
      {
        var pdf_type=global_pdf_type[certtype];
        if(pdf_type==null || pdf_type == undefined) pdf_type="transcript";
        
        await uploadIILMTranscript(puserid, smtpaccount, contact_email, selected, paid, certtype, semester, year, pdf_type)
      }
      
    }
  } 
  catch(err){
    console.log(err)
    var obj = {
      Status: 400,
      message: err.message
    };
    res.json(obj);
  }
  
}

async function uploadIILMDegree(puserid, smtpaccount, contact_email, selected, paid, certtypename){
  try {
    const mailer_downloadcertificate = require("../../config/mailer_downloadcertificate");
    const mailer_certonce = require("../../config/mailer_certonce");
    var certtypes = {"degree":"cohortmembers_degree","transcript":"cohortmembers_transcript","openbadges":"cohortmembers_openbadges","migration":"cohortmembers_degree","bonafide":"cohortmembers_degree","transfer":"cohortmembers_degree","relieving":"cohortmembers_degree","awards":"cohortmembers_degree","semesterwisegradecard":"cohortmembers_degree","medal":"cohortmembers_degree","or":"cohortmembers_degree"};
    var tablenameforcerttype = certtypes[certtypename];
    var logfilename=logfiledir+puserid+"/IILM_uploadstudentsbyapi.log";
    var campus_name = global_campus_name[puserid];
    if (campus_name==undefined || campus_name==null)
    {
      console.log(err.message);
      let email_body = `<p style="color: black;">There is an error in uploading students.</p>
      <p style="color: black;">Error: ${err.message}</p>`
      let email_subject = "Upload Students Result";      
      let logfilename=logfiledir+puserid+"/sendcertificate.log";
      mailer_downloadcertificate(email_body, email_subject, contact_email, smtpaccount, logfilename);
      var obj = {
        Status: 400,
        message: err.message
      };
      return res.json(obj);
    }
    var api_base_url = "https://iilm.my.salesforce.com";
    var oauth_base_url = "https://login.salesforce.com";
    // /test url
    // var api_base_url = "https://iilm--uat2.sandbox.my.salesforce.com";
    // var oauth_base_url = "https://test.salesforce.com"; 
    // var oauth_account = {
    //   'username': process.env.SALESFORCE_USER,
    //   'password': process.env.SALESFORCE_PASS,
    //   'grant_type': 'password',
    //   'client_id': process.env.SALESFORCE_CLIENT_ID,
    //   'client_secret': process.env.SALESFORCE_CLIENT_SECRET
    // };
    // var program_list = [
    //   'BA (Hons) Journalism, Media and Communication',
    //   'BA (Hons) Psychology',
    //   'B. Des. Fashion Design',
    //   'B. Des. Interaction Design',
    //   'B Tech Computer Science and Information Technology',
    //   'BBA',
    //   'B Com (Hons)',
    //   'B. Des. Interior Design',
    //   'BA (Hons) 3D Animation and Gaming',
    //   'B. Des. Product Design',
    //   'MA Psychology',
    //   'LLM'
    // ]
    
    var selectedItems=JSON.parse(selected);
    if(selectedItems.length==0)
    {
      return;
    }  
    var oauth_login_url = `${oauth_base_url}/services/oauth2/token`;  
    var successcount = 0;
    var successcohort = [];
    var error_cohort = [];
    try{
      var oauth_result = await axios.post(oauth_login_url, qs.stringify(oauth_account));
      
      if (oauth_result.status == "200"){      
        const bearer_config = {
          headers: { Authorization: `Bearer ${oauth_result['data']['access_token']}` }
        };
        try{
          var batchurl=`${api_base_url}/services/apexrest/batch?campus_name=${campus_name}`;
          var batch_result = await axios.get(batchurl, bearer_config);
          if (batch_result.status == "200"){
            var batch_list = batch_result['data']['batchList'];
            batch_list = batch_list.filter((ele) =>ele["Degree_Issued__c"] == false);
            for(let index2=0 ; index2< selectedItems.length; index2++){
              for (let index = 0; index < batch_list.length; index++){
                try {
                  var batch_name_tmp = batch_list[index]['Name']
                  if(selectedItems[index2]["value"] == batch_list[index]['Id'])
                  {
                    var student_result = await axios.get(`${api_base_url}/services/apexrest/degree/${selectedItems[index2]["value"]}`, bearer_config); //batch_list['index']['Id'];
                    if (student_result.status == "200"){
                      var student_list = student_result['data']['studentDataList'];
                      if (student_list.length > 0){
                        let coursecompletiondate = batch_list[index]['Convocation_Date__c'];
                        var programme = batch_list[index]['hed__Account__r']['Name'];
                        console.log("Program Name:", programme);
                        let cohortname = `${batch_list[index]['hed__Account__r']['Name']}(${batch_list[index]['Name']})`;
                        let cohortid = cohortname.replace(/ /g, "_");
                        if(programme=="Bachelor of Technology in Computer Science Engineering") programme="Bachelor of Technology<br>in Computer Science Engineering";
                        var addCohortGroupQuery = format(`INSERT INTO COHORT_GROUP (name, cohortid, accountid) SELECT '${cohortname}', '${cohortid}', '${puserid}' ON CONFLICT (cohortid,accountid) DO UPDATE SET cohortid='${cohortid}' ,name='${cohortname}' ,accountid='${puserid}' RETURNING id;`);
                        await pool.query(addCohortGroupQuery);
                        var addCohortQuery = format(`INSERT INTO COHORT (accountid,cohortid,name,competencyname) SELECT '${puserid}','${cohortid}','${cohortname}','${programme}' ON CONFLICT (cohortid, competencyname, accountid,semesternumber)  DO UPDATE SET competencyname='${programme}' RETURNING id;`);
                        let addCohortResult = await pool.query(addCohortQuery);
                        if (addCohortResult.rowCount > 0){
                          var cohortidinteger = addCohortResult.rows[0].id;
                          successcohort.push(batch_list[index]['Id']);
                        }
                        for (let index1 = 0; index1 < student_list.length; index1++){
                          if (student_list[index1]['urn'] == null || student_list[index1]['urn'].trim() == "" || student_list[index1]['studentName'] == null || student_list[index1]['studentName'].trim() == "" || !validator.validate(student_list[index1]['studentEmail'])){
                            error_cohort.push(`urn: ${student_list[index1]['urn']} of batch Id: ${batch_list[index]['Id']}`);     
                          }
                          else {
                            var is_paid=student_list[index2]["feeStatus"];
                            if((paid==true && (is_paid==undefined || is_paid!="Unpaid")) || (paid==false && is_paid=="Unpaid")) {
                              let studentid = student_list[index1]['urn'];
                              let studentname = student_list[index1]['studentName'];
                              if(studentname!==null) {
                                studentname = studentname.replace(/\./g, ' ');
                                studentname = studentname.trim();
                              }
                              let emailaddress = student_list[index1]['studentEmail'];
                              let specialization = student_list[index1]['specialization'];
                              let completionyear = "2024";
                              if (student_list[index1]['completionYear']) {
                                completionyear = student_list[index1]['completionYear'];
                              }
                              let conflictcause = `firstname='${studentname}', emailaddress='${emailaddress}'`;
                              let studentQuery = format(`INSERT INTO STUDENT (accountid,studentid,firstname,middlename,lastname,emailaddress,enrollnumber) SELECT '${puserid}', '${studentid}','${studentname}','','','${emailaddress}','${studentid}' ON CONFLICT (studentid,accountid,firstname,middlename,lastname,emailaddress) DO UPDATE SET ${conflictcause} RETURNING id;`);
                              console.log(studentQuery);
                              let studentResult = await pool.query(studentQuery);
                              if (studentResult.rowCount > 0) var studentidinteger = studentResult.rows[0].id;
                              let studentsforonetimecode;
                              let onetimecode = "";
                              let loopcount = 0;
                              // console.log("accountid, cohortid, studentid:", puserid, cohortid, studentid)
                              while (loopcount !== Object.keys(certtypes).length) {
                                onetimecode = getOnetimecode(15);
                                loopcount = 0;
                                for (const key1 in certtypes) {
                                  var tablenameforcerttype1 = certtypes[key1];
                                  let getExistStudent = format(`SELECT id FROM ${tablenameforcerttype1} WHERE onetimeblockcertscode='${onetimecode}';`);
                                  studentsforonetimecode = await pool.query(getExistStudent);
                                  if (studentsforonetimecode.rowCount == 0) {
                                    loopcount++;
                                  }
                                }
                              }
                              let degreeQuery = format(`INSERT INTO ${tablenameforcerttype} (cohortid,studentid,onetimeblockcertscode,certificatetype,coursecompletiondate,coursename, other10, other11) SELECT '${cohortidinteger}','${studentidinteger}','${onetimecode}','${certtypename}','${coursecompletiondate}','${batch_name_tmp}', '${specialization}', '${completionyear}' on conflict (studentid, cohortid, certificaterevoked, certificatetype) do update set cohortid='${cohortidinteger}', coursecompletiondate='${coursecompletiondate}';`);
                              await pool.query(degreeQuery);
                              successcount++;
                            }
                          }
                        }
                        console.log("success cohort:", cohortname, batch_list[index]['Id']);
                        // var oauth_result = await axios.post(`${api_base_url}/services/apexrest/batch`, {"BatchId": batch_list[index]['Id'], "Degree_Issued": true}, bearer_config);
                      }
                    }
                  }
                }
                catch(err){
                  let email_body = `<p style="color: black;">There is an error in getting student api data of batchId ${batch_list[index]['Id']} (${campus_name}).</p>
                  <p style="color: black;">Error: ${err.message}</p>`;
                  let email_subject = "Upload Students Result";          
                  let mailer_result = await mailer_downloadcertificate(email_body, email_subject, contact_email, smtpaccount, logfilename);
                  if (mailer_result.status == "400"){            
                    let email_body = `<p style="color: black;">There is an error in uploading students.</p>
                    <p style="color: black;">Error: ${JSON.stringify(mailer_result.message.response)}</p>`
                    let email_subject = "Upload Students Result";
                    mailer_certonce(email_body, email_subject, contact_email, logfilename);
                  }
                  return;
                }          
              }
            }
            email_body = `<p style="color:black;">Uploading Students data is completed successfully(${campus_name}). Below are uploaded Batch Ids.</p>
              <p style="color: black;">${successcohort.join("<br>")}</p>`;
            let mailer_result = await mailer_downloadcertificate(email_body, "Upload Students Result", contact_email, smtpaccount, logfilename);
            if (mailer_result.status == "400"){            
              let email_body = `<p style="color: black;">There is an error in uploading students.</p>
              <p style="color: black;">Error: ${JSON.stringify(mailer_result.message.response)}</p>`
              let email_subject = "Upload Students Result";
              mailer_certonce(email_body, email_subject, contact_email, logfilename);
            }
            if (error_cohort.length > 0){
              email_body = `<p style="color:black;">Uploading students data of some batchs is failed (${campus_name}). Below are failed Batch Ids.</p>
              <p style="color: black;">${error_cohort.join("<br>")}</p>`;
              let mailer_result = await mailer_downloadcertificate(email_body, "Upload Students Result", contact_email, smtpaccount, logfilename);
              if (mailer_result.status == "400"){            
                let email_body = `<p style="color: black;">There is an error in sending failed batch Ids.</p>
                <p style="color: black;">Error: ${JSON.stringify(mailer_result.message.response)}</p>`
                let email_subject = "Upload Students Result";
                mailer_certonce(email_body, email_subject, contact_email, logfilename);
              }
            }
            return;
          }
        }
        catch(err){
          let email_body = `<p style="color: black;">There is an error in getting Bath api data(${campus_name}).</p>
          <p style="color: black;">Error: ${err.message}</p>`;
          let email_subject = "Upload Students Result";          
          let mailer_result = await mailer_downloadcertificate(email_body, email_subject, contact_email, smtpaccount, logfilename);
          if (mailer_result.status == "400"){            
            let email_body = `<p style="color: black;">There is an error in uploading students.</p>
            <p style="color: black;">Error: ${JSON.stringify(mailer_result.message.response)}</p>`
            let email_subject = "Upload Students Result";
            mailer_certonce(email_body, email_subject, contact_email, logfilename);
          }
          return;
        }  
      }
      else {
        console.log("OAuth Error:", err.message);
        let email_body = `<p style="color: black;">There is an error in OAuth authenticate(${campus_name}).</p>`;
        let email_subject = "Upload Students Result";
        let mailer_result = await mailer_downloadcertificate(email_body, email_subject, contact_email, smtpaccount, logfilename);
        if (mailer_result.status == "400"){
          let email_body = `<p style="color: black;">There is an error in uploading students.</p>
          <p style="color: black;">Error: ${JSON.stringify(mailer_result.message.response)}</p>`
          let email_subject = "Upload Students Result";
          mailer_certonce(email_body, email_subject, contact_email, logfilename);
        }
        return;
      }
    }
    catch(err){
      console.log("OAuth Error:", err.message);
      let email_body = `<p style="color: black;">There is an error in uploading students(${campus_name}).</p>
      <p style="color: black;">Error: ${err.message}</p>`;
      let email_subject = "Upload Students Result";
      let mailer_result = await mailer_downloadcertificate(email_body, email_subject, contact_email, smtpaccount, logfilename);
      if (mailer_result.status == "400"){
        let email_body = `<p style="color: black;">There is an error in uploading students.</p>
        <p style="color: black;">Error: ${JSON.stringify(mailer_result.message.response)}</p>`
        let email_subject = "Upload Students Result";
        mailer_certonce(email_body, email_subject, contact_email, logfilename);
      }
      return;
    }

  } 
  catch (err) {
    console.log(err.message);
    let email_body = `<p style="color: black;">There is an error in uploading students(accountid is ${puserid}).</p>
    <p style="color: black;">Error: ${err.message}</p>`
    let email_subject = "Upload Students Result";
    
    const mailer_downloadcertificate = require("../../config/mailer_downloadcertificate");
    let logfilename=logfiledir+puserid+"/sendcertificate.log";
    mailer_downloadcertificate(email_body, email_subject, contact_email, smtpaccount, logfilename);
    var obj = {
      Status: 400,
      message: err.message
    };
    res.json(obj);
  }
  
}

async function uploadIILMTranscript(puserid, smtpaccount, contact_email, selected, paid, certtypename, semester, year, pdf_type){
  try {
    const mailer_downloadcertificate = require("../../config/mailer_downloadcertificate");
    const mailer_certonce = require("../../config/mailer_certonce");
    var certtypes = {"degree":"cohortmembers_degree","transcript":"cohortmembers_transcript","openbadges":"cohortmembers_openbadges","migration":"cohortmembers_degree","bonafide":"cohortmembers_degree","transfer":"cohortmembers_degree","relieving":"cohortmembers_degree","awards":"cohortmembers_degree","semesterwisegradecard":"cohortmembers_degree","medal":"cohortmembers_degree","or":"cohortmembers_degree"};
    var tablenameforcerttype = certtypes[certtypename];
    var logfilename=logfiledir+puserid+"/IILM_uploadstudentsbyapi.log";
    var campus_name = global_campus_name[puserid];
    if (campus_name==undefined || campus_name==null)
    {
      console.log(err.message);
      let email_body = `<p style="color: black;">There is an error in uploading students.</p>
      <p style="color: black;">Error: ${err.message}</p>`
      let email_subject = "Upload Students Result";      
      let logfilename=logfiledir+puserid+"/sendcertificate.log";
      mailer_downloadcertificate(email_body, email_subject, contact_email, smtpaccount, logfilename);
      var obj = {
        Status: 400,
        message: err.message
      };
      return res.json(obj);
    }
    var api_base_url = "https://iilm.my.salesforce.com";
    var oauth_base_url = "https://login.salesforce.com";
    ///test url
    //*
    // var api_base_url = "https://iilm--uat2.sandbox.my.salesforce.com";
    // var oauth_base_url = "https://test.salesforce.com"; 
    // var oauth_account = {
    //  'username': process.env.SALESFORCE_USER,
    //   'password': process.env.SALESFORCE_PASS,
    //   'grant_type': 'password',
    //   'client_id': process.env.SALESFORCE_CLIENT_ID,
    //   'client_secret': process.env.SALESFORCE_CLIENT_SECRET
    // };
    //
    // var program_list = [
    //   'BA (Hons) Journalism, Media and Communication',
    //   'BA (Hons) Psychology',
    //   'B. Des. Fashion Design',
    //   'B. Des. Interaction Design',
    //   'B Tech Computer Science and Information Technology',
    //   'BBA',
    //   'B Com (Hons)',
    //   'B. Des. Interior Design',
    //   'BA (Hons) 3D Animation and Gaming',
    //   'B. Des. Product Design',
    //   'MA Psychology',
    //   'LLM'
    // ]
    var selectedItems=JSON.parse(selected);
    if(selectedItems.length==0)
    {
      return;
    }  
    var oauth_login_url = `${oauth_base_url}/services/oauth2/token`;        
    

    
    var successcount = 0;
    var successcohort = [];
    var error_cohort = [];
    try{
      var oauth_result = await axios.post(oauth_login_url, qs.stringify(oauth_account));
      
      if (oauth_result.status == "200"){      
        const bearer_config = {
          headers: { Authorization: `Bearer ${oauth_result['data']['access_token']}` }
        };
        try{
          var batchurl=`${api_base_url}/services/apexrest/batch?campus_name=${campus_name}`;
          var batch_result = await axios.get(batchurl, bearer_config);
          if (batch_result.status == "200"){
            var batch_list = batch_result['data']['batchList'];
            
            batch_list = batch_list.filter((ele) =>ele["Degree_Issued__c"] == false);
            for(let index2=0 ; index2< selectedItems.length; index2++){
              

              for (let index = 0; index < batch_list.length; index++){
                
                //if(batch_list[index]['Convocation_Date__c'] != undefined && batch_list[index]['Convocation_Date__c'] != null && batch_list[index]['Convocation_Date__c'] != "")
                {
                  try{

                    var batch_name_tmp = batch_list[index]['Name']
                    if(selectedItems[index2]["value"] == batch_list[index]['Id'])
                    {

                      try {
                        var totalStudent_result = await axios.get(`${api_base_url}/services/apexrest/student_result/${selectedItems[index2]["value"]}?pdf_type=${pdf_type}&term_name=${semester} - ${year}&offset=0&limit=1`, bearer_config); //batch_list['index']['Id'];
                       
                        if (totalStudent_result.status == "200")
                        {
                          var totalStudent = totalStudent_result['data']['totalStudent'];  
                          console.log("totalStudent===", totalStudent);                      
                          if(totalStudent!=null && totalStudent!=undefined && totalStudent>0)
                          {
                            
                            let coursecompletiondate = batch_list[index]['Convocation_Date__c'];
                            var programme = batch_list[index]['hed__Account__r']['Name'];
                            console.log("Program Name:", programme);
                            let cohortname = `${batch_list[index]['hed__Account__r']['Name']}(${batch_list[index]['Name']})`;
                            let cohortid = cohortname.replace(/ /g, "_");
                            if(programme=="Bachelor of Technology in Computer Science Engineering") programme="Bachelor of Technology<br>in Computer Science Engineering";                         
                            var addCohortGroupQuery = format(`INSERT INTO COHORT_GROUP (name, cohortid, accountid) SELECT '${cohortname}', '${cohortid}', '${puserid}' ON CONFLICT (cohortid,accountid) DO UPDATE SET cohortid='${cohortid}' ,name='${cohortname}' ,accountid='${puserid}' RETURNING id;`);
                            await pool.query(addCohortGroupQuery);
                            var addCohortQuery = format(`INSERT INTO COHORT (accountid,cohortid,name,competencyname) SELECT '${puserid}','${cohortid}','${cohortname}','${programme}' ON CONFLICT (cohortid, competencyname, accountid,semesternumber)  DO UPDATE SET competencyname='${programme}' RETURNING id;`);
                            let addCohortResult = await pool.query(addCohortQuery);
                            if (addCohortResult.rowCount > 0){
                              var cohortidinteger = addCohortResult.rows[0].id;
                              successcohort.push(batch_list[index]['Id']);
                            }
                            for(let index3=0; index3<totalStudent; index3=index3+10) {
                              var student_result = await axios.get(`${api_base_url}/services/apexrest/student_result/${selectedItems[index2]["value"]}?pdf_type=${pdf_type}&term_name=${semester} - ${year}&offset=${index3}&limit=10`, bearer_config); //batch_list['index']['Id'];
                              if (student_result.status == "200"){
                                var student_list = student_result['data']['transcriptList'];
                                for (let index1 = 0; index1 < student_list.length; index1++){                            
                                  if (student_list[index1]['transcriptPDFBase64'] == null || student_list[index1]['transcriptPDFBase64'].trim() == "" || student_list[index1]['studentURN'] == null || student_list[index1]['studentURN'].trim() == "" || student_list[index1]['studentName'] == null || student_list[index1]['studentName'].trim() == "" || !validator.validate(student_list[index1]['studentEmail'])){
                                    error_cohort.push(`studentURN: ${student_list[index1]['studentURN']} of batch Id: ${batch_list[index]['Id']}`);     
                                  }
                                  else {
                                    let studentid = student_list[index1]['studentURN'];
                                    let studentname = student_list[index1]['studentName'];
                                    if( studentname !== null ) {
                                      studentname = studentname.replace(/\./g, ' ');
                                      studentname = studentname.trim();
                                    }
                                    let emailaddress = student_list[index1]['studentEmail'];    
                                    let specialization = student_list[index1]['specialization'];
                                    let conflictcause = `firstname='${studentname}', emailaddress='${emailaddress}'`;
                                    let studentQuery = format(`INSERT INTO STUDENT (accountid,studentid,firstname,middlename,lastname,emailaddress,enrollnumber) SELECT '${puserid}', '${studentid}','${studentname}','','','${emailaddress}','${studentid}' ON CONFLICT (studentid,accountid,firstname,middlename,lastname,emailaddress) DO UPDATE SET ${conflictcause} RETURNING id;`);
                                    let studentResult = await pool.query(studentQuery);
                                    if (studentResult.rowCount > 0) var studentidinteger = studentResult.rows[0].id;
                                    let studentsforonetimecode;
                                    let onetimecode = "";
                                    let loopcount = 0;
                                    while (loopcount !== Object.keys(certtypes).length) {
                                      onetimecode = getOnetimecode(15);
                                      loopcount = 0;
                                      for (const key1 in certtypes) {
                                        var tablenameforcerttype1 = certtypes[key1];
                                        let getExistStudent = format(`SELECT id FROM ${tablenameforcerttype1} WHERE onetimeblockcertscode='${onetimecode}';`);
                                        studentsforonetimecode = await pool.query(getExistStudent);
                                        if (studentsforonetimecode.rowCount == 0) {
                                          loopcount++;
                                        }
                                      }
                                    }
                                    let degreeQuery = format(`INSERT INTO ${tablenameforcerttype} (cohortid,studentid,onetimeblockcertscode,certificatetype,coursecompletiondate,coursename, other1, other2, other3, other4, other10) SELECT '${cohortidinteger}','${studentidinteger}','${onetimecode}','${certtypename}','${coursecompletiondate}','${batch_name_tmp}','${selectedItems[index2]["value"]}','${pdf_type}','${semester} - ${year}','${index3}', '${specialization}' on conflict (studentid, cohortid, certificaterevoked, certificatetype) do update set cohortid='${cohortidinteger}', other1='${selectedItems[index2]["value"]}', other2='${pdf_type}', other3='${semester} - ${year}', other4='${index3}', other10='${specialization}', coursecompletiondate='${coursecompletiondate}';`);
                                    await pool.query(degreeQuery);
                                    // console.log("studentid: ", studentidinteger, "cohortid:",cohortidinteger);
                                    successcount++;
                                  }
                                }
                              }    
                            }
                            console.log("success cohort:", cohortname, batch_list[index]['Id']);
                          }
                        }//if (totalStudent_result.status == "200")
                      } catch (error) 
                      {
                        console.log(error);
                      }

                    }
                  }
                  catch(err){
                    let email_body = `<p style="color: black;">There is an error in getting student api data of batchId ${batch_list[index]['Id']} (${campus_name}).</p>
                    <p style="color: black;">Error: ${err.message}</p>`;
                    let email_subject = "Upload Students Result";          
                    let mailer_result = await mailer_downloadcertificate(email_body, email_subject, contact_email, smtpaccount, logfilename);
                    if (mailer_result.status == "400"){            
                      let email_body = `<p style="color: black;">There is an error in uploading students.</p>
                      <p style="color: black;">Error: ${JSON.stringify(mailer_result.message.response)}</p>`
                      let email_subject = "Upload Students Result";
                      mailer_certonce(email_body, email_subject, contact_email, logfilename);
                    }
                    return;
                  } 
                }  //if(batch_list[index]['Convocation_Date__c'] != undefined && batch_list[index]['Convocation_Date__c'] != null && batch_list[index]['Convocation_Date__c']!= "")            
                            
              }
            }
            email_body = `<p style="color:black;">Uploading Students data is completed successfully(${campus_name}). Below are uploaded Batch Ids.</p>
              <p style="color: black;">${successcohort.join("<br>")}</p>`;
            let mailer_result = await mailer_downloadcertificate(email_body, "Upload Students Result", contact_email, smtpaccount, logfilename);
            if (mailer_result.status == "400"){            
              let email_body = `<p style="color: black;">There is an error in uploading students.</p>
              <p style="color: black;">Error: ${JSON.stringify(mailer_result.message.response)}</p>`
              let email_subject = "Upload Students Result";
              mailer_certonce(email_body, email_subject, contact_email, logfilename);
            }
            if (error_cohort.length > 0){
              email_body = `<p style="color:black;">Uploading students data of some batchs is failed (${campus_name}). Below are failed Batch Ids.</p>
              <p style="color: black;">${error_cohort.join("<br>")}</p>`;
              let mailer_result = await mailer_downloadcertificate(email_body, "Upload Students Result", contact_email, smtpaccount, logfilename);
              if (mailer_result.status == "400"){            
                let email_body = `<p style="color: black;">There is an error in sending failed batch Ids.</p>
                <p style="color: black;">Error: ${JSON.stringify(mailer_result.message.response)}</p>`
                let email_subject = "Upload Students Result";
                mailer_certonce(email_body, email_subject, contact_email, logfilename);
              }
            }
            return;
          }
        }
        catch(err){
          let email_body = `<p style="color: black;">There is an error in getting Bath api data(${campus_name}).</p>
          <p style="color: black;">Error: ${err.message}</p>`;
          let email_subject = "Upload Students Result";          
          let mailer_result = await mailer_downloadcertificate(email_body, email_subject, contact_email, smtpaccount, logfilename);
          if (mailer_result.status == "400"){            
            let email_body = `<p style="color: black;">There is an error in uploading students.</p>
            <p style="color: black;">Error: ${JSON.stringify(mailer_result.message.response)}</p>`
            let email_subject = "Upload Students Result";
            mailer_certonce(email_body, email_subject, contact_email, logfilename);
          }
          return;
        }  
      }
      else {
        console.log("OAuth Error:", err.message);
        let email_body = `<p style="color: black;">There is an error in OAuth authenticate(${campus_name}).</p>`;
        let email_subject = "Upload Students Result";
        let mailer_result = await mailer_downloadcertificate(email_body, email_subject, contact_email, smtpaccount, logfilename);
        if (mailer_result.status == "400"){
          let email_body = `<p style="color: black;">There is an error in uploading students.</p>
          <p style="color: black;">Error: ${JSON.stringify(mailer_result.message.response)}</p>`
          let email_subject = "Upload Students Result";
          mailer_certonce(email_body, email_subject, contact_email, logfilename);
        }
        return;
      }
    }
    catch(err){
      console.log("OAuth Error:", err.message);
      let email_body = `<p style="color: black;">There is an error in uploading students(${campus_name}).</p>
      <p style="color: black;">Error: ${err.message}</p>`;
      let email_subject = "Upload Students Result";
      let mailer_result = await mailer_downloadcertificate(email_body, email_subject, contact_email, smtpaccount, logfilename);
      if (mailer_result.status == "400"){
        let email_body = `<p style="color: black;">There is an error in uploading students.</p>
        <p style="color: black;">Error: ${JSON.stringify(mailer_result.message.response)}</p>`
        let email_subject = "Upload Students Result";
        mailer_certonce(email_body, email_subject, contact_email, logfilename);
      }
      return;
    }

  } 
  catch (err) {
    console.log(err.message);
    let email_body = `<p style="color: black;">There is an error in uploading students(accountid is ${puserid}).</p>
    <p style="color: black;">Error: ${err.message}</p>`
    let email_subject = "Upload Students Result";
    
    const mailer_downloadcertificate = require("../../config/mailer_downloadcertificate");
    let logfilename=logfiledir+puserid+"/sendcertificate.log";
    mailer_downloadcertificate(email_body, email_subject, contact_email, smtpaccount, logfilename);
    var obj = {
      Status: 400,
      message: err.message
    };
    res.json(obj);
  }
  
}

user_1.getbatchurlbyapi = async (req, res, next) => {
  try{
    var puserid = await getParentAccountIdFromId(req.user.user_id);
    var campus_name = global_campus_name[puserid];     
    if (campus_name!=undefined && campus_name!=null)
    {
    ///test url
    //*
    // var api_base_url = "https://iilm--uat2.sandbox.my.salesforce.com";
    // var oauth_base_url = "https://test.salesforce.com"; 
    // var oauth_account = {
    //   'username': process.env.SALESFORCE_USER,
    //   'password': process.env.SALESFORCE_PASS,
    //   'grant_type': 'password',
    //   'client_id': process.env.SALESFORCE_CLIENT_ID,
    //   'client_secret': process.env.SALESFORCE_CLIENT_SECRET
    // };
    //*/
    //product url    
    var api_base_url = "https://iilm.my.salesforce.com";
    var oauth_base_url = "https://login.salesforce.com";
      var oauth_login_url = `${oauth_base_url}/services/oauth2/token`;    
      // var api_access_token = "";
      var program_type="";
      var semester=req.body.semester;
      var year=req.body.year;
      var certtype=req.body.certtype;
      var mode=req.body.mode;
      var paid=req.body.paid;
      var selected=req.body.selected;
      var postgraduate=req.body.postgraduate;
      var undergraduate=req.body.undergraduate;
      if(undergraduate==true && postgraduate==false)
        program_type="Undergraduate";
      else if(undergraduate==false && postgraduate==true)
        program_type="Postgraduate";
      else if(undergraduate==false && postgraduate==false)
      {
        var obj = {
          Status: 200,
          batchdata: [],
          paiddata:[]
        };
        return res.json(obj);
      }
        
      var batchurl=`${api_base_url}/services/apexrest/batch?program_type=${program_type}&campus_name=${campus_name}`;
      if(program_type=="") batchurl=`${api_base_url}/services/apexrest/batch?campus_name=${campus_name}`;
    
      if(mode==1)
      {        
        var retbatchname=[];
        
        var oauth_result = await axios.post(oauth_login_url, qs.stringify(oauth_account));       
        if (oauth_result.status == "200"){   
          const bearer_config = {
            headers: { Authorization: `Bearer ${oauth_result['data']['access_token']}` }
          };
        
          try{
            var batch_result = await axios.get(batchurl, bearer_config);
            if (batch_result.status == "200"){
              var batch_list = batch_result['data']['batchList'];
              batch_list = batch_list.filter((ele) =>ele["Degree_Issued__c"] == false);                            
              for (let index = 0; index < batch_list.length; index++){
                //if(batch_list[index]['Convocation_Date__c'] != undefined && batch_list[index]['Convocation_Date__c'] != null && batch_list[index]['Convocation_Date__c']!= "")
                {
                  var batch_name = batch_list[index]['Name'];
                  var programme = batch_list[index]['hed__Account__r']['Name'];
                  var item={value: `${batch_list[index]['Id']}`, label: `${programme}(${batch_name})` };
                  retbatchname.push(item);
                }//if(batch_list[index]['Convocation_Date__c'] != undefined && batch_list[index]['Convocation_Date__c'] != null && batch_list[index]['Convocation_Date__c']!= "")
              }
              
            }
            var obj = {
              Status: 200,
              batchdata: retbatchname,
              paiddata:[]
            };
            return res.json(obj);
          }
          catch(err)
          {
            var obj = {
              Status: 400,
              message: err.message
            };
            return res.json(obj);
          }
        }
      }
      else if(mode==2 || mode==3)
      {
        var selectedItems=JSON.parse(selected);
        if(selectedItems.length==0)
        {
          var obj = {
            Status: 200,            
            paiddata:[]
          };
          return res.json(obj);
        }
        var paiddata=[];
        var oauth_result = await axios.post(oauth_login_url, qs.stringify(oauth_account));
        if (oauth_result.status == "200"){      
          const bearer_config = {
            headers: { Authorization: `Bearer ${oauth_result['data']['access_token']}` }
          };
          try{
            for(let index1=0 ; index1< selectedItems.length; index1++){  
              var student_count=0;
              if(certtype=="transcript" || certtype=="semesterwisegradecard")
              {
                var pdf_type=global_pdf_type[certtype];
                if(pdf_type==null || pdf_type == undefined) pdf_type="transcript";
                try {
                  var totalStudent_result = await axios.get(`${api_base_url}/services/apexrest/student_result/${selectedItems[index1]["value"]}?pdf_type=${pdf_type}&term_name=${semester} - ${year}&offset=0&limit=1`, bearer_config); //batch_list['index']['Id'];               
               
                  if (totalStudent_result.status == "200"){
                    student_count = totalStudent_result['data']['totalStudent'];  
                    
                  }
                } catch (error) {
                  console.log(error.response.data);
                }
                
              }
              else
              {
                var student_result = await axios.get(`${api_base_url}/services/apexrest/degree/${selectedItems[index1]["value"]}`, bearer_config); //batch_list['index']['Id'];
                if (student_result.status == "200"){

                  var student_list = student_result['data']['studentDataList'];
                  
                  if (student_list.length > 0){
                    
                      for(let index2=0;index2<student_list.length;index2++)
                      {
                        if (student_list[index2]['urn'] == null || student_list[index2]['urn'].trim() == "" || student_list[index2]['studentName'] == null || student_list[index2]['studentName'].trim() == "" || !validator.validate(student_list[index2]['studentEmail'])){
                          
                        }
                        else
                        {
                          var is_paid=student_list[index2]["feeStatus"];
                          if(paid==true)
                          {
                            if(is_paid==undefined || is_paid!="Unpaid") student_count++;
                          }
                          else
                          {
                            if(is_paid=="Unpaid") student_count++;
                          }
                        }
                      }                        
                  }
                } 
                
              }
              var item={value: `${selectedItems[index1]["value"]}`, label: `${selectedItems[index1]["label"]}(${student_count})`};
              paiddata.push(item);   
            }
            var obj = {
              Status: 200,              
              paiddata:paiddata
            };
            return res.json(obj);
          }
          catch(err)
          {
            var obj = {
              Status: 400,
              message: err.message
            };
            return res.json(obj);
          }
        }
      }      
    }
    else
    {
      var obj = {
        Status: 400,
        message: "Your account doesn't use filter function.\n Just press 'Import' button."
      };
      res.json(obj);
    }
  } 
  catch(err){
    console.log(err);
    var obj = {
      Status: 400,
      message: err.message
    };
    res.json(obj);
  }
  
}

user_1.getinfoforstudentpage = async (req, res, next) => {
  try{
    var certtype=req.body.certtype;
    var api_key = req.body.apikey;
    
    var retstudentinfo={};
    if (api_key == "" || api_key == null || api_key == undefined) {
      var obj = {
        Status: 400,
        message: "Invalid API Key"
      };
      res.json(obj);
      return;
    }

    var userid = await getUserIDFromApiKey(api_key);
    if (userid == null) {
      var obj = {
        Status: 400,
        message: "Invalid api key"
      };
      res.json(obj);
      return;
    }
    var puserid = await getParentAccountIdFromId(userid);

    var certtypes={"degree":"cohortmembers_degree","transcript":"cohortmembers_transcript","openbadges":"cohortmembers_openbadges","migration":"cohortmembers_degree","bonafide":"cohortmembers_degree","transfer":"cohortmembers_degree","relieving":"cohortmembers_degree","awards":"cohortmembers_degree","semesterwisegradecard":"cohortmembers_degree","medal":"cohortmembers_degree"};
    var cohorttablename="cohortmembers_degree";
    if(certtype && certtype!="" && certtype!="null" && certtype!=null && certtype!=undefined)
    {      
      cohorttablename=certtypes[certtype];
    }

    var other2="";
    var other3="";
    var other4="";
    var other5="";
    var other6="";
    var other9="";
    var other10="";
    var other11="";
    var other12="";
    var studentsfilterschools="";
    var studentsfiltercoursename ="";
    var studentsfilterexamyear="";
    var studentsfiltercoursecompletiondate="";
    var whereClause = "WHERE c.accountid='" + puserid + "'";
    
    var studentQuery = format(`SELECT DISTINCT b.coursename AS school
      FROM student a 
      LEFT JOIN ${cohorttablename} b ON a.id = b.studentid 
      LEFT JOIN cohort c ON b.cohortid = c.id ${whereClause} order by b.coursename;`);
    console.log(studentQuery);
    let studentResult = await pool.query(studentQuery);      
    if (studentResult.rowCount > 0){
      studentsfilterschools = studentResult.rows.filter(function(element){
        return element.school&&element.school !="" && element.school!= null && element.school!= "null" && element.school!= undefined && element.school!= "undefined";
      });
    }

    var studentQuery1 = format(`SELECT DISTINCT c.competencyname AS coursename
      FROM student a 
      LEFT JOIN ${cohorttablename} b ON a.id = b.studentid 
      LEFT JOIN cohort c ON b.cohortid = c.id ${whereClause} order by c.competencyname;`);

    let studentResult1 = await pool.query(studentQuery1);      
    if (studentResult1.rowCount > 0){
      studentsfiltercoursename = studentResult1.rows.filter(function(element){
        return element.coursename&&element.coursename !="" && element.coursename!= null && element.coursename!= "null" && element.coursename!= undefined && element.coursename!= "undefined";
      });
    }

    var studentQuery2 = format(`SELECT DISTINCT b.other2 AS examinationpassingyear
      FROM student a 
      LEFT JOIN ${cohorttablename} b ON a.id = b.studentid 
      LEFT JOIN cohort c ON b.cohortid = c.id ${whereClause} order by b.other2;`);

    let studentResult2 = await pool.query(studentQuery2);      
    if (studentResult2.rowCount > 0){      
      
      studentsfilterexamyear = studentResult2.rows.filter(function(element){
        return element.examinationpassingyear&&element.examinationpassingyear !="" && element.examinationpassingyear!= null && element.examinationpassingyear!= "null" && element.examinationpassingyear!= undefined && element.examinationpassingyear!= "undefined";
      });
    }

    var studentQuery22 = format(`SELECT DISTINCT b.other2
      FROM student a 
      LEFT JOIN ${cohorttablename} b ON a.id = b.studentid 
      LEFT JOIN cohort c ON b.cohortid = c.id ${whereClause} order by b.other2;`);

    let studentResult22 = await pool.query(studentQuery22);      
    if (studentResult22.rowCount > 0){      
      
      other2 = studentResult22.rows.filter(function(element){
        return element.other2&&element.other2 !="" && element.other2!= null && element.other2!= "null" && element.other2!= undefined && element.other2!= "undefined";
      });
    }

    var studentQuery3 = format(`SELECT DISTINCT b.coursecompletiondate AS coursecompletiondate
      FROM student a 
      LEFT JOIN ${cohorttablename} b ON a.id = b.studentid 
      LEFT JOIN cohort c ON b.cohortid = c.id ${whereClause} order by b.coursecompletiondate;`);
     //console.log(studentQuery3);
    let studentResult3 = await pool.query(studentQuery3);      
    if (studentResult3.rowCount > 0){      
      
        studentsfiltercoursecompletiondate = studentResult3.rows.filter(function(element){
        return element.coursecompletiondate&&element.coursecompletiondate !="" && element.coursecompletiondate!= null && element.coursecompletiondate!= "null" && element.coursecompletiondate!= undefined && element.coursecompletiondate!= "undefined";
      });
      
    }

    


    

    var studentQuery9 = format(`SELECT DISTINCT b.other4
      FROM student a 
      LEFT JOIN ${cohorttablename} b ON a.id = b.studentid 
      LEFT JOIN cohort c ON b.cohortid = c.id ${whereClause} order by b.other4;`);
      console.log("studentQuery9=",studentQuery9);
    var studentResult9 = await pool.query(studentQuery9);      
    if (studentResult9.rowCount > 0){
      other4 = studentResult9.rows.filter(function(element){
        return element.other4&&element.other4 !="" && element.other4!= null && element.other4!= "null" && element.other4!= undefined && element.other4!= "undefined";
      });
    }

    var studentQuery4 = format(`SELECT DISTINCT b.other9
      FROM student a 
      LEFT JOIN ${cohorttablename} b ON a.id = b.studentid 
      LEFT JOIN cohort c ON b.cohortid = c.id ${whereClause} order by b.other9;`);
      console.log(studentQuery4);
    var studentResult4 = await pool.query(studentQuery4);      
    if (studentResult4.rowCount > 0){
      other9 = studentResult4.rows.filter(function(element){
        return element.other9&&element.other9 !="" && element.other9!= null && element.other9!= "null" && element.other9!= undefined && element.other9!= "undefined";
      });
    }

    var studentQuery5 = format(`SELECT DISTINCT b.other10
      FROM student a 
      LEFT JOIN ${cohorttablename} b ON a.id = b.studentid 
      LEFT JOIN cohort c ON b.cohortid = c.id ${whereClause} order by b.other10;`);
    var studentResult5 = await pool.query(studentQuery5);      
    if (studentResult5.rowCount > 0){
      other10 = studentResult5.rows.filter(function(element){
        return element.other10&&element.other10 !="" && element.other10!= null && element.other10!= "null" && element.other10!= undefined && element.other10!= "undefined";
      });
    }

    var studentQuery6 = format(`SELECT DISTINCT b.other11
      FROM student a 
      LEFT JOIN ${cohorttablename} b ON a.id = b.studentid 
      LEFT JOIN cohort c ON b.cohortid = c.id ${whereClause} order by b.other11;`);
    var studentResult6 = await pool.query(studentQuery6);      
    if (studentResult6.rowCount > 0){
      other11 = studentResult6.rows.filter(function(element){
        return element.other11&&element.other11 !="" && element.other11!= null && element.other11!= "null" && element.other11!= undefined && element.other11!= "undefined";
      });
    }

    var studentQuery7 = format(`SELECT DISTINCT b.other12
      FROM student a 
      LEFT JOIN ${cohorttablename} b ON a.id = b.studentid 
      LEFT JOIN cohort c ON b.cohortid = c.id ${whereClause} order by b.other12;`);
    var studentResult7 = await pool.query(studentQuery7);      
    if (studentResult7.rowCount > 0){
      other12 = studentResult7.rows.filter(function(element){
        return element.other12&&element.other12 !="" && element.other12!= null && element.other12!= "null" && element.other12!= undefined && element.other12!= "undefined";
      });
    }

    var studentQuery8 = format(`SELECT DISTINCT b.other3
      FROM student a 
      LEFT JOIN ${cohorttablename} b ON a.id = b.studentid 
      LEFT JOIN cohort c ON b.cohortid = c.id ${whereClause} order by b.other3;`);
    var studentResult8 = await pool.query(studentQuery8);      
    if (studentResult8.rowCount > 0){
      other3 = studentResult8.rows.filter(function(element){
        return element.other3&&element.other3 !="" && element.other3!= null && element.other3!= "null" && element.other3!= undefined && element.other3!= "undefined";
      });
    }

    var studentQuery9 = format(`SELECT DISTINCT b.other5
      FROM student a 
      LEFT JOIN ${cohorttablename} b ON a.id = b.studentid 
      LEFT JOIN cohort c ON b.cohortid = c.id ${whereClause} order by b.other5;`);
    var studentResult9 = await pool.query(studentQuery9);      
    if (studentResult9.rowCount > 0){
      other5 = studentResult9.rows.filter(function(element){
        return element.other5&&element.other5 !="" && element.other5!= null && element.other5!= "null" && element.other5!= undefined && element.other5!= "undefined";
      });
    }

    var studentQuery10 = format(`SELECT DISTINCT b.other6
      FROM student a 
      LEFT JOIN ${cohorttablename} b ON a.id = b.studentid 
      LEFT JOIN cohort c ON b.cohortid = c.id ${whereClause} order by b.other6;`);
    var studentResult10 = await pool.query(studentQuery10);      
    if (studentResult10.rowCount > 0){
      other6 = studentResult10.rows.filter(function(element){
        return element.other6&&element.other6 !="" && element.other6!= null && element.other6!= "null" && element.other6!= undefined && element.other6!= "undefined";
      });
    }

   


    

    retstudentinfo.school=studentsfilterschools;
    retstudentinfo.coursename=studentsfiltercoursename;
    retstudentinfo.examinationpassingyear=studentsfilterexamyear;
    retstudentinfo.coursecompletiondate=studentsfiltercoursecompletiondate;
    retstudentinfo.other2=other2;
    retstudentinfo.other3=other3;
    retstudentinfo.other4=other4;
    retstudentinfo.other5=other5;
    retstudentinfo.other6=other6;
    retstudentinfo.other9=other9;
    retstudentinfo.other10=other10;
    retstudentinfo.other11=other11;
    retstudentinfo.other12=other12;

    var obj = {
      Status: 200,              
      paiddata:retstudentinfo
    };
    return res.json(obj);
  } 
  catch(err){
    console.log(err.message);
    var obj = {
      Status: 400,
      message: err.message
    };
    res.json(obj);
  }
  
}

user_1.insertstudentinputdata = async (req, res, next) => {
  try{
    var recordid = req.body.recordid;  
    if(recordid==null || recordid == undefined) recordid="";
    var studentname = req.body.studentname;
    var emailaddress = req.body.email;
    var registnumber = req.body.registrationnumber;
    var fathername = req.body.fathername;
    var coursename = req.body.coursename;
    var examyear = req.body.examinationyear;
    var school = req.body.school;
    var specialization = req.body.specialization;
    var certtype = req.body.certtype;
    var imagedata = req.body.image;
    var other1 = req.body.other1;
    var other2 = req.body.other2;
    var other3 = req.body.other3;
    var other4 = req.body.other4;
    var other5 = req.body.other5;
    var other6 = req.body.other6;
    var other7 = req.body.other7;
    var other8 = req.body.other8;
    var other9 = req.body.other9;
    var other10 = req.body.other10;
    var api_key = req.body.apikey;
    
    if (api_key == "" || api_key == null || api_key == undefined) {
      var obj = {
        Status: 400,
        message: "Invalid API Key"
      };
      res.json(obj);
      return;
    }

    var userid = await getUserIDFromApiKey(api_key);
    if (userid == null) {
      var obj = {
        Status: 400,
        message: "Invalid api key"
      };
      res.json(obj);
      return;
    }
    var puserid = await getParentAccountIdFromId(userid);
    var ispaid="yes";
   
    let logfilename=logfiledir+puserid+"/sendcertificate.log";
    var certtypes={"degree":"cohortmembers_degree","transcript":"cohortmembers_transcript","openbadges":"cohortmembers_openbadges","migration":"cohortmembers_degree","bonafide":"cohortmembers_degree","transfer":"cohortmembers_degree","relieving":"cohortmembers_degree","awards":"cohortmembers_degree","semesterwisegradecard":"cohortmembers_degree","medal":"cohortmembers_degree"};
    var cohorttablename="cohortmembers_degree";
    if(certtype && certtype!="" && certtype!="null" && certtype!=null && certtype!=undefined)
    {      
      cohorttablename=certtypes[certtype];
    }
    let studentQuery = format(`select a.*, b.id as mainstudentid, b.signedcertificateurl, b.unsignedcertificateurl from student a left join ${cohorttablename} b on a.id=b.studentid left join cohort c on b.cohortid=c.id where a.studentid='${registnumber}' and a.accountid='${puserid}' and (b.certificatesendstate='0' or b.certificatesendstate='2') and signedcertificateurl is not null and signedcertificateurl!=''`);
    if(puserid =="20122" || puserid =="25" || puserid =="11") //rv
    {
      ispaid="no";
      studentQuery = format(`select a.*, b.id as mainstudentid, b.signedcertificateurl, b.unsignedcertificateurl from student a left join ${cohorttablename} b on a.id=b.studentid left join cohort c on b.cohortid=c.id where a.studentid='${registnumber}' and  a.accountid='${puserid}' and (b.certificatesendstate='0' or b.certificatesendstate='2') and signedcertificateurl is not null and signedcertificateurl!=''`);
      updateStudentQuery = format(`UPDATE student SET other12 = '${other5}', other13 = '${other4}' where studentid='${registnumber}' and accountid='${puserid}'`);
      await pool.query(updateStudentQuery);
    }
    console.log(studentQuery);
    let studentResult = await pool.query(studentQuery);
    if (studentResult.rowCount > 0){

      for ( const student of studentResult.rows ) {

        let tmpname = [];
        let firstname = student['firstname'];
        let middlename = student['middlename'];
        let lastname = student['lastname'];
        tmpname.push(firstname);
        if (middlename != null && middlename != "") tmpname.push(middlename);
        if (lastname != null && lastname != "") tmpname.push(lastname);
        let fullname = tmpname.join(" ");
        console.log("fullname=", fullname);
        if (fullname.toLowerCase().trim() == studentname.toLowerCase().trim()){
          let mainstudentid = student['mainstudentid'];
          if(mainstudentid==null || mainstudentid=="" || mainstudentid==undefined) 
          {
            continue;
          }
          let studentStatus = 5;
          
          if (student['signedcertificateurl'] != null && student['signedcertificateurl'] != "") studentStatus = 3;
          else if (student['unsignedcertificateurl'] != null && student['unsignedcertificateurl'] != "") studentStatus = 4;
          /*
          let insertQuery = format(`insert into student_input_data (name, competencyname, emailaddress, studentid, picturedata, status, fathername, certificatetype, examyear, school, specialization, signedcertificateurl, other1, other2, other3, other4, other5, other6, other7, other8, other9, other10, ispaid, recordid) select '${fullname}', '${coursename}', '${emailaddress}', '${mainstudentid}', '${imagedata}', '${studentStatus}', '${fathername}', '${certtype}', '${examyear}', '${school}', '${specialization}', '${student['signedcertificateurl']}', '${other1}', '${other2}', '${other3}', '${other4}', '${other5}', '${other6}', '${other7}', '${other8}', '${other9}', '${other10}', '${ispaid}', '${recordid}' on conflict (studentid) do update set name='${fullname}', competencyname='${coursename}', emailaddress='${emailaddress}', picturedata='${imagedata}', fathername='${fathername}', examyear='${examyear}', school='${school}', specialization='${specialization}', ispaid='${ispaid}' returning id`);
          */

          const insertQuery = format(`insert into student_input_data (name, competencyname, emailaddress, studentid, picturedata, status, fathername, certificatetype, examyear, school, specialization, signedcertificateurl, other1, other2, other3, other4, other5, other6, other7, other8, other9, other10, ispaid, recordid) select '${fullname}', '${coursename}', '${emailaddress}', '${mainstudentid}', '', '${studentStatus}', '${fathername}', '${certtype}', '${examyear}', '${school}', '${specialization}', '${student['signedcertificateurl']}', '${other1}', '${other2}', '${other3}', '${other4}', '${other5}', '${other6}', '${other7}', '${other8}', '${other9}', '${other10}', '${ispaid}', '${recordid}' on conflict (studentid) do update set name='${fullname}', competencyname='${coursename}', emailaddress='${emailaddress}', picturedata='', fathername='${fathername}', examyear='${examyear}', school='${school}', specialization='${specialization}', ispaid='${ispaid}' returning id`);

          const insertResult = await pool.query(insertQuery);
          console.log(insertQuery);
          if(insertResult && insertResult.rowCount > 0)
          {
            const updateQuery = format(`UPDATE student_input_data SET picturedata = $1 WHERE recordid = '${recordid}'`);
            const updateResult = await pool.query(updateQuery, [imagedata]);
          }
          else
          {
            console.log("Failed inserting!");
          }

          var smtpaccount = {
            'type' : true,
            'username' : "", 
            'clientid' : "",
            'clientsecret' : "",
            'refreshtoken' : "",
            'from': ""
          };
          
          var cc="";
          var contact_email = "";

          var querySmtp=format(`SELECT a.*, b.organization_name FROM setting a left join usermaster b on CAST(a.accountid AS INTEGER)=b.user_id where a.accountid='${puserid}';`);
          let smtpresult = await pool.query(querySmtp);        
          
          if(smtpresult && smtpresult.rowCount > 0){
            organization_name = smtpresult.rows[0].organization_name;
            smtpaccount['type'] = smtpresult.rows[0].smtptype;
            smtpaccount['host'] = smtpresult.rows[0].smtphost;
            smtpaccount['port'] = smtpresult.rows[0].smtpport;
            smtpaccount['username'] = smtpresult.rows[0].smtpusername;
            smtpaccount['password'] = smtpresult.rows[0].smtppassword;
            smtpaccount['from'] = smtpresult.rows[0].smtpfrom;
      
            smtpaccount['clientid'] = smtpresult.rows[0].smtpclientid;
            smtpaccount['clientsecret'] = smtpresult.rows[0].smtpclientsecret;
            smtpaccount['refreshtoken'] = smtpresult.rows[0].smtprefreshtoken;
      
            smtpaccount['isoffice365'] = smtpresult.rows[0].isoffice365;
            smtpaccount['office365accesstoken'] = smtpresult.rows[0].office365accesstoken;
            cc=smtpresult.rows[0].smtpcc;             
            contact_email = smtpresult.rows[0].contact_email;      
            if (contact_email == null || contact_email == undefined) contact_email = "";
            if (contact_email == "")
            {          
              const mailer_certonce = require("../../config/mailer_certonce");            
              let email_body = `<p style="color: black;">Contact Email is not defined. Please set contact email in /My PROFILE/Setting/CONTACT INFORMATION</p>`;
              mailer_certonce(email_body, email_subject, contact_email, logfilename);
            }
          }
          var smtpcc=[];
          if(cc!="" && cc!=null && cc!==undefined)
          {              
            smtpcc.push(cc);
          }            
          if(smtpcc.length>0)
          {                  
            smtpaccount['cc']=smtpcc.join(",");
          }
          
          if(puserid == "20102" || puserid == "24") // gcu
          {
            const mailer_downloadcertificate = require("../../config/mailer_downloadcertificate");
            //////////mail to student/////////
            let email_subject = `Acknowledgement from Garden City University`;
            let email_body=`<p>
    <meta charset="utf-8">
</p>
<p style="background-color:white;line-height:150%;margin:10.0pt 0in;"><span style="font-family:&quot;Cambria&quot;,serif;font-size:12.0pt;"><span style="line-height:150%;" lang="EN" dir="ltr">Dear ${studentname},</span></span></p>
<p style="background-color:white;line-height:150%;margin:10.0pt 0in;"><span style="font-family:&quot;Cambria&quot;,serif;font-size:12.0pt;"><span style="line-height:150%;" lang="EN" dir="ltr">We appreciate your interest in applying for your Blockchain Digital PDF at Garden City University.</span></span></p>
<p style="background-color:white;line-height:150%;margin:10.0pt 0in;">
    <meta charset="utf-8">
</p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:10pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Thank you for applying for your online digital blockchain-secured Degree through the Garden City University’s website.</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your request is currently under review. Please allow us 24-48 hours to review and approve your request. During this period, our team will verify the necessary data.</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr">&nbsp;</p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Once your request has been processed, you will receive an email with instructions on how to use your blockchain-secured Digital Degree. This will include steps Verifier needs to follow to verify the Degree and how to share it with potential employers or other Institutions.</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr">&nbsp;</p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Should you have any questions or require further assistance during this process, please do not hesitate to reach out to us at [University email address] or [Phone number].</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Thank you once again. We are proud of your accomplishments and are excited to provide you with this secure and innovative way to showcase your achievements.</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr">&nbsp;</p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Best Regards,</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Registrar</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Garden City University</span></span></p>
<p><img class="image_resized" style="width:9.79%;" src="https://www.certonce.com/images/GCU/gcu_logo.png"></p>
            `;          
            mailer_downloadcertificate(email_body, email_subject, emailaddress, smtpaccount, logfilename);

            //////////mail to contact email address/////////

            let email_contact_subject = `Digital Blockchain Certificate Request Received`;
            let email_contact_body=`<p>
    <meta charset="utf-8">
</p>
<p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:10pt;padding:0pt 0pt 10pt;" dir="ltr">
    <meta charset="utf-8">
</p>
<p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:10pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Dear Garden City University Team,</span></span></p>
<p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">You have received a request to issue a Digital Blockchain Certificate by Alumni.</span></span></p>
<p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">To review and respond with approval or decline please log into your CertOnce Account using the following link: www.certonce.com</span></span></p>
<p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Thank you</span></span></p>
<p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Best Regards</span></span></p>
<p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:10pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">CertOnce Team</span></span></p>
<p><img class="image_resized" style="width:12.77%;" src="https://www.certonce.com/images/certonce_logo_transparent.png" height="110px"></p>
            `;
            if(contact_email!=="")
            {
              mailer_downloadcertificate(email_contact_body, email_contact_subject, contact_email, smtpaccount, logfilename);
            }
          }
          else if(puserid == "20091" || puserid == "30") // galgotias
          {
            const mailer_downloadcertificate = require("../../config/mailer_downloadcertificate");
            //////////mail to student/////////
            let email_subject = `Acknowledgement from Galgotias University`;
            let email_body=`<p>
    <meta charset="utf-8">
</p>
<p style="background-color:white;line-height:150%;margin:10.0pt 0in;"><span style="font-family:&quot;Cambria&quot;,serif;font-size:12.0pt;"><span style="line-height:150%;" lang="EN" dir="ltr">Dear ${studentname},</span></span></p>
<p style="background-color:white;line-height:150%;margin:10.0pt 0in;">
    <meta charset="utf-8">
</p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:10pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Thank you for applying for your online digital blockchain-secured Degree through the Galgotias University’s website.</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your request is currently under review. Please allow us 24-48 hours to review and approve your request. During this period, our team will verify the necessary data.</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Once your request has been processed, you will receive an email with instructions on how to use your blockchain-secured Digital Degree. This will include steps Verifier needs to follow to verify the Degree and how to share it with potential employers or other Institutions.</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Should you have any questions or require further assistance during this process, please do not hesitate to reach out to us at [University email address] or [Phone number].</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Thank you once again. We are proud of your accomplishments and are excited to provide you with this secure and innovative way to showcase your achievements.</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr">&nbsp;</p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Best Regards,</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Registrar</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Galgotias University</span></span></p>
<p><img class="image_resized" style="width:9.79%;" src="https://www.certonce.com/images/Galgotias/Colored Logo D.png"></p>
            `;          
            mailer_downloadcertificate(email_body, email_subject, emailaddress, smtpaccount, logfilename);

            //////////mail to contact email address/////////

            let email_contact_subject = `Digital Blockchain Certificate Request Received`;
            let email_contact_body=`<p>
    <meta charset="utf-8">
</p>
<p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:10pt;margin-top:0pt;" dir="ltr">
    <meta charset="utf-8">
</p>
<p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:10pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Dear Galgotias University Team,</span></span></p>
<p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">You have received a request to issue a Digital Blockchain Certificate by Alumni.</span></span></p>
<p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">To review and respond with approval or decline please log into your CertOnce Account using the following link: www.certonce.com</span></span></p>
<p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Thank you</span></span></p>
<p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Best Regards</span></span></p>
<p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:10pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">CertOnce Team</span></span></p>
<p><img class="image_resized" style="width:12.77%;" src="https://www.certonce.com/images/certonce_logo_transparent.png" height="110px"></p>
            `;
            if(contact_email!=="")
            {
              mailer_downloadcertificate(email_contact_body, email_contact_subject, contact_email, smtpaccount, logfilename);
            }
          }
          else if(puserid == "20123" || puserid == "23") // ct
          {
            const mailer_downloadcertificate = require("../../config/mailer_downloadcertificate");
            //////////mail to student/////////
            let email_subject = `Acknowledgement from CT University`;
            let email_body=`<p>
    <meta charset="utf-8">
</p>
<p style="background-color:white;line-height:150%;margin:10.0pt 0in;"><span style="font-family:&quot;Cambria&quot;,serif;font-size:12.0pt;"><span style="line-height:150%;" lang="EN" dir="ltr">Dear ${studentname},</span></span>
    <meta charset="utf-8">
</p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:10pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Thank you for applying for your online digital blockchain-secured Degree through the CT University’s website.</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your request is currently under review. Please allow us 24-48 hours to review and approve your request. During this period, our team will verify the necessary data.</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Once your request has been processed, you will receive an email with instructions on how to use your blockchain-secured Digital Degree. This will include steps Verifier needs to follow to verify the Degree and how to share it with potential employers or other Institutions.</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Should you have any questions or require further assistance during this process, please do not hesitate to reach out to us at [University email address] or [Phone number].</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Thank you once again. We are proud of your accomplishments and are excited to provide you with this secure and innovative way to showcase your achievements.</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr">&nbsp;</p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Best Regards,</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Registrar</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">CT University</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:0pt;" dir="ltr">&nbsp;</p>
<p><img class="image_resized" src="https://www.certonce.com/images/CTU/ct_fulllogo.png" width="150px"></p>
            `;          
            mailer_downloadcertificate(email_body, email_subject, emailaddress, smtpaccount, logfilename);

            //////////mail to contact email address/////////

            let email_contact_subject = `Digital Blockchain Certificate Request Received`;
            let email_contact_body=`<p>
    <meta charset="utf-8">
</p>
<p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:10pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Dear CT University Team,</span></span></p>
<p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">You have received a request to issue a Digital Blockchain Certificate by Alumni.</span></span></p>
<p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">To review and respond with approval or decline please log into your CertOnce Account using the following link: www.certonce.com</span></span></p>
<p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Thank you</span></span></p>
<p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Best Regards</span></span></p>
<p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:10pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">CertOnce Team</span></span></p>
<p><img style="height:80px;" src="https://www.certonce.com/images/certonce_logo_transparent.png"></p>
            `;
            if(contact_email!=="")
            {
              mailer_downloadcertificate(email_contact_body, email_contact_subject, contact_email, smtpaccount, logfilename);
            }
          }

          var obj = {
            Status: 200,
            message: "success"
          };
          res.json(obj);
          return;
        }
        
      }
      var obj = {
        Status: 400,
        message: "Your name is incorrect."
      };
      res.json(obj);
      return;
    }
    else {
      var obj = {
        Status: 400,
        message: "Your registration number or other parameters are incorrect."
      };
      res.json(obj);
      return;
    }
  }
  catch(err){
    var obj = {
      Status: 400,
      message: err.message
    };
    res.json(obj);
  }
}

user_1.updatepaymentstateforinsertstudentinputdata = async (req, res, next) => {
  try{
    var recordid = req.body.recordid;  
    if(recordid==null || recordid==undefined || recordid=="")
    {
      var obj = {
        Status: 400,
        message: "Bad request"
      };
      res.json(obj);
      return;
    }  
    var api_key = req.body.apikey;
    
    if (api_key == "" || api_key == null || api_key == undefined) {
      var obj = {
        Status: 400,
        message: "Invalid API Key"
      };
      res.json(obj);
      return;
    }

    var userid = await getUserIDFromApiKey(api_key);
    if (userid == null) {
      var obj = {
        Status: 400,
        message: "Invalid api key"
      };
      res.json(obj);
      return;
    }
    var puserid = await getParentAccountIdFromId(userid);
   
    let logfilename=logfiledir+puserid+"/sendcertificate.log";
    let updateQuery = format(`update student_input_data set ispaid='yes' where recordid='${recordid}'`);
    console.log(updateQuery);
    await pool.query(updateQuery);

    let studentQuery = format(`select * from student_input_data where recordid='${recordid}'`);
    
    let studentResult = await pool.query(studentQuery);
    if (studentResult.rowCount > 0){
      let studentname = studentResult.rows[0].name;
      let emailaddress = studentResult.rows[0].emailaddress;
      let signedcertificateurl = studentResult.rows[0].other6;
      if(signedcertificateurl==null||signedcertificateurl=="")
      {
        var obj = {
          Status: 400,
          message: "Invalid request"
        };
        res.json(obj);
        return;
      }
      let lastelement=signedcertificateurl.split("/")[signedcertificateurl.split("/").length-1];//signedcertificateurl.split("/").pop();

      var smtpaccount = {
        'type' : true,
        'username' : "", 
        'clientid' : "",
        'clientsecret' : "",
        'refreshtoken' : "",
        'from': ""
      };
      
      var cc="";
      var contact_email = "";
  
      var querySmtp=format(`SELECT a.*, b.organization_name FROM setting a left join usermaster b on CAST(a.accountid AS INTEGER)=b.user_id where a.accountid='${puserid}';`);
      let smtpresult = await pool.query(querySmtp);        
      
      if(smtpresult && smtpresult.rowCount > 0){
        organization_name = smtpresult.rows[0].organization_name;
        smtpaccount['type'] = smtpresult.rows[0].smtptype;
        smtpaccount['host'] = smtpresult.rows[0].smtphost;
        smtpaccount['port'] = smtpresult.rows[0].smtpport;
        smtpaccount['username'] = smtpresult.rows[0].smtpusername;
        smtpaccount['password'] = smtpresult.rows[0].smtppassword;
        smtpaccount['from'] = smtpresult.rows[0].smtpfrom;
  
        smtpaccount['clientid'] = smtpresult.rows[0].smtpclientid;
        smtpaccount['clientsecret'] = smtpresult.rows[0].smtpclientsecret;
        smtpaccount['refreshtoken'] = smtpresult.rows[0].smtprefreshtoken;
  
        smtpaccount['isoffice365'] = smtpresult.rows[0].isoffice365;
        smtpaccount['office365accesstoken'] = smtpresult.rows[0].office365accesstoken;
        cc=smtpresult.rows[0].smtpcc;             
        contact_email = smtpresult.rows[0].contact_email;      
        if (contact_email == null || contact_email == undefined) contact_email = "";
        if (contact_email == "")
        {          
          const mailer_certonce = require("../../config/mailer_certonce");            
          let email_body = `<p style="color: black;">Contact Email is not defined. Please set contact email in /My PROFILE/Setting/CONTACT INFORMATION</p>`;
          mailer_certonce(email_body, email_subject, contact_email, logfilename);
        }
      }
      var smtpcc=[];
      if(cc!="" && cc!=null && cc!==undefined)
      {              
        smtpcc.push(cc);
      }            
      if(smtpcc.length>0)
      {                  
        smtpaccount['cc']=smtpcc.join(",");
      }
      
      if(puserid =="20122" || puserid =="25" || puserid =="11")// rv
      {
        const mailer_downloadcertificate = require("../../config/mailer_downloadcertificate");
        //////////mail to student/////////
        let email_subject = `Acknowledgement from RV College of Engineering`;
        let email_body=`<p><meta charset="utf-8"></p>
          <p style="background-color:white;line-height:150%;margin:10.0pt 0in;"><span style="font-family:&quot;Cambria&quot;,serif;font-size:12.0pt;"><span style="line-height:150%;" lang="EN" dir="ltr">Dear ${studentname},</span></span></p>
          <p style="background-color:white;line-height:150%;margin:10.0pt 0in;"><meta charset="utf-8"></p>
          <p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:10pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Thank you for applying for your online digital blockchain-secured Transcript through the RV College of Engineering’s website.</span></span></p>
          <p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your request is currently under review. Please allow us 24-48 hours to review and approve your request. During this period, our team will verify the necessary data.</span></span></p>
          <p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Once your request has been processed, you will receive an email with instructions on how to use your blockchain-secured Digital Transcript. This will include steps Verifier needs to follow to verify the document and how to share it with potential employers or other Institutions.</span></span></p>
          <p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Should you have any questions or require further assistance during this process, please do not hesitate to reach out to us at 080-68188132 or coe1@rvce.edu.in.</span></span></p>
          <p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Thank you once again. We are proud of your accomplishments and are excited to provide you with this secure and innovative way to showcase your achievements.</span></span></p>
          <p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr">&nbsp;</p>
          <p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Best Regards,</span></span></p>
          <p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Registrar</span></span></p>
          <p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">RV College of Engineering</span></span></p>
          <p><img src="https://www.certonce.com/images/RV/rv_whitelogo.png" height="110px"></p>`;
        mailer_downloadcertificate(email_body, email_subject, emailaddress, smtpaccount, logfilename);
        //////////mail to contact email address/////////
        let email_contact_subject = `Digital Blockchain Certificate Request Received`;
        let email_contact_body=`<p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:10pt;margin-top:10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Dear RV College of Engineering Team,</span></span></p>
          <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:10pt;margin-top:10pt;" dir="ltr"><span style="font-family:&quot;Cambria&quot;,serif;font-size:12.0pt;"><span style="line-height:150%;" lang="EN" dir="ltr">We appreciate your interest in applying for your Blockchain Digital PDF at RV College of Engineering.</span></span>&nbsp;<meta charset="utf-8"></p>
          <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:10pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">You have received a request to issue a Digital Blockchain Certificate by Alumni.</span></span></p>
          <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">To review and respond with approval or decline please log into your CertOnce Account using the following link: www.certonce.com</span></span></p>
          <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Thank you</span></span></p>
          <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Best Regards</span></span></p>
          <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:10pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">CertOnce Team</span></span></p>
          <p><img class="image_resized" src="https://www.certonce.com/images/certonce_logo_transparent.png" style="height: 56px;"></p>`;
        if(contact_email!=="")
        {
          mailer_downloadcertificate(email_contact_body, email_contact_subject, contact_email, smtpaccount, logfilename);
        }
      }  
    }



 

    var obj = {
      Status: 200,
      message: "success"
    };
    res.json(obj);



  }
  catch(err){
    var obj = {
      Status: 400,
      message: err.message
    };
    res.json(obj);
  }
}

user_1.updatestudentinputdata = async (req, res, next) => {
  try{
    var params = req.body.selectedItems;
    var action = req.body.action;
    var certtype = req.body.certtype;

    var certtypes={"degree":"cohortmembers_degree","transcript":"cohortmembers_transcript","openbadges":"cohortmembers_openbadges","migration":"cohortmembers_degree","bonafide":"cohortmembers_degree","transfer":"cohortmembers_degree","relieving":"cohortmembers_degree","awards":"cohortmembers_degree","semesterwisegradecard":"cohortmembers_degree","medal":"cohortmembers_degree"};
    var cohorttablename="cohortmembers_degree";
    
    if(certtype && certtype!="" && certtype!=="null" && certtype!==undefined && certtype!=null)
    {      
      cohorttablename=certtypes[certtype];
    }
    else certtype="degree";

    var currentUser = req.user; 
    var organization_name=currentUser.organization_name;
    var organization_verify_uri=currentUser.organization_verify_uri;
    if(organization_verify_uri==""||organization_verify_uri=="null"||organization_verify_uri==null|| organization_verify_uri==undefined) organization_verify_uri="certonce";
    if(req.user.business_is_verified==false)
    {
    var obj = {
          Status: 400,
            message: "Your account is currently under verification, please contact certonce team."
        };
        res.json(obj);
        return;
    }
    var permission=await getPermission(req.user.user_id,"getStudents");
    if(permission==false)
    {
        var obj = {
          Status: 400,
            message: "Access denied."
        };
        res.json(obj);
        return;
    }
    var puserid=await getParentAccountIdFromId(req.user.user_id);

    var smtpaccount = {
      'type' : true,
      'username' : "", 
      'clientid' : "",
      'clientsecret' : "",
      'refreshtoken' : "",
      'from': ""
    };
    var cc="";
    var contact_email = "";
    var querySmtp=format(`SELECT * FROM setting where accountid='${puserid}';`);
    let smtpresult = await pool.query(querySmtp);
    
    if(smtpresult && smtpresult.rowCount > 0){
      smtpaccount['type'] = smtpresult.rows[0].smtptype;
      smtpaccount['host'] = smtpresult.rows[0].smtphost;
      smtpaccount['port'] = smtpresult.rows[0].smtpport;
      smtpaccount['username'] = smtpresult.rows[0].smtpusername;
      smtpaccount['password'] = smtpresult.rows[0].smtppassword;
      smtpaccount['from'] = smtpresult.rows[0].smtpfrom;

      smtpaccount['clientid'] = smtpresult.rows[0].smtpclientid;
      smtpaccount['clientsecret'] = smtpresult.rows[0].smtpclientsecret;
      smtpaccount['refreshtoken'] = smtpresult.rows[0].smtprefreshtoken;

      smtpaccount['isoffice365'] = smtpresult.rows[0].isoffice365;
      smtpaccount['office365accesstoken'] = smtpresult.rows[0].office365accesstoken;

      cc=smtpresult.rows[0].smtpcc;
      contact_email = smtpresult.rows[0].contact_email;
      if (contact_email == null || contact_email == undefined) contact_email = "";
    }
        
    let isTotal=false; 
    let glcohortid="";
    for (let index = 0; index <params.length; index++) 
    {
      const element = params[index];
      let cohortid=element.split("=")[0];
      let studentid=element.split("=")[1];
      glcohortid=cohortid;
      if(studentid=='') 
      {
        isTotal=true;           
        break;
      }
    }
     
    
    isTotal = false;
    var mail_subject="";                    
    var mail_content = "";
    var selectquery=format(`select * from emailtemplate where cohortid='${glcohortid}';`);
    var emailtemplates = await pool.query(selectquery);
    if ( emailtemplates.rowCount > 0 ) 
    {
      for ( const emailtemplate of emailtemplates.rows ) {
        mail_subject = emailtemplate['certificateemail_subject'];                    
        mail_content = emailtemplate['certificateemail_content'];
      }
    }
    if(isTotal==false)
    {
      var stop_flag = false;
      var clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      console.log('Your IP address is ' + clientIp);
      let ipQuery = format(`INSERT INTO activitylog (activity,ipaddress,userid) values ('sendcertificate (${params.length} students are selects)','${clientIp}','${puserid}');`);
      await pool.query(ipQuery);
      if (action == "decline"){

        var declinereason = req.body.declinereason;
        if(declinereason==null || declinereason==undefined) declinereason="";

        for (let index = 0; index < params.length; index++) {
          const element = params[index]; 
          let cohortid=element.split("=")[0];       
          let studentid=element.split("=")[1];
          if ( studentid == '') {continue;}
          
          let studentQuery = format(`select f.emailaddress, f.name, f.studentid as studentmainid, b.* from student_input_data f left join ${cohorttablename} b on CAST(f.studentid AS INTEGER)=b.id where b.id='${studentid}'`);
          let studentResult = await pool.query(studentQuery);
          if (studentResult.rowCount > 0){
            let studentname = studentResult.rows[0].name;
            let sendemail = studentResult.rows[0].emailaddress;
           
            let attachment_name = `${studentname}_${studentid}`;
            attachment_name = attachment_name.replace(/ /g, "_");

            if(sendemail) {

              var cert_email_subject = "Declined Request for Digital Degree Application"; 
              var email_body=`<p style="color:black;"“Dear ${studentname}</p>
                <p style="color:black;">We regret to inform you that your request to apply for a Digital degree has been declined.</p>       
                <p style="color:black;">We encourage you to reach out to us for further clarification.</p>                 
              `;    

              if(puserid == "20102" || puserid == "24") // gcu
              {
                cert_email_subject = `Declined Request for Digital Degree Application`;
                email_body=`<p>
    <meta charset="utf-8">
</p>
<p style="background-color:white;line-height:150%;margin:10.0pt 0in;"><span style="font-family:&quot;Cambria&quot;,serif;font-size:12.0pt;"><span style="line-height:150%;" lang="EN" dir="ltr">Dear ${studentname},</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:10pt;padding:0pt 0pt 10pt;" dir="ltr">
    <meta charset="utf-8">
</p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">We regret to inform you that your request to apply for a Digital degree has been declined. We encourage you to reach out to us for further clarification.</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr">
    <meta charset="utf-8">
</p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:10pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Please contact us on&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>[University email address]</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> or&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>[Phone number]</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> at your earliest convenience.&nbsp;</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">The reason for declining the request was ${declinereason}. We apologize for any inconvenience this may have caused and appreciate your understanding.</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Thank you</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Best Regards</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Registrar</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Garden City University</span></span></p>
<p><img class="image_resized" style="width:9.79%;" src="https://www.certonce.com/images/GCU/gcu_logo.png"></p>
                `;          
                
              }
              else if(puserid == "20122" || puserid == "25") // rv
              {
                cert_email_subject = `Declined Request for Digital Degree Application`;
                email_body=`<p>
    <meta charset="utf-8">
</p>
<p style="background-color:white;line-height:150%;margin:10.0pt 0in;"><span style="font-family:&quot;Cambria&quot;,serif;font-size:12.0pt;"><span style="line-height:150%;" lang="EN" dir="ltr">Dear ${studentname},</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:10pt;padding:0pt 0pt 10pt;" dir="ltr">
    <meta charset="utf-8"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">We regret to inform you that your request to apply for a Digital degree has been declined. We encourage you to reach out to us for further clarification.We regret to inform you that your request to apply for a Digital degree has been declined. We encourage you to reach out to us for further clarification.</span></span>
</p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Please contact us on [email address] or [phone number] at your earliest convenience.&nbsp;</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">The reason for declining the request was ${declinereason}. We apologize for any inconvenience this may have caused and appreciate your understanding.</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Thank you</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Best Regards</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Registrar</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">RV College of Engineering</span></span></p>
<p><img src="https://www.certonce.com/images/RV/rv_whitelogo.png" height="110px"></p>
                `;          
                
              }
              else if(puserid == "20091" || puserid == "30") // galgotias
              {
                cert_email_subject = `Declined Request for Digital Degree Application`;
                email_body=`<p>
    <meta charset="utf-8">
</p>
<p style="background-color:white;line-height:150%;margin:10.0pt 0in;"><span style="font-family:&quot;Cambria&quot;,serif;font-size:12.0pt;"><span style="line-height:150%;" lang="EN" dir="ltr">Dear ${studentname},</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:10pt;padding:0pt 0pt 10pt;" dir="ltr">
    <meta charset="utf-8">
</p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">We regret to inform you that your request to apply for a Digital degree has been declined. We encourage you to reach out to us for further clarification.</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr">
    <meta charset="utf-8">
</p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:10pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Please contact us on&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>[University email address]</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> or&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>[Phone number]</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> at your earliest convenience.&nbsp;</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">The reason for declining the request was ${declinereason}. We apologize for any inconvenience this may have caused and appreciate your understanding.</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Thank you</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Best Regards</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Registrar</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Garden City University</span></span></p>
<p><img class="image_resized" style="width:9.79%;" src="https://www.certonce.com/images/Galgotias/Colored Logo D.png"></p>
                `;          
                
              }
              else if(puserid == "20123" || puserid == "23") // ct
              {
                cert_email_subject = `Declined Request for Digital Degree Application`;
                email_body=`<p>
    <meta charset="utf-8">
</p>
<p style="background-color:white;line-height:150%;margin:10.0pt 0in;"><span style="font-family:&quot;Cambria&quot;,serif;font-size:12.0pt;"><span style="line-height:150%;" lang="EN" dir="ltr">Dear ${studentname},</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:10pt;padding:0pt 0pt 10pt;" dir="ltr">
    <meta charset="utf-8"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">We regret to inform you that your request to apply for a Digital degree has been declined. We encourage you to reach out to us for further clarification.We regret to inform you that your request to apply for a Digital degree has been declined. We encourage you to reach out to us for further clarification.</span></span>
</p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Please contact us on [email address] or [phone number] at your earliest convenience.&nbsp;</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">The reason for declining the request was ${declinereason}. We apologize for any inconvenience this may have caused and appreciate your understanding.</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Thank you</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Best Regards</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Registrar</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:0pt;" dir="ltr">
    <meta charset="utf-8"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">CT University</span></span>
</p>
<p><img class="image_resized" style="width:250px;" src="https://www.certonce.com/images/CTU/ct_fulllogo.png"></p>
                `;          
                
              }
              
              const mailer_downloadcertificate = require("../../config/mailer_downloadcertificate");
              let logfilename=logfiledir+puserid+"/sendcertificate.log";
              mailer_downloadcertificate(email_body, cert_email_subject, sendemail, smtpaccount, logfilename);
              
              
              let updateQuery = format(`update student_input_data set status='2', declinereason='${declinereason}' where studentid='${studentid}'`);
              await pool.query(updateQuery);
             
            }//if(sendemail)
          }
        }
        var obj = {
          Status: 200,
          message: 'Success',
          // downloadIitems:downloadIitems
        }
        res.json(obj);
        return;
      }
      else if (action == "approve"){
        var obj = {
          Status: 200,
          message: 'Please wait while sending email',
          // downloadIitems:downloadIitems
        }
        res.json(obj);
        try{
          for (let index = 0; index < params.length; index++){
            if (stop_flag) break;          
            const element = params[index]; 
            let cohortid=element.split("=")[0];       
            let studentid=element.split("=")[1];
            if ( studentid == '') {continue;}
            let studentQuery = format(`select f.emailaddress, f.name, b.id as studentid, b.* ,a.studentid as studentmainid from student_input_data f left join ${cohorttablename} b on CAST(f.studentid AS INTEGER)=b.id left join student a on b.studentid=a.id where b.id='${studentid}'`);
            let studentResult = await pool.query(studentQuery);
            if (studentResult.rowCount > 0){
              let studentname = studentResult.rows[0].name;
              let sendemail = studentResult.rows[0].emailaddress;
              let studentmainid = studentResult.rows[0].studentmainid;
              //let studentid = studentResult.rows[0].studentid;
              let signedcertificateurl = studentResult.rows[0]['signedcertificateurl'];
              let signedcertificatepdfurl = studentResult.rows[0]['signedcertificatepdfurl'];
              let certificaterevoked = studentResult.rows[0]['certificaterevoked'];
              let attachment_name = `${studentname}_${studentid}`;
              attachment_name = attachment_name.replace(/ /g, "_");

              if(sendemail&&signedcertificateurl&&certificaterevoked!=true) {
                let jsonurl=signedcertificateurl;//myip+subwwwurl+"/certificatejson/";
                let pdfurl=signedcertificatepdfurl;//myip+subwwwurl+"/certificatepdf/"; 
                let lastelement=signedcertificateurl.split("/")[signedcertificateurl.split("/").length-1];//signedcertificateurl.split("/").pop();
                let pdflastelement=signedcertificatepdfurl.split("/")[signedcertificatepdfurl.split("/").length-1];//signedcertificatepdfurl.split("/").pop();
                let fileid=lastelement.replace(".json","");
                var cert_email_subject = "A Digital credential has been issued by "+organization_name; 
                var email_body=`<p style="color:black;"“Dear ${studentname}</p>
                  <p style="color:black;">Thank you for requesting for the digital certificate from ${organization_name}.</p>       
                  <p style="color:black;">Please find attached your Blockchain secured Digital Degree.</p>                 
                `;    

                if(puserid == "20102" || puserid == "24") // gcu
                { 

                  let onetimecode = "";
                  // email = degreeResult.rows[0].emailaddress;
                  while (true) {
                    onetimecode = getOnetimecode(15);             
                    let getExistStudent = format(`SELECT id FROM verifyrequest WHERE onetimecode='${onetimecode}';`);
                      studentsforonetimecode = await pool.query(getExistStudent);
                      if (studentsforonetimecode.rowCount == 0) {
                        break;
                      }
                  }
                  let insertQuery = format(`insert into verifyrequest (fullname, accountid, cohortid, studentid, pdfurl, payer_name, onetimecode,onetimeblockcertscode, designation, organization, email, contactnumber, documentid, enrollnumber, certificatetype, issendcase) values ('${studentname}', '${puserid}', '${cohortid}', '${studentid}', '${pdfurl}','${studentname}','${onetimecode}','', '', '','${sendemail}','', '${fileid}','${studentmainid}','${certtype}', true) returning id`);                
                  let insertResult = await pool.query(insertQuery);                

                  cert_email_subject = `Digital Degree from Garden City University`;
                  email_body=`<p>
    <meta charset="utf-8">
</p>
<p style="background-color:white;line-height:150%;margin:10.0pt 0in;"><span style="font-family:&quot;Cambria&quot;,serif;font-size:12.0pt;"><span style="line-height:150%;" dir="ltr">Dear ${studentname},</span></span>&nbsp;
    <meta charset="utf-8">
</p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:10pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Dear Student,</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Thank you for applying for your Digital Degree. We are pleased to inform you that your Degree is now available for viewing and verification.</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">How to access your Degree</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">You will receive your Degree in 2 formats:</span></span></p>
<ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#222222;font-family:Arial,sans-serif;font-size:11pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Digital Smart PDF: Your digital PDF will have a logo to click and verify. This PDF can be shared with your potential employers, and potential Universities for further education.</span></span></li>
    <li style="background-color:transparent;color:#222222;font-family:Arial,sans-serif;font-size:11pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">JSON: Can be uploaded for verification on&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://verify.gardencity.university/"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://verify.gardencity.university/</u></span></span></a></li>
</ol>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Experience our new verification process</span></span></p>
<ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#222222;font-family:Arial,sans-serif;font-size:11pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Click on the logo or upload the JSON file on&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://verify.gardencity.university/"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://verify.gardencity.university/</u></span></span></a></li>
    <li style="background-color:transparent;color:#222222;font-family:Arial,sans-serif;font-size:11pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">You will be redirected to a secure portal to add your one-time code</span></span></li>
</ol>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Please note the one-time code is solely for the purpose of demonstration of the verification and will only be valid for a single access. You will have the opportunity to view and verify the authenticity of your Degree only once on our Blockchain-based verification system.</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your one-time code:&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>${onetimecode}</strong></span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Verifier Verification Process:</span></span></p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your verifiers will need to click the logo on the PDF or upload the JSON file on&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://verify.gardencity.university/"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://verify.gardencity.university/</u></span></span></a><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> and proceed to pay a fee of ₹800, they will receive a one-time code which can be used multiple times during 15 days from date of receipt.&nbsp;</span></span></li>
    <li style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your verifiers can also click on the request an official email button after submitting the One-time code to receive an official email from the University confirming your credentials.</span></span></li>
</ul>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:10pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">If you encounter any difficulties or have questions regarding the Degree or the process. Please feel free to contact us at&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>[University number]</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> or&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>[University email address]</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">. We hope you find our innovative verification system beneficial.</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Thank you</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Best Regards</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Registrar</span></span></p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Garden City University</span></span></p>
<p><img class="image_resized" style="width:9.79%;" src="https://www.certonce.com/images/GCU/gcu_logo.png"></p>
                  `;          
                  
                }
                else if(puserid == "20122" || puserid == "25") // rv
                { 

                  let onetimecode = "";
                  // email = degreeResult.rows[0].emailaddress;
                  while (true) {
                    onetimecode = getOnetimecode(15);             
                    let getExistStudent = format(`SELECT id FROM verifyrequest WHERE onetimecode='${onetimecode}';`);
                      studentsforonetimecode = await pool.query(getExistStudent);
                      if (studentsforonetimecode.rowCount == 0) {
                        break;
                      }
                  }
                  // let insertQuery = format(`insert into verifyrequest (fullname, accountid, cohortid, studentid, pdfurl, payer_name, onetimecode,onetimeblockcertscode, designation, organization, email, contactnumber, documentid) values ('${studentname}', '${puserid}', '${cohortid}', '${studentmainid}', '${pdfurl}','${studentname}','${onetimecode}','', '', '','${sendemail}','', '${fileid}') returning id`);    
                  let insertQuery = format(`insert into verifyrequest (fullname, accountid, cohortid, studentid, pdfurl, payer_name, onetimecode,onetimeblockcertscode, designation, organization, email, contactnumber, documentid, enrollnumber, certificatetype, issendcase) values ('${studentname}', '${puserid}', '${cohortid}', '${studentid}', '${pdfurl}','${studentname}','${onetimecode}','', '', '','${sendemail}','', '${fileid}','${studentmainid}','${certtype}', true) returning id`);                    
                  let insertResult = await pool.query(insertQuery);                

                  cert_email_subject = `Digital Transcript from RV College of Engineering`;
                  email_body=`<p>
    <meta charset="utf-8">
</p>
<p style="background-color:white;line-height:150%;margin:10.0pt 0in;"><span style="font-family:&quot;Cambria&quot;,serif;font-size:12.0pt;"><span style="line-height:150%;" dir="ltr">Dear ${studentname},</span></span>&nbsp;&nbsp;&nbsp;
    <meta charset="utf-8">
</p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:10pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Thank you for applying for your Digital Transcript. We are pleased to inform you that your transcript is now available for viewing and verification.</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">How to access your Transcript</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">You will receive your Document in 2 formats:</span></span></p>
<ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#222222;font-family:Arial,sans-serif;font-size:11pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Digital Smart PDF: Your digital PDF will have a logo to click and verify. This PDF can be shared with your potential employers, and potential Universities for further education.</span></span></li>
    <li style="background-color:transparent;color:#222222;font-family:Arial,sans-serif;font-size:11pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">JSON: Can be uploaded for verification on&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://documentverification.rvce.edu.in/"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://documentverification.rvce.edu.in/</u></span></span></a><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">&nbsp;</span></span></li>
</ol>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Experience our new verification process</span></span></p>
<ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#222222;font-family:Arial,sans-serif;font-size:11pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Click on the logo or upload the JSON file on&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://documentverification.rvce.edu.in/"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://documentverification.rvce.edu.in/</u></span></span></a><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">&nbsp;</span></span></li>
    <li style="background-color:transparent;color:#222222;font-family:Arial,sans-serif;font-size:11pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">You will be redirected to a secure portal to add your one-time code</span></span></li>
</ol>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Please note the one-time code is solely for the purpose of demonstration of the verification and will only be valid for a single access. You will have the opportunity to view and verify the authenticity of your Degree only once on our Blockchain-based verification system.</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your one-time code:&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>${onetimecode}</strong></span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr">
    <meta charset="utf-8">
</p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Verifier Verification Process:</span></span></p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your verifiers will need to click the logo on the PDF or upload the JSON file on&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://documentverification.rvce.edu.in/"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://documentverification.rvce.edu.in/</u></span></span></a><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">&nbsp; and proceed to pay a fee of ₹1200, they will receive a one-time code which can be used multiple times during 15 days from date of receipt.&nbsp;</span></span></li>
    <li style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your verifiers can also click on the request an official email button after submitting the One-time code to receive an official email from the University confirming your credentials.</span></span></li>
</ul>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:10pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">If you encounter any difficulties or have questions regarding the Degree or the process. Please feel free to contact us at&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>[University number]</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> or&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>[University email address]</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">. We hope you find our innovative verification system beneficial.</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Thank you</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Best Regards</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Registrar</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">RV College of Engineering</span></span></p>
<p><img src="https://www.certonce.com/images/RV/rv_whitelogo.png" height="110px"></p>
                  `;          
                  
                }
                else if(puserid == "20091" || puserid == "30") // galgotias
                { 

                  

                  cert_email_subject = `Digital Degree from Galgotias University`;
                  email_body=`<p>
    <meta charset="utf-8">
</p>
<p style="background-color:white;line-height:150%;margin:10.0pt 0in;"><span style="font-family:&quot;Cambria&quot;,serif;font-size:12.0pt;"><span style="line-height:150%;" dir="ltr">Dear ${studentname},</span></span>&nbsp;
    <meta charset="utf-8">
</p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:10pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Thank you for applying for your Digital Degree. We are pleased to inform you that your Degree is now available for viewing and verification.</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">How to access your Degree</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">You will receive your Degree in 2 formats:</span></span></p>
<ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#222222;font-family:Arial,sans-serif;font-size:11pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Digital Smart PDF: Your digital PDF will have a logo to click and verify. This PDF can be shared with your potential employers, and potential Universities for further education.</span></span></li>
    <li style="background-color:transparent;color:#222222;font-family:Arial,sans-serif;font-size:11pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">JSON: Can be uploaded for verification on&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://certificates.galgotiasuniversity.edu.in/"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://certificates.galgotiasuniversity.edu.in/</u></span></span></a></li>
</ol>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:20pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Experience our new verification process</span></span></p>
<ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#222222;font-family:Arial,sans-serif;font-size:11pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Click on the logo or upload the JSON file on&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://certificates.galgotiasuniversity.edu.in/"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://certificates.galgotiasuniversity.edu.in/</u></span></span></a></li>
</ol>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Verifier Verification Process:</span></span></p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your verifiers will need to click the logo on the PDF or upload the JSON file on&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://certificates.galgotiasuniversity.edu.in/"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://certificates.galgotiasuniversity.edu.in/</u></span></span></a><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> to verify.</span></span></li>
    <li style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your verifiers can also click on the request an official email button to receive an official email from the University confirming your credentials.</span></span></li>
</ul>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:10pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">If you encounter any difficulties or have questions regarding the Degree or the process. Please feel free to contact us at&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>[University number]</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> or&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>[University email address]</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">. We hope you find our innovative verification system beneficial.</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Thank you</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Best Regards</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Registrar</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Galgotias University</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:0pt;" dir="ltr">&nbsp;</p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Garden City University</span></span></p>
<p><img class="image_resized" style="width:9.79%;" src="https://www.certonce.com/images/Galgotias/Colored Logo D.png"></p>
                  `;          
                  
                }
                else if(puserid == "20123" || puserid == "23") // ct
                { 

                  let onetimecode = "";
                  // email = degreeResult.rows[0].emailaddress;
                  while (true) {
                    onetimecode = getOnetimecode(15);             
                    let getExistStudent = format(`SELECT id FROM verifyrequest WHERE onetimecode='${onetimecode}';`);
                      studentsforonetimecode = await pool.query(getExistStudent);
                      if (studentsforonetimecode.rowCount == 0) {
                        break;
                      }
                  }
                  // let insertQuery = format(`insert into verifyrequest (fullname, accountid, cohortid, studentid, pdfurl, payer_name, onetimecode,onetimeblockcertscode, designation, organization, email, contactnumber, documentid) values ('${studentname}', '${puserid}', '${cohortid}', '${studentmainid}', '${pdfurl}','${studentname}','${onetimecode}','', '', '','${sendemail}','', '${fileid}') returning id`);                
                  let insertQuery = format(`insert into verifyrequest (fullname, accountid, cohortid, studentid, pdfurl, payer_name, onetimecode,onetimeblockcertscode, designation, organization, email, contactnumber, documentid, enrollnumber, certificatetype, issendcase) values ('${studentname}', '${puserid}', '${cohortid}', '${studentid}', '${pdfurl}','${studentname}','${onetimecode}','', '', '','${sendemail}','', '${fileid}','${studentmainid}','${certtype}', true) returning id`);        
                  let insertResult = await pool.query(insertQuery);                

                  cert_email_subject = `Digital Degree from CT University`;
                  email_body=`<p>
    <meta charset="utf-8">
</p>
<p style="background-color:white;line-height:150%;margin:10.0pt 0in;"><span style="font-family:&quot;Cambria&quot;,serif;font-size:12.0pt;"><span style="line-height:150%;" lang="EN" dir="ltr">Dear ${studentname},</span></span></p>
<p style="background-color:white;line-height:150%;margin:10.0pt 0in;">
    <meta charset="utf-8">
</p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:10pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Thank you for applying for your Digital Degree. We are pleased to inform you that your Degree is now available for viewing and verification.</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">How to access your Degree</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">You will receive your Degree in 2 formats:</span></span></p>
<ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#222222;font-family:Arial,sans-serif;font-size:11pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Digital Smart PDF: Your digital PDF will have a logo to click and verify. This PDF can be shared with your potential employers, and potential Universities for further education.</span></span></li>
    <li style="background-color:transparent;color:#222222;font-family:Arial,sans-serif;font-size:11pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">JSON: Can be uploaded for verification on&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://verification.ctuniversity.in/"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://verification.ctuniversity.in/</u></span></span></a><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">&nbsp;</span></span></li>
</ol>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Experience our new verification process</span></span></p>
<ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#222222;font-family:Arial,sans-serif;font-size:11pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Click on the logo or upload the JSON file on&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://verification.ctuniversity.in/"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://verification.ctuniversity.in/</u></span></span></a><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">&nbsp;</span></span></li>
    <li style="background-color:transparent;color:#222222;font-family:Arial,sans-serif;font-size:11pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">You will be redirected to a secure portal to add your one-time code</span></span></li>
</ol>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Please note the one-time code is solely for the purpose of demonstration of the verification and will only be valid for a single access. You will have the opportunity to view and verify the authenticity of your Degree only once on our Blockchain-based verification system.</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your one-time code:&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>${onetimecode}</strong></span></span>&nbsp;&nbsp;&nbsp;
    <meta charset="utf-8">
</p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Verifier Verification Process:</span></span></p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your verifiers will need to click the logo on the PDF or upload the JSON file on&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://verification.ctuniversity.in/"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://verification.ctuniversity.in/</u></span></span></a><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> and proceed to pay a fee of ₹500, they will receive a one-time code which can be used multiple times during 15 days from date of receipt.&nbsp;</span></span></li>
    <li style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your verifiers can also click on the request an official email button after submitting the One-time code to receive an official email from the University confirming your credentials.</span></span></li>
</ul>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:10pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">If you encounter any difficulties or have questions regarding the Degree or the process. Please feel free to contact us at&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>[University number]</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> or&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>[University email address]</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">. We hope you find our innovative verification system beneficial.</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Thank you</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Best Regards</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Registrar</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">CT University</span></span></p>
<p><img class="image_resized" style="width:250px;" src="https://www.certonce.com/images/CTU/ct_fulllogo.png" ></p>
                  `;          
                  
                }
                const mailer_sendcertificate = require("../../config/mailer_sendcertificate_alumni");
                let logfilename=logfiledir+puserid+"/sendcertificate.log";
                let attachment_files = []; 
                
                if(smtpaccount['isoffice365']==undefined || smtpaccount['isoffice365']==null || smtpaccount['isoffice365']==0)
                {
                  attachment_files.push({path: jsonurl,filename:`${attachment_name}.json`});
                  attachment_files.push({path: pdfurl,filename:`${attachment_name}.pdf`});     
                }
                else
                {
                  let pdfBase64 = await fileToBase64(pdfurl);    
                  attachment_files.push({
                    "@odata.type": "#microsoft.graph.fileAttachment",
                    "Name": `${attachment_name}.pdf`,
                    "ContentType": "application/pdf",
                    "ContentBytes": pdfBase64,
                    "IsInline": false
                  });

                  let jsonBase64 = await fileToBase64(jsonurl);
                  attachment_files.push({
                    "@odata.type": "#microsoft.graph.fileAttachment",
                    "Name": `${attachment_name}.json`,
                    "ContentType": "application/json",
                    "ContentBytes": jsonBase64,
                    "IsInline": false
                  });
                }              
                let mailer_result = await mailer_sendcertificate(email_body, cert_email_subject, sendemail, smtpaccount, attachment_files, logfilename, cohorttablename, studentid);
                if (mailer_result.status == "400"){
                  const mailer_certonce = require("../../config/mailer_certonce");
                  let logfilename=logfiledir+puserid+"/sendcertificate.log";
                  let email_body = `<p style="color: black;">There is an error in sending certificates to ${sendemail}.</p>
                  <p style="color: black;">Error: ${JSON.stringify(mailer_result.message.response)}</p>`
                  let email_subject = "SendCertificate Result";
                  mailer_certonce(email_body, email_subject, contact_email, logfilename);
                  stop_flag = true;
                }
                else{
                  let updateQuery = format(`update student_input_data set status='1' where studentid='${studentid}'`);
                  console.log(updateQuery);
                  await pool.query(updateQuery);
                }
              }//if(sendemail&&signedcertificateurl&&certificaterevoked!=true)
            }        
          }
        }
        catch(err){
          console.log(err.message);
          const mailer_certonce = require("../../config/mailer_certonce");
          let logfilename=logfiledir+puserid+"/sendcertificate.log";
          let email_body = `<p style="color: black;">There is an error in sending certificates .</p>
          <p style="color: black;">Error: ${JSON.stringify(err.message)}</p>`
          let email_subject = "SendCertificate Result";
          mailer_certonce(email_body, email_subject, contact_email, logfilename);
          return;
        }
      } 
    }
  }
  catch(err){
    console.log(err.message);
    res.json({ Status: 400, message: err.message });
  }
}

user_1.getstudentinputdata = async (req, res, next) => {
  try {    
    var certtypes={"degree":"cohortmembers_degree","transcript":"cohortmembers_transcript","openbadges":"cohortmembers_openbadges","migration":"cohortmembers_degree","bonafide":"cohortmembers_degree","transfer":"cohortmembers_degree","relieving":"cohortmembers_degree","awards":"cohortmembers_degree","semesterwisegradecard":"cohortmembers_degree","medal":"cohortmembers_degree","or":"cohortmembers_degree"};
    var cohorttablename=certtypes[certtype];  
    var certtype = req.body.certtype;
    if(certtype && certtype!="" && certtype!=="null" && certtype!==undefined && certtype!=null) {
      cohorttablename=certtypes[certtype];
    }
    if(req.user.business_is_verified==false) {
      return res.json({Status: 400, message: "Your account is currently under verification, please contact certonce team."});
    }
    var permission=await getPermission(req.user.user_id,"getStudents");
    if(permission==false) {
      return res.json({Status: 400, message: "Access denied."});
    }
    var puserid=await getParentAccountIdFromId(req.user.user_id);
    var cohortId = '';
    var step = 'all';
    var mockData = [];
    var returnVal ;
    var cohortData=[];
    //cohortData = [{'label' : 'All', 'value' : 'all'}];
    //var cohortQuery = format(`select * from (select distinct on (cohortid) *  from cohort where accountid='${puserid}') as temptable order by id desc`);
    var cohortQuery = format(`select * from (select distinct on (c.cohortid) c.* from student_input_data f left join ${cohorttablename} b on CAST(f.studentid AS INTEGER)=b.id left join cohort c on b.cohortid=c.id where c.accountid='${puserid}') as temptable order by id desc`)
    var defaultCohort="";
    var cohortindex=0;
    var cohorts = await pool.query(cohortQuery);
    if ( cohorts.rowCount > 0 ) {
      for ( const row of cohorts.rows ) {
        if(cohortindex==0) defaultCohort=row['cohortid'];
        cohortData.push({'label' : row['name'], 'value' : row['cohortid']});
        cohortindex++;      
      }
    }
    console.log("cohortId = ", req.body.cohort);
    if (typeof req.body.cohort=="undefined" || req.body.cohort=="undefined" || req.body.cohort==undefined) {
      cohortId = defaultCohort;
      if(cohortId!="") {
        returnVal = await makeMockInputData(cohortId, step, req.body.searchValue, puserid, req.body.certtype, req.body.pageOffset,req.body.maxitemsperpage);
        if ( !isEmpty(returnVal) > 0 ) {
          mockData.push(returnVal);
        }
      }
    }
    else {
      cohortId = req.body.cohort;
      returnVal = await makeMockInputData(cohortId, step, req.body.searchValue, puserid, req.body.certtype, req.body.pageOffset,req.body.maxitemsperpage);
      if ( !isEmpty(returnVal) > 0 ) {
        mockData.push(returnVal);
      }
    }
    return res.json({ Status: 200, message: 'get students data successfully', Data: {"mockData":mockData,"cohortData":cohortData}, step: step });
  } catch (err) {
    console.log(err.message);
    return res.json({ Status: 400, message: err.message });
  }
}

async function makeMockInputData(cohort_id, step, searchValue,puserid, certtype, pageOffset, maxperpage, status="all") {
  var certtypes={"degree":"cohortmembers_degree","transcript":"cohortmembers_transcript","openbadges":"cohortmembers_openbadges","migration":"cohortmembers_degree","bonafide":"cohortmembers_degree","transfer":"cohortmembers_degree","relieving":"cohortmembers_degree","awards":"cohortmembers_degree","semesterwisegradecard":"cohortmembers_degree","medal":"cohortmembers_degree","or":"cohortmembers_degree"};
  var cohorttablename=certtypes[certtype];
  var whereClause = '';
  searchValue = searchValue.toString().trim();
  if(searchValue==""){
    whereClause =  "WHERE c.cohortid='"+ cohort_id +"' AND c.accountid='"+puserid+"' AND b.certificatetype='"+certtype+"'";
  }
  else {
    whereClause =  "WHERE c.cohortid='"+ cohort_id +"' AND (LOWER(a.firstname) like '%"+searchValue.toLowerCase()+"%' OR LOWER(a.middlename) like '%"+searchValue.toLowerCase()+"%' OR LOWER(a.lastname) like '%"+searchValue.toLowerCase()+"%' OR LOWER(a.emailaddress) like '%"+searchValue.toLowerCase()+"%' OR LOWER(a.phonenumber) like '%"+searchValue.toLowerCase()+"%' OR LOWER(a.studentid) like '%"+searchValue.toLowerCase()+"%' OR LOWER(b.onetimeblockcertscode) like '%"+searchValue.toLowerCase()+"%' OR LOWER(c.competencyname) like '%"+searchValue.toLowerCase()+"%')  AND c.accountid='"+puserid+"' AND b.certificatetype='"+certtype+"'";
  }
  if(puserid=="20122" || puserid=="25") {
    whereClause = `${whereClause} AND ispaid='yes'`
  }
  //console.log("aa====================="+whereClause);
  var totalPageCount=0;
  // var studentCountQuery = `SELECT count(a.id) as pagecount FROM student a LEFT JOIN ${cohorttablename} b ON b.studentid=a.id LEFT JOIN cohort c ON c.id=b.cohortid ${whereClause};`;
  var studentCountQuery = `SELECT count(a.id) as pagecount FROM student_input_data f LEFT JOIN ${cohorttablename} b on CAST(f.studentid AS INTEGER)=b.id LEFT JOIN student a ON b.studentid=a.id LEFT JOIN cohort c ON c.id=b.cohortid ${whereClause};`;
  console.log(studentCountQuery);
  var studentscount = await pool.query(studentCountQuery);
  if ( studentscount.rowCount > 0 ) {      
    for ( const studentcount of studentscount.rows ) {
      totalPageCount=studentcount['pagecount'];
    } 
  }
  var students = [];
  let chunkSize=50;
  if(maxperpage > chunkSize) {
    let tmpOffset = pageOffset;
    let tmpLimit = parseInt(tmpOffset) + parseInt(maxperpage);
    for (let i = tmpOffset; i < tmpLimit; i = parseInt(i) + parseInt(chunkSize)) {
      // const chunk = await fetchChunk(i, i + chunkSize);
      // process the chunk here
      var studentQuery = `SELECT f.*, c.*, f.name as studentname, f.studentid as cohortmemberid, b.publickey, b.onetimeblockcertscode, c.cohortid as maincohortid, a.studentid as mainstudentid FROM student_input_data f LEFT JOIN ${cohorttablename} b ON CAST(f.studentid AS INTEGER)=b.id LEFT JOIN  student a ON b.studentid=a.id LEFT JOIN cohort c ON c.id=b.cohortid ${whereClause} ORDER BY f.id ASC limit ${chunkSize} offset ${i};`;
      if ( certtype==="openbadges" ) {
        studentQuery = `SELECT f.*, c.*, f.name as studentname, f.studentid as cohortmemberid, b.publickey, b.onetimeblockcertscode, c.cohortid as maincohortid, a.studentid as mainstudentid FROM student_input_data f LEFT JOIN ${cohorttablename} b ON CAST(f.studentid AS INTEGER)=b.id LEFT JOIN student a LEFT JOIN ${cohorttablename} b ON b.studentid=a.id LEFT JOIN cohort c ON c.id=b.cohortid ${whereClause} ORDER BY f.id ASC limit ${chunkSize} offset ${i};`;
      }
      console.log("i = ",i, tmpLimit);
      console.log(studentQuery);                               
      let tmpStudents = await pool.query(studentQuery);
      if ( tmpStudents.rowCount > 0 ) {
        if(students.length == 0) {
          students = tmpStudents.rows;
        }
        else {
          students = students.concat(tmpStudents.rows);
        }
      }
    } 
  }
  else {
    var studentQuery = `SELECT f.*, c.*, f.name as studentname, f.studentid as cohortmemberid, b.publickey, b.onetimeblockcertscode, c.cohortid as maincohortid, a.studentid as mainstudentid FROM student_input_data f LEFT JOIN ${cohorttablename} b ON CAST(f.studentid AS INTEGER)=b.id LEFT JOIN  student a ON b.studentid=a.id LEFT JOIN cohort c ON c.id=b.cohortid ${whereClause} ORDER BY f.id ASC limit ${maxperpage} offset ${pageOffset};`;
    if(certtype==="openbadges") {
      studentQuery = `SELECT f.*, c.*, f.name as studentname, f.studentid as cohortmemberid, b.publickey, b.onetimeblockcertscode, c.cohortid as maincohortid, a.studentid as mainstudentid FROM student_input_data f LEFT JOIN ${cohorttablename} b ON CAST(f.studentid AS INTEGER)=b.id LEFT JOIN student a LEFT JOIN ${cohorttablename} b ON b.studentid=a.id LEFT JOIN cohort c ON c.id=b.cohortid ${whereClause} ORDER BY f.id ASC limit ${maxperpage} offset ${pageOffset};`;
    }
    console.log(studentQuery);                             
    let tmpStudents = await pool.query(studentQuery);   
    students = tmpStudents.rows;
  }
  var count = 0;
  var resultData = {};
  if ( students.length > 0 ) {
    resultData['children'] = [];
    resultData['height'] = 40;
    resultData['pagecount'] = totalPageCount;
    for ( const student of students ) {            
      if (count == 0) {
        var jsonData = {};
        jsonData['field1'] = student['name'];
        jsonData['field2'] = '';
        jsonData['field3'] = '';
        jsonData['field4'] = '';
        jsonData['field5'] = '';
        jsonData['field6'] = '';
        jsonData['field7'] = '';
        jsonData['field8'] = '';
        jsonData['field9'] = '';
        jsonData['field10'] = '';
        jsonData['field11'] = '';
        jsonData['field12'] = '';
        jsonData['field13'] = '';
        jsonData['cohortid'] = student['maincohortid'];
        jsonData['studentid'] = '';
        jsonData['is_child'] = false;
        jsonData['status'] = '';
        jsonData['is_validated'] = '';          
        resultData['data'] = jsonData;
      }
      var jsonData1 = {};
      var childData = {};
      jsonData1['field1'] = student['studentname'];      
      jsonData1['field2'] = student['emailaddress'];
      jsonData1['field3'] = student['publickey'];
      jsonData1['field4'] = student['onetimeblockcertscode']
      jsonData1['field5'] = student['status'];
      jsonData1['field6'] = student['other1'];
      jsonData1['field7'] = student['other2'];
      jsonData1['field8'] = student['other3'];  
      jsonData1['field9'] = student['mainstudentid'];
      jsonData1['field10'] = student['competencyname'];
      jsonData1['field11'] = student['other4'];
      jsonData1['field12'] = student['picturedata'];
      jsonData1['field13'] = student;
      jsonData1['cohortid'] = student['maincohortid'];
      // jsonData1['secondemailaddress'] = student['secondemailaddress'];
      jsonData1['studentid'] = student['cohortmemberid'];
      jsonData1['is_child'] = true;
      // if ((jsonData1['status'] == "Certificate issued" || jsonData1['status'] == "Baked") && student['hold']!=null && (student['hold'].toLowerCase() == "y" || student['hold'].toLowerCase() == "yes")) jsonData1['status'] = "Hold";
      childData['data'] = jsonData1;
      childData['height'] = 40;
      childData['pagecount'] = totalPageCount;
      resultData['children'].push(childData);
      childData = {};
      count++;
    }
  }
  return resultData;
}

user_1.sendemailByApi = async (req, res, next) => {
  try{
   
    var emailaddress = req.body.email;    
    var api_key = req.body.apikey;
    console.log("sendemailByApi=", emailaddress);
    if (api_key == "" || api_key == null || api_key == undefined) {
      var obj = {
        Status: 400,
        message: "Invalid API Key"
      };
      res.json(obj);
      return;
    }

    var userid = await getUserIDFromApiKey(api_key);
    if (userid == null) {
      var obj = {
        Status: 400,
        message: "Invalid api key"
      };
      res.json(obj);
      return;
    }
    var puserid = await getParentAccountIdFromId(userid);
    let logfilename=logfiledir+puserid+"/sendcertificate.log";
    
    let studentQuery = format(`select a.* from student a where a.accountid='${puserid}' and emailaddress='${emailaddress}'`);
    //let studentResult = await pool.query(studentQuery);
    //if (studentResult.rowCount > 0){
      let tmpname = [];
      /*
      let firstname = studentResult.rows[0].firstname;
      let middlename = studentResult.rows[0].middlename;
      let lastname = studentResult.rows[0].lastname;
      tmpname.push(firstname);
      
      if (middlename != null && middlename != "") tmpname.push(middlename);
      if (lastname != null && lastname != "") tmpname.push(lastname);
      let fullname = tmpname.join(" ");
      */
      let fullname ="Student";
        var smtpaccount = {
          'type' : true,
          'username' : "", 
          'clientid' : "",
          'clientsecret' : "",
          'refreshtoken' : "",
          'from': ""
        };
        
        var cc="";
        var contact_email = "";

        var querySmtp=format(`SELECT a.*, b.organization_name FROM setting a left join usermaster b on CAST(a.accountid AS INTEGER)=b.user_id where a.accountid='${puserid}';`);
        let smtpresult = await pool.query(querySmtp);        
        
        if(smtpresult && smtpresult.rowCount > 0){
          organization_name = smtpresult.rows[0].organization_name;
          smtpaccount['type'] = smtpresult.rows[0].smtptype;
          smtpaccount['host'] = smtpresult.rows[0].smtphost;
          smtpaccount['port'] = smtpresult.rows[0].smtpport;
          smtpaccount['username'] = smtpresult.rows[0].smtpusername;
          smtpaccount['password'] = smtpresult.rows[0].smtppassword;
          smtpaccount['from'] = smtpresult.rows[0].smtpfrom;
    
          smtpaccount['clientid'] = smtpresult.rows[0].smtpclientid;
          smtpaccount['clientsecret'] = smtpresult.rows[0].smtpclientsecret;
          smtpaccount['refreshtoken'] = smtpresult.rows[0].smtprefreshtoken;
    
          smtpaccount['isoffice365'] = smtpresult.rows[0].isoffice365;
          smtpaccount['office365accesstoken'] = smtpresult.rows[0].office365accesstoken;
          cc=smtpresult.rows[0].smtpcc;             
          contact_email = smtpresult.rows[0].contact_email;      
          if (contact_email == null || contact_email == undefined) contact_email = "";
          if (contact_email == "")
          {          
            const mailer_certonce = require("../../config/mailer_certonce");
            let email_subject = `Setting error`;            
            let email_body = `<p style="color: black;">Contact Email is not defined. Please set contact email in /My PROFILE/Setting/CONTACT INFORMATION</p>`;
            mailer_certonce(email_body, email_subject, contact_email, logfilename);
          }
        }
        var smtpcc=[];
        if(cc!="" && cc!=null && cc!==undefined)
        {              
          smtpcc.push(cc);
        }            
        if(smtpcc.length>0)
        {                  
          smtpaccount['cc']=smtpcc.join(",");
        }
      
        
        if(puserid == "20102" || puserid == "24") // gcu
        {
          const mailer_downloadcertificate = require("../../config/mailer_downloadcertificate");
          //////////mail to student/////////
          let email_subject = `How to Apply for Your Digital Blockchain Certificate - Garden City University`;
          let email_body=`<p>
    <meta charset="utf-8">
</p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Dear ${fullname},</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <meta charset="utf-8">
</p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <meta charset="utf-8">
</p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <meta charset="utf-8">
</p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">You have received this email because a Verifier has attempted to verify your Degree.</span></span></p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr">&nbsp;</p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <meta charset="utf-8">
</p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">You have received this email because a Verifier has attempted to verify your Degree.</span></span></p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Congratulations on being an alumnus of Garden City University! As a valued member of our alumni community, you are eligible to apply for your digital blockchain certificate. Below, we have outlined the process for applying online and provided key features of blockchain certificates for your reference:</span></span></p>
<p>&nbsp;</p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Process Overview:</span></span></p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">1. Click on the link: Visit https://verify.gardencity.university/#alumni to begin the application process.</span></span></p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">2. Fill in necessary details: Provide the required information in the application form.</span></span></p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">3. Upload your document: Attach a scanned copy of your document - If you are applying for a Degree please upload a scanned copy of your Degree.</span></span></p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">4. Submit request: Complete the submission process.</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:10pt;" dir="ltr">
    <meta charset="utf-8">
</p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">You will receive a confirmation email once your application is successfully submitted. Our team at Garden City University will then review and approve your request within 24 - 48 hours. On approval, you will receive an email with the Digital Smart PDF and the JSON file. You can share the Digital Smart PDF with the Verifier or request them to upload the JSON file on&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://verify.gardencity.university/"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://verify.gardencity.university</u></span></span></a><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">.</span></span></p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:10pt;" dir="ltr">&nbsp;</p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:10pt;" dir="ltr">
    <meta charset="utf-8">
</p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Verifier Verification Process:</span></span></p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your verifiers will need to click the logo on the PDF or upload the JSON file on&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://verify.gardencity.university/"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://verify.gardencity.university/</u></span></span></a><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> and proceed to pay a fee of ₹800, they will receive a one-time code which can be used multiple times during 15 days from date of receipt.&nbsp;</span></span></li>
    <li style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your verifiers can also click on the request an official email button after submitting the One-time code to receive an official email from the University confirming your credentials.</span></span></li>
</ul>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">If you have any questions or encounter any issues during the application process, please feel free to reach out to us at&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>[University Contact Email]</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> or&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>[Phone Number]</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">.</span></span></p>
<p>&nbsp;</p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Thank you for choosing Garden City University for your education.</span></span></p>
<p>&nbsp;</p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Best regards,</span></span></p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Registrar</span></span></p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Garden City University</span></span></p>
<p><img class="image_resized" style="width:9.79%;" src="https://www.certonce.com/images/GCU/gcu_logo.png"></p>
          `;          
          mailer_downloadcertificate(email_body, email_subject, emailaddress, smtpaccount, logfilename);
          console.log("puserid=", puserid);
          
        }
        else if(puserid == "20122" || puserid == "25") // rvce
        {
          const mailer_downloadcertificate = require("../../config/mailer_downloadcertificate");
          //////////mail to student/////////
          let email_subject = `How to Apply for Your Digital Blockchain Certificate - RV College of Engineering`;
          let email_body=`<p>
    <meta charset="utf-8">
</p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Dear ${fullname},</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">You have received this email because a Verifier has attempted to verify your Digital Credentials.</span></span></p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Congratulations on being an alumnus of RV College of Engineering! As a valued member of our alumni community, you are eligible to apply for your digital blockchain transcript certificate. Below, we have outlined the process for applying online and provided key features of blockchain certificates for your reference:</span></span></p>
<p>&nbsp;</p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Process Overview:</span></span></p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">1. Click on the link: Visit&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://documentverification.rvce.edu.in/#alumni"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://documentverification.rvce.edu.in/#alumni</u></span></span></a><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> to begin the application process.</span></span></p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">2. Fill in necessary details: Provide the required information in the application form.</span></span></p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">3. Upload your document: Attach a scanned copy of your ID</span></span></p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">4. Submit request: Complete the submission process.</span></span></p>
<p>&nbsp;</p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">You will receive a confirmation email once your application is successfully submitted. Our team at RV College of Engineering will then review and approve your request within 24 - 48 hours. On approval, you will receive an email with the Digital Smart PDF and the JSON file. You can share the Digital Smart PDF with the Verifier or request them to upload the JSON file on&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://documentverification.rvce.edu.in/"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://documentverification.rvce.edu.in/</u></span></span></a><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">&nbsp;</span></span></p>
<p>&nbsp;</p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:0pt;padding:10pt 0pt 0pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Verifier Verification Process:</span></span></p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your verifiers will need to click the logo on the PDF or upload the JSON file on&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://documentverification.rvce.edu.in/"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://documentverification.rvce.edu.in/</u></span></span></a><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">&nbsp; and proceed to pay a fee of ₹700, they will receive a one-time code which can be used multiple times during 15 days from date of receipt.&nbsp;</span></span></li>
    <li style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your verifiers can also click on the request an official email button after submitting the One-time code to receive an official email from the University confirming your credentials.</span></span></li>
</ul>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">If you have any questions or encounter any issues during the application process, please feel free to reach out to us at&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>[University Contact Email]</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> or&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>[Phone Number]</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">.</span></span></p>
<p>&nbsp;</p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Thank you for choosing RV College of Engineering for your education.</span></span></p>
<p>&nbsp;</p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Best regards,</span></span></p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Registrar</span></span></p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">RV College of Engineering</span></span></p>
<p><img class="image_resized" style="" src="https://www.certonce.com/images/RV/rv_whitelogo.png" width="150" height="150"></p>
          `;          
          mailer_downloadcertificate(email_body, email_subject, emailaddress, smtpaccount, logfilename);
          console.log("puserid=", puserid);
          
        }
        else if(puserid == "20123" || puserid == "23") // ctu
        {
          const mailer_downloadcertificate = require("../../config/mailer_downloadcertificate");
          //////////mail to student/////////
          let email_subject = `How to Apply for Your Digital Blockchain Certificate - CT University`;
          let email_body=`<p>
    <meta charset="utf-8">
</p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Dear ${fullname},</span></span>&nbsp;&nbsp;
    <meta charset="utf-8">
</p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <meta charset="utf-8">
</p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Congratulations on being an alumnus of CT University! As a valued member of our alumni community, you are eligible to apply for your digital blockchain certificate. Below, we have outlined the process for applying online and provided key features of blockchain certificates for your reference:</span></span></p>
<p>&nbsp;</p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <meta charset="utf-8">
</p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">You have received this email because a Verifier has attempted to verify your Degree.</span></span></p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Congratulations on being an alumnus of CT University! As a valued member of our alumni community, you are eligible to apply for your digital blockchain certificate. Below, we have outlined the process for applying online and provided key features of blockchain certificates for your reference:</span></span></p>
<p>&nbsp;</p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Process Overview:</span></span></p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">1. Click on the link: Visit&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://verification.ctuniversity.in/#alumni"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://verification.ctuniversity.in/#alumni</u></span></span></a><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> to begin the application process.</span></span></p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">2. Fill in necessary details: Provide the required information in the application form.</span></span></p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">3. Upload your document: Attach a scanned copy of your document - If you are applying for a Degree please upload a scanned copy of your Degree.</span></span></p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">4. Submit request: Complete the submission process.</span></span></p>
<p>&nbsp;</p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">You will receive a confirmation email once your application is successfully submitted. Our team at CT University will then review and approve your request within 24 - 48 hours. On approval, you will receive an email with the Digital Smart PDF and the JSON file. You can share the Digital Smart PDF with the Verifier or request them to upload the JSON file on&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://verification.ctuniversity.in/"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://verification.ctuniversity.in/</u></span></span></a><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">.&nbsp;</span></span></p>
<p>&nbsp;</p>
<p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:0pt;padding:10pt 0pt 0pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Verifier Verification Process:</span></span></p>
<ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
    <li style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your verifiers will need to click the logo on the PDF or upload the JSON file on&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://verification.ctuniversity.in/"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://verification.ctuniversity.in/</u></span></span></a><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> and proceed to pay a fee of ₹500, they will receive a one-time code which can be used multiple times during 15 days from date of receipt.&nbsp;</span></span></li>
    <li style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your verifiers can also click on the request an official email button after submitting the One-time code to receive an official email from the University confirming your credentials.</span></span></li>
</ul>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">If you have any questions or encounter any issues during the application process, please feel free to reach out to us at&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>[University Contact Email]</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> or&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>[Phone Number]</strong></span><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">.</span></span></p>
<p>&nbsp;</p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Thank you for choosing CT University for your education.</span></span></p>
<p>&nbsp;</p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Best regards,</span></span></p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Registrar</span></span></p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">CT University</span></span></p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr">&nbsp;</p>
<p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
    <meta charset="utf-8">
</p>
<p><img class="image_resized" src="https://www.certonce.com/images/CTU/ct_fulllogo.png" width="150px"></p>
          `;          
          mailer_downloadcertificate(email_body, email_subject, emailaddress, smtpaccount, logfilename);
          console.log("puserid=", puserid);
          
        }
        else if(puserid == "20091" || puserid == "30") // galgotias
        {
          const mailer_downloadcertificate = require("../../config/mailer_downloadcertificate");
          //////////mail to student/////////
          let email_subject = `How to Apply for Your Digital Blockchain Certificate - Galgotias University`;
          let email_body=`<p>
          <meta charset="utf-8">
      </p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Dear ${fullname},</span></span>&nbsp;
          <meta charset="utf-8">
      </p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
          <meta charset="utf-8">
      </p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Congratulations on being an alumnus of Galgotias University! As a valued member of our alumni community, you are eligible to apply for your digital blockchain certificate. Below, we have outlined the process for applying online and provided key features of blockchain certificates for your reference:</span></span></p>
      <p>&nbsp;</p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Process Overview:</span></span></p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">1. Click on the link: Visit https://certificates.galgotiasuniversity.edu.in/#alumni to begin the application process.</span></span></p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">2. Fill in necessary details: Provide the required information in the application form.</span></span></p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">3. Upload ID document: Attach a scanned copy of your Aadhaar card or driving license.</span></span></p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">4. Submit request: Complete the submission process.</span></span></p>
      <p>&nbsp;</p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">You will receive a confirmation email once your application is successfully submitted. Our team at Galgotias University will then review and approve your request within 24 hours. On approval, you will receive an email with the Digital Smart PDF and the JSON file. You can share the Digital Smart PDF with the Verifier or request them to upload the JSON file on&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://certificates.galgotiasuniversity.edu.in/"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://certificates.galgotiasuniversity.edu.in/</u></span></span></a></p>
      <p>&nbsp;</p>
      <p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:0pt;padding:10pt 0pt 0pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Verifier Verification Process:</span></span></p>
      <ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
          <li style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your verifiers will need to click the logo on the PDF or upload the JSON file on&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://certificates.galgotiasuniversity.edu.in/"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://certificates.galgotiasuniversity.edu.in/</u></span></span></a><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> to verify</span></span></li>
          <li style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your verifiers can also click on the request an official email button to receive an official email from the University confirming your credentials.</span></span></li>
      </ul>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">If you have any questions or encounter any issues during the application process, please feel free to reach out to us at [University Contact Email/Phone Number].</span></span></p>
      <p>&nbsp;</p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Thank you for choosing Galgotias University for your education.</span></span></p>
      <p>&nbsp;</p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Best regards,</span></span></p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Registrar</span></span></p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Galgotias University</span></span></p>
          `;          
          mailer_downloadcertificate(email_body, email_subject, emailaddress, smtpaccount, logfilename);
          console.log("puserid=", puserid);
          
        }
        else if(puserid == "20131" || puserid == "29") // snu
        {
          const mailer_downloadcertificate = require("../../config/mailer_downloadcertificate");
          //////////mail to student/////////
          let email_subject = `How to Apply for Your Digital Blockchain Certificate - Shiv Nadar Institution of Eminence`;
          let email_body=`<p>
          <meta charset="utf-8">
      </p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Dear ${fullname},</span></span>&nbsp;
          <meta charset="utf-8">
      </p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
          <meta charset="utf-8">
      </p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Congratulations on being an alumnus of Shiv Nadar Institution of Eminence! As a valued member of our alumni community, you are eligible to apply for your digital blockchain certificate. Below, we have outlined the process for applying online and provided key features of blockchain certificates for your reference:</span></span></p>
      <p>&nbsp;</p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Process Overview:</span></span></p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">1. Click on the link: Visit https://verification.snu.edu.in/#alumni to begin the application process.</span></span></p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">2. Fill in necessary details: Provide the required information in the application form.</span></span></p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">3. Upload ID document: Attach a scanned copy of your Aadhaar card or driving license.</span></span></p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">4. Submit request: Complete the submission process.</span></span></p>
      <p>&nbsp;</p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">You will receive a confirmation email once your application is successfully submitted. Our team at Shiv Nadar Institution of Eminence will then review and approve your request within 24 hours. On approval, you will receive an email with the Digital Smart PDF and the JSON file. You can share the Digital Smart PDF with the Verifier or request them to upload the JSON file on&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://verification.snu.edu.in/"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://verification.snu.edu.in</u></span></span></a></p>
      <p>&nbsp;</p>
      <p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:0pt;padding:10pt 0pt 0pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Verifier Verification Process:</span></span></p>
      <ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
          <li style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your verifiers will need to click the logo on the PDF or upload the JSON file on&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://verification.snu.edu.in/"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://verification.snu.edu.in</u></span></span></a><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> to verify</span></span></li>
          <li style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your verifiers can also click on the request an official email button to receive an official email from the University confirming your credentials.</span></span></li>
      </ul>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">If you have any questions or encounter any issues during the application process, please feel free to reach out to us at [University Contact Email/Phone Number].</span></span></p>
      <p>&nbsp;</p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Thank you for choosing Shiv Nadar Institution of Eminence for your education.</span></span></p>
      <p>&nbsp;</p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Best regards,</span></span></p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Registrar</span></span></p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Shiv Nadar Institution of Eminence</span></span></p>
          `;          
          mailer_downloadcertificate(email_body, email_subject, emailaddress, smtpaccount, logfilename);
          console.log("puserid=", puserid);
          
        }
        else if(puserid == "20103" || puserid == "32") // medicaps
        {
          const mailer_downloadcertificate = require("../../config/mailer_downloadcertificate");
          //////////mail to student/////////
          let email_subject = `How to Apply for Your Digital Blockchain Certificate - Medi-Caps University`;
          let email_body=`<p>
          <meta charset="utf-8">
      </p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Dear ${fullname},</span></span>&nbsp;
          <meta charset="utf-8">
      </p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
          <meta charset="utf-8">
      </p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Congratulations on being an alumnus of Medi-Caps University! As a valued member of our alumni community, you are eligible to apply for your digital blockchain certificate. Below, we have outlined the process for applying online and provided key features of blockchain certificates for your reference:</span></span></p>
      <p>&nbsp;</p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Process Overview:</span></span></p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">1. Click on the link: Visit https://verification.medicaps.ac.in/#alumni to begin the application process.</span></span></p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">2. Fill in necessary details: Provide the required information in the application form.</span></span></p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">3. Upload ID document: Attach a scanned copy of your Aadhaar card or driving license.</span></span></p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">4. Submit request: Complete the submission process.</span></span></p>
      <p>&nbsp;</p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">You will receive a confirmation email once your application is successfully submitted. Our team at Medi-Caps University will then review and approve your request within 24 hours. On approval, you will receive an email with the Digital Smart PDF and the JSON file. You can share the Digital Smart PDF with the Verifier or request them to upload the JSON file on&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://verification.medicaps.ac.in/"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://verification.medicaps.ac.in</u></span></span></a></p>
      <p>&nbsp;</p>
      <p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:0pt;padding:10pt 0pt 0pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Verifier Verification Process:</span></span></p>
      <ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
          <li style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your verifiers will need to click the logo on the PDF or upload the JSON file on&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://verification.medicaps.ac.in/"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://verification.medicaps.ac.in</u></span></span></a><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> to verify</span></span></li>
          <li style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your verifiers can also click on the request an official email button to receive an official email from the University confirming your credentials.</span></span></li>
      </ul>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">If you have any questions or encounter any issues during the application process, please feel free to reach out to us at [University Contact Email/Phone Number].</span></span></p>
      <p>&nbsp;</p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Thank you for choosing Medi-Caps University for your education.</span></span></p>
      <p>&nbsp;</p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Best regards,</span></span></p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Registrar</span></span></p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Medi-Caps University</span></span></p>
          `;          
          mailer_downloadcertificate(email_body, email_subject, emailaddress, smtpaccount, logfilename);
          console.log("puserid=", puserid);
          
        }
        else if(puserid == "20134" || puserid == "33") // apex
        {
          const mailer_downloadcertificate = require("../../config/mailer_downloadcertificate");
          //////////mail to student/////////
          let email_subject = `How to Apply for Your Digital Blockchain Certificate - Apex University`;
          let email_body=`<p>
          <meta charset="utf-8">
      </p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Dear ${fullname},</span></span>&nbsp;
          <meta charset="utf-8">
      </p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr">
          <meta charset="utf-8">
      </p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Congratulations on being an alumnus of Apex University! As a valued member of our alumni community, you are eligible to apply for your digital blockchain certificate. Below, we have outlined the process for applying online and provided key features of blockchain certificates for your reference:</span></span></p>
      <p>&nbsp;</p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Process Overview:</span></span></p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">1. Click on the link: Visit https://certificates.apexuniversity.co.in/#alumni to begin the application process.</span></span></p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">2. Fill in necessary details: Provide the required information in the application form.</span></span></p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">3. Upload ID document: Attach a scanned copy of your Aadhaar card or driving license.</span></span></p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">4. Submit request: Complete the submission process.</span></span></p>
      <p>&nbsp;</p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">You will receive a confirmation email once your application is successfully submitted. Our team at Apex University will then review and approve your request within 24 hours. On approval, you will receive an email with the Digital Smart PDF and the JSON file. You can share the Digital Smart PDF with the Verifier or request them to upload the JSON file on&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://certificates.apexuniversity.co.in/"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://certificates.apexuniversity.co.in</u></span></span></a></p>
      <p>&nbsp;</p>
      <p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:0pt;padding:10pt 0pt 0pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Verifier Verification Process:</span></span></p>
      <ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
          <li style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your verifiers will need to click the logo on the PDF or upload the JSON file on&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://certificates.apexuniversity.co.in/"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://certificates.apexuniversity.co.in</u></span></span></a><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> to verify</span></span></li>
          <li style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your verifiers can also click on the request an official email button to receive an official email from the University confirming your credentials.</span></span></li>
      </ul>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">If you have any questions or encounter any issues during the application process, please feel free to reach out to us at [University Contact Email/Phone Number].</span></span></p>
      <p>&nbsp;</p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Thank you for choosing Apex University for your education.</span></span></p>
      <p>&nbsp;</p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Best regards,</span></span></p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Registrar</span></span></p>
      <p style="line-height:1.3800000000000001;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Apex University</span></span></p>
          `;          
          mailer_downloadcertificate(email_body, email_subject, emailaddress, smtpaccount, logfilename);
          console.log("puserid=", puserid);
        }
    return res.json({Status: 200, message: "success"});
  }
  catch(err){
    return res.json({Status: 400, message: err.message});
  }
}

// Function to convert PDF page to image
async function pdfPageToImage(pdfPath, pageNumber, outputPath) {
  const options = { density: 300, saveFilename: outputPath, format: 'png' };
  const convert = fromPath(pdfPath, options);
  try {
    const result = await convert(pageNumber, {
      responseType: 'image',
    });
    return result;
  } catch (error) {
    console.error('Conversion error:', error);
  }
}

async function extractQrCodeContent(filePath) {
  const image = await Jimp.read(filePath);
  // Crop the image to get the QR code region
  const qrRegion = image.crop(300, 300, 400, 400);
  await qrRegion.writeAsync("./tmp/qrdata.png");
  const base64String = await qrRegion.getBase64Image();
  // Prepare the data for JSQR
  const data = qrRegion.bitmap.data;
  const width = qrRegion.bitmap.width;
  const height = qrRegion.bitmap.height;
  // Create a JSQR object
  const qr = new JSQR(data, width, height);
  // Check if a QR code was found
  if (!qr ||!qr.data) {
    console.log('No QR code found.');
    return "No QR code found.";
  }
  // Log the QR code content
  console.log('QR Code Content:', qr.data);
  return qr.data;
}

function os_func() { 
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
}

user_1.qrCodeFromPdf = async (req, res, next) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        console.error(err);
        return res.status(400).json({ Status: 400, message: err.message });
      }
      var { left, top, width, height } = req.body; // Accessing the additional parameters
      console.log(left, top, width, height); // Use these values as needed
      console.log(req.file); // Now req.file should be defined
      const pageNumber = 1;
      var os = new os_func();
      const inputFile = req.file.path;   
      const path = require('path'); 
      var basepath = path.dirname(inputFile); 
      const outputFile = `${basepath}/${req.file.filename.replace(/ /g,"_").replace(".pdf", ".png")}`;    
      fs.rename(`${inputFile}`, `${basepath}/${req.file.filename.replace(/ /g,"_")}`, function(err) {
        if (err) {
            console.error('Error renaming file:', err);
        } else {
            console.log('File renamed successfully');
        }
      });
      await os.execCommand(`gs -q -sPAPERSIZE=a4 -sDEVICE=pngalpha -dTextAlphaBits=4 -r400x400 -o ${outputFile} -dNOPAUSE -dBATCH  ${basepath}/${req.file.filename.replace(/ /g,"_")}`);
      const img = await Jimp.read(outputFile);
      const stepSize = parseInt(width); // Adjust based on expected QR code size
      let startX = 0;
      let startY = 0;
      let endX = Math.min(img.bitmap.width, img.bitmap.width - stepSize);
      let endY = Math.min(img.bitmap.height, img.bitmap.height - stepSize);
      let qr_code="";
      // Loop through the image with the sliding window
      while (startX <= endX && startY <= endY) {
        const window = img.clone().crop(startX, startY, endX, endY);
        const buffer = await window.getBufferAsync(Jimp.MIME_PNG);
        const base64String = buffer.toString('base64');
        // Attempt to decode the QR code from the current window
        const data = window.bitmap.data;
        const width_1 = window.bitmap.width;
        const height_1 = window.bitmap.height;
        const qr = new JSQR(data, width_1, height_1);
        if (qr && qr.data) {
          console.log('QR Code Content:', qr.data);
          var obj = {
            Status: 200,
            message: qr.data,
            qrcode_base64: "data:image/png;base64," + base64String
          };
          return res.json(obj);
          break; // Exit the loop once a QR code is found
        }
        startX += stepSize;
        endX -= stepSize;
        startY += stepSize;
        endY -= stepSize;
      }
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      if (fs.existsSync(outputFile)) {
        fs.unlinkSync(outputFile);
      }
      if (qr_code=="") {
        console.log('No QR code found.');
        return res.json({Status: 400, message: "No QR code found.", qrcode_base64: ""});
      }
      console.log('QR Code Content:', qr.data);
      return res.json({Status: 200, message: qr.data, qrcode_base64: "data:image/png;base64," + base64String});
    });
  } catch (err) {
    return res.json({Status: 400, message: err.message, qrcode_base64: ""});
  }
}

user_1.verifylog = async (req, res, next) => {
  try {
    var clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('Your IP address is ' + clientIp);    
    let documentid = req.body.documentid;
    if(documentid==null || documentid=="" || documentid==undefined) {
      return res.json({Status: 400, message: "Bad request."});
    }
    var certtypes = {"degree":"cohortmembers_degree","transcript":"cohortmembers_transcript","openbadges":"cohortmembers_openbadges","migration":"cohortmembers_degree","bonafide":"cohortmembers_degree","transfer":"cohortmembers_degree","relieving":"cohortmembers_degree","awards":"cohortmembers_degree","semesterwisegradecard":"cohortmembers_degree","medal":"cohortmembers_degree","or":"cohortmembers_degree"};
    for (const key1 in certtypes) {
      var tablenameforcerttype1 = certtypes[key1];
      let degreeQuery = format(`select a.studentid, a.firstname, a.middlename, a.lastname, a.emailaddress, b.accountid, b.cohortid, b.competencyname, c.signedcertificatepdfurl, c.signedcertificateurl, c.onetimeblockcertscode, c.certificatetype from ${tablenameforcerttype1} c left join student a on c.studentid=a.id left join cohort b on c.cohortid=b.id where c.signedcertificatepdfurl like '%${documentid}%'`);
      let degreeResult = await pool.query(degreeQuery);
      if (degreeResult.rowCount > 0){
        let studentid = degreeResult.rows[0].studentid;
        let puserid = degreeResult.rows[0].accountid;       
        let cohortid = degreeResult.rows[0].cohortid;  
        let emailaddress = degreeResult.rows[0].emailaddress;        
        let certificatetype = degreeResult.rows[0].certificatetype;        
        if (degreeResult.rows[0].firstname == null) degreeResult.rows[0].firstname = "";
        if (degreeResult.rows[0].middlename == null) degreeResult.rows[0].middlename = "";
        if (degreeResult.rows[0].lastname == null) degreeResult.rows[0].lastname = "";
        let fullname = `${degreeResult.rows[0].firstname} ${degreeResult.rows[0].middlename} ${degreeResult.rows[0].lastname}`.trim();
        let insertQuery = format(`insert into verifylog (name, accountid, cohortid, studentid, recordid, emailaddress, certificatetype, ipaddress) values ('${fullname}', '${puserid}', '${cohortid}', '${studentid}', '${documentid}','${emailaddress}','${certificatetype}','${clientIp}') returning id`);
        console.log(insertQuery);
        let insertResult = await pool.query(insertQuery);
        break;
      }
    }
    return res.json({Status: 200, message: "Success"});
  } catch (err) {
    return res.json({Status: 400, message: err.message});
  }
}

user_1.issueBalance = async (req, res, next) => {
  try {
    if (req.body && req.body.userId && parseInt(req.body.userId)) {
      let puserid = req.body.userId;
      var query = format(`SELECT * FROM wallet_pk where accountid=${parseInt(puserid)};`);
        var settingResult = await pool.query(query);
        if(settingResult.rows && settingResult.rows.length > 0) {
          const balances = settingResult.rows;
          let totalBalance = 0;
          for (const balance of balances) {
            if (balance.blockchain == "ethereum" && req.hostname == "www.certonce.com") {
              let res = await etherscanapi.account.balance(balance.publickey);
              if (res?.status && res?.result) {
                const ethPriceResponse = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
                if (ethPriceResponse.data.ethereum.usd) {
                  const ethToUsdRate = ethPriceResponse.data.ethereum.usd;
                  totalBalance = parseFloat(res?.result) * ethToUsdRate;
                  console.log("totalBalance" , totalBalance);
                }
              }
            } else if (balance.blockchain === "bitcoin" && req.hostname == "test.certonce.com") {
              totalBalance = 3;
            }
          }
          if (req.body.isTopUp) {
            let queryGetCustomer = format(`SELECT DISTINCT fname FROM usermaster where user_id = ${parseInt(puserid)};`);
            let getCustomerRes = await pool.query(queryGetCustomer);
            let customer = getCustomerRes.rows[0];
            let email_body = `<p style="font-style: 'Cambria'; color: black; margin-bottom: 0px;">Hi CertOnce Team,</p>
            <p style="color: black; font-style: 'Cambria'; margin-bottom: 0px; margin-top: 0px;">This is your CertPilot speaking, and we’ve got a situation that needs some attention!</p>
            <p style="color: black; font-style: 'Cambria'; margin-bottom: 0px; margin-top: 10px;">One of our valued customers has hit some turbulence and has low balance.</p>
            <p style="color: black; font-style: 'Cambria'; margin-bottom: 0px; margin-top: 0px;">Here are the details:</p>
            <p style="color: black; font-style: 'Cambria'; margin-bottom: 0px; margin-top: 0px;">Customer Name: ${getCustomerRes.fname}</p>
            <p style="color: black; font-style: 'Cambria'; margin-top: 10px;">Current Balance: ${totalBalance.toString()} (Note for Soup: This should be the customer’s ETH BALANCE)</p>
            <p style="color: black; font-style: 'Cambria'; margin-top: 10px;">Action Required: Top Up!</p>
            <p style="color: black; font-style: 'Cambria'; margin-top: 10px;">Let’s keep the engines running smoothly. </p>
            <p style="color: black; font-style: 'Cambria'; margin-bottom: 0px; margin-top: 10px;">Best regards,</p>
            <p style="color: black; font-style: 'Cambria'; margin-bottom: 0px; margin-top: 0px;">CertPilot</p>
            <p style="color: black; font-style: 'Cambria'; margin-bottom: 0px; margin-top: 0px;">Flying high with CertOnce</p>
            <p style="color: black; font-style: 'Cambria'; margin-top: 0px; margin-top: 12px;">P.S. Teamwork makes the dream work😉</p>
            <img src="https://www.certonce.com/images/certonce_logo_transparent.png" style="width: 350px;" />`;
            let email_subject = `CertPilot Alert: ${customer.fname} Low Balance - Time to Refuel!`;
            const contact_emails = ["rajesh.ranjan@certonce.com", "bernetta.lobo@certonce.com", "pramukh@certonce.com", "pawan.khurana@certonce.com", "aman.dhingra@certonce.com"];
            // const contact_emails = ["soup@certonce.com"];
            let smtpaccount = {'type' : true, 'username' : "", 'clientid' : "", 'clientsecret' : "", 'refreshtoken' : "", 'from': ""};
            var querySmtp = format(`SELECT a.*, b.organization_name FROM setting a left join usermaster b on CAST(a.accountid AS INTEGER)=b.user_id where a.accountid='${puserid}';`);
            let smtpresult = await pool.query(querySmtp);
            if(smtpresult && smtpresult.rowCount > 0){
              organization_name = smtpresult.rows[0].organization_name;
              smtpaccount['type'] = smtpresult.rows[0].smtptype;
              smtpaccount['host'] = smtpresult.rows[0].smtphost;
              smtpaccount['port'] = smtpresult.rows[0].smtpport;
              smtpaccount['username'] = smtpresult.rows[0].smtpusername;
              smtpaccount['password'] = smtpresult.rows[0].smtppassword;
              smtpaccount['from'] = smtpresult.rows[0].smtpfrom;
              smtpaccount['clientid'] = smtpresult.rows[0].smtpclientid;
              smtpaccount['clientsecret'] = smtpresult.rows[0].smtpclientsecret;
              smtpaccount['refreshtoken'] = smtpresult.rows[0].smtprefreshtoken;
              smtpaccount['isoffice365'] = smtpresult.rows[0].isoffice365;
              smtpaccount['office365accesstoken'] = smtpresult.rows[0].office365accesstoken;
              cc=smtpresult.rows[0].smtpcc;
            }
            for (const contact_email of contact_emails) {
              await utils.sendEmail(email_body, email_subject, contact_email, smtpaccount, puserid, "mailer_downloadcertificate", false);
            }
          }
          return res.json({Status: 200, message: "success", balance: totalBalance});
        }
        else {
          return res.json({Status: 403, message: "Invalid user id", balance: -3});
        }
    } else {
      return res.json({Status: 403, message: "Invalid parameters", balance: -2});
    }
  } catch (err) {
    console.log("issueBalance err = : ", err.message);
    return res.json({Status: 503, message: "Bad request", balance: -1});
  }
}

module.exports = user_1;