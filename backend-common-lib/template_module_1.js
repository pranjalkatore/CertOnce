require("dotenv").config(); 
var myip="https://www.certonce.com";
var wwwdir="/var/www/html";
const { Poppler } = require("node-poppler");
var IMAGES = require("images");
var fs = require('fs');
const axios = require('axios');
const qs = require('qs');
const pool = require('../../config/database');
const format = require('pg-format');
const logfiledir="/home/ubuntu/logs/";
const DOWNLOAD_ZIP_PATH = "/var/www/html/download/";
const DOWNLOAD_TEMP_PATH = "/tmp/download_certificate/";
const QRCode = require("qrcode");
const fsExtra = require('fs-extra');
const extfs = require('extfs');
var AdmZip = require("adm-zip");
const { PDFDocument } = require('pdf-lib');
const { createCanvas, loadImage, Canvas, Image } = require("canvas");
var verifier_url_direct=myip+subwwwurl+"/verify/";
var wwwdir="/var/www/html";
var subwwwurl="";


function convert_titlecase(sentence){
    let regex = /(^|\b(?!(and?|in?|at?|the|for|to|but|by|is)\b))\w+/g;
    //console.log(output); 
    return sentence.toLowerCase().replace(regex, s => s[0].toUpperCase() + s.slice(1));
}

const exec = require('child_process').exec;
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

async function convertPdf2Png(pdffilepath, resolution=300)
{
  while(true)
  {
    try{
      var os = new os_func();
      var path = require('path');
      var encodedurl="";
      var searchtext = path.basename(pdffilepath);  
      searchtext = searchtext.replace(".pdf","");
      var parentDir = path.dirname(pdffilepath); 
      var pngfilepath=pdffilepath.replace(".pdf","_%03d.png");
      
      
      await os.execCommand(`gs -q -sPAPERSIZE=a4 -sDEVICE=png16m -dTextAlphaBits=4 -r${resolution}X${resolution} -o ${pngfilepath} -dNOPAUSE -dBATCH  ${pdffilepath}`);
      
      var files=await getFiles(parentDir,".png", searchtext);
      
      for(var i=0; i<files.length;i++)
      { 
        if(i==0)
        {  
          encodedurl=await base64_encode(files[i]);  
        }
        else
        {
          encodedurl=encodedurl + "<br>" + await base64_encode(files[i]); 
        }
        if (fs.existsSync(files[i]))
        {
          fs.unlinkSync(files[i]);
        } 
      }  
      
      return encodedurl;
    }
    catch(ex)
    {
      console.log(ex);
      await sleep(10000);
    }
  }
}
async function base64_encode(file) {
    // read binary data
    
    var bitmap = fs.readFileSync(file);
      // convert binary data to base64 encoded string
    var encodedurl='<img style="width:100%;" src="data:image/png;base64,'+new Buffer.from(bitmap).toString('base64')+'" />';  
      //var encodedurl='<img style="width:100%;" src="e" />';  
      //encodedurl=encodedurl.replace(/"/g,'\\"'); 
    return encodedurl;
}

function getFiles (dir, searchext, searchname, files_){
    
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            if(name.indexOf(searchext)!==-1 && name.indexOf(searchname)!==-1) 
              files_.push(name);
        }
    }
    return files_;
}

function Convert_to_Kritidev(unicode_text_var) {

    var array_one = new Array(
        // ignore all nuktas except in ड़ and ढ़
        "‘", "’", "“", "”", "(", ")", "{", "}", "=", "।", "?", "-", "µ", "॰", ",", ".", "् ",
        "०", "१", "२", "३", "४", "५", "६", "७", "८", "९", "x",
  
        "फ़्", "क़", "ख़", "ग़", "ज़्", "ज़", "ड़", "ढ़", "फ़", "य़", "ऱ", "ऩ",    // one-byte nukta varNas
        "त्त्", "त्त", "क्त", "दृ", "कृ",
  
        "ह्न", "ह्य", "हृ", "ह्म", "ह्र", "ह्", "द्द", "क्ष्", "क्ष", "त्र्", "त्र", "ज्ञ",
        "छ्य", "ट्य", "ठ्य", "ड्य", "ढ्य", "द्य", "द्व",
        "श्र", "ट्र", "ड्र", "ढ्र", "छ्र", "क्र", "फ्र", "द्र", "प्र", "ग्र", "रु", "रू",
        "्र",
  
        "ओ", "औ", "आ", "अ", "ई", "इ", "उ", "ऊ", "ऐ", "ए", "ऋ",
  
        "क्", "क", "क्क", "ख्", "ख", "ग्", "ग", "घ्", "घ", "ङ",
        "चै", "च्", "च", "छ", "ज्", "ज", "झ्", "झ", "ञ",
  
        "ट्ट", "ट्ठ", "ट", "ठ", "ड्ड", "ड्ढ", "ड", "ढ", "ण्", "ण",
        "त्", "त", "थ्", "थ", "द्ध", "द", "ध्", "ध", "न्", "न",
  
        "प्", "प", "फ्", "फ", "ब्", "ब", "भ्", "भ", "म्", "म",
        "य्", "य", "र", "ल्", "ल", "ळ", "व्", "व",
        "श्", "श", "ष्", "ष", "स्", "स", "ह",
  
        "ऑ", "ॉ", "ो", "ौ", "ा", "ी", "ु", "ू", "ृ", "े", "ै",
        "ं", "ँ", "ः", "ॅ", "ऽ", "् ", "्")
  
    var array_two = new Array(
  
        "^", "*", "Þ", "ß", "¼", "½", "¿", "À", "¾", "A", "\\", "&", "&", "Œ", "]", "-", "~ ",
        "å", "ƒ", "„", "…", "†", "‡", "ˆ", "‰", "Š", "‹", "Û",
  
        "¶", "d", "[k", "x", "T", "t", "M+", "<+", "Q", ";", "j", "u",
        "Ù", "Ùk", "ä", "–", "—",
  
        "à", "á", "â", "ã", "ºz", "º", "í", "{", "{k", "«", "=", "K",
        "Nî", "Vî", "Bî", "Mî", "<î", "|", "}",
        "J", "Vª", "Mª", "<ªª", "Nª", "Ø", "Ý", "æ", "ç", "xz", "#", ":",
        "z",
  
        "vks", "vkS", "vk", "v", "bZ", "b", "m", "Å", ",s", ",", "_",
  
        "D", "d", "ô", "[", "[k", "X", "x", "?", "?k", "³",
        "pkS", "P", "p", "N", "T", "t", "÷", ">", "¥",
  
        "ê", "ë", "V", "B", "ì", "ï", "M", "<", ".", ".k",
        "R", "r", "F", "Fk", ")", "n", "/", "/k", "U", "u",
  
        "I", "i", "¶", "Q", "C", "c", "H", "Hk", "E", "e",
        "¸", ";", "j", "Y", "y", "G", "O", "o",
        "'", "'k", "\"", "\"k", "L", "l", "g",
  
        "v‚", "‚", "ks", "kS", "k", "h", "q", "w", "`", "s", "S",
        "a", "¡", "%", "W", "·", "~ ", "~")   // "~j"
  
    //************************************************************
    //Put "Enter chunk size:" line before "<textarea name= ..." if required to be used.    
    //************************************************************
    //Enter chunk size: <input type="text" name="chunksize" value="6000" size="7" maxsize="7" style="text-align:right"><br/><br/>
    //************************************************************
    // The following two characters are to be replaced through proper checking of locations:
  
    // "र्" (reph) 
    // "Z" )
  
    // "ि"  
    // "f" )
  
  
    var array_one_length = array_one.length;
  
    var modified_substring = unicode_text_var;
  
    //****************************************************************************************
    //  Break the long text into small bunches of max. max_text_size  characters each.
    //****************************************************************************************
    var text_size = unicode_text_var.length;
  
    var processed_text = '';  //blank
  
    var sthiti1 = 0; var sthiti2 = 0; var chale_chalo = 1;
  
    var max_text_size = 6000;
  
    //************************************************************
    // var max_text_size = chunksize;	
    // alert(max_text_size);
    //************************************************************
  
    while (chale_chalo == 1) {
        sthiti1 = sthiti2;
  
        if (sthiti2 < (text_size - max_text_size)) {
            sthiti2 += max_text_size;
            while (unicode_text_var.charAt(sthiti2) != ' ') { sthiti2--; }
        }
        else { sthiti2 = text_size; chale_chalo = 0 }
  
        var modified_substring = unicode_text_var.substring(sthiti1, sthiti2);
  
        Replace_Symbols();
  
        processed_text += modified_substring;
  
        //****************************************************************************************
        //  Breaking part code over
        //****************************************************************************************
        //  processed_text = processed_text.replace( /mangal/g , "Krutidev010" ) ;   
  
        legacy_text_var = processed_text;
        
    }
    legacy_text_var = legacy_text_var.replace(/‚/g, "kW");
    legacy_text_var = legacy_text_var.replace(/"/g, "TOP_DOUBLE_DOT");
    return legacy_text_var;
    //**************************************************
  
    function Replace_Symbols() {
  
  
        // if string to be converted is non-blank then no need of any processing.
        if (modified_substring != "") {
  
            // first replace the two-byte nukta_varNa with corresponding one-byte nukta varNas.
  
            modified_substring = modified_substring.replace(/क़/, "क़");
            modified_substring = modified_substring.replace(/ख़‌/g, "ख़");
            modified_substring = modified_substring.replace(/ग़/g, "ग़");
            modified_substring = modified_substring.replace(/ज़/g, "ज़");
            modified_substring = modified_substring.replace(/ड़/g, "ड़");
            modified_substring = modified_substring.replace(/ढ़/g, "ढ़");
            modified_substring = modified_substring.replace(/ऩ/g, "ऩ");
            modified_substring = modified_substring.replace(/फ़/g, "फ़");
            modified_substring = modified_substring.replace(/य़/g, "य़");
            modified_substring = modified_substring.replace(/ऱ/g, "ऱ");
  
  
            // code for replacing "ि" (chhotee ee kii maatraa) with "f"  and correcting its position too.
  
            var position_of_f = modified_substring.indexOf("ि");
            while (position_of_f != -1)  //while-02
            {
                var character_left_to_f = modified_substring.charAt(position_of_f - 1);
                modified_substring = modified_substring.replace(character_left_to_f + "ि", "f" + character_left_to_f);
  
                position_of_f = position_of_f - 1;
  
                while ((modified_substring.charAt(position_of_f - 1) == "्") & (position_of_f != 0)) {
                    var string_to_be_replaced = modified_substring.charAt(position_of_f - 2) + "्";
                    modified_substring = modified_substring.replace(string_to_be_replaced + "f", "f" + string_to_be_replaced);
  
                    position_of_f = position_of_f - 2;
                }
                position_of_f = modified_substring.search(/ि/, position_of_f + 1); // search for f ahead of the current position.
  
            } // end of while-02 loop
            //************************************************************     
            //     modified_substring = modified_substring.replace( /fर्/g , "£"  )  ;
            //************************************************************     
            // Eliminating "र्" and putting  Z  at proper position for this.
  
            set_of_matras = "ािीुूृेैोौं:ँॅ"
  
            modified_substring += '  ';  // add two spaces after the string to avoid UNDEFINED char in the following code.
  
            var position_of_half_R = modified_substring.indexOf("र्");
            while (position_of_half_R > 0)  // while-04
            {
                // "र्"  is two bytes long
                var probable_position_of_Z = position_of_half_R + 2;
  
                var character_right_to_probable_position_of_Z = modified_substring.charAt(probable_position_of_Z + 1)
  
                // trying to find non-maatra position right to probable_position_of_Z .
  
                while (set_of_matras.indexOf(character_right_to_probable_position_of_Z) != -1) {
                    probable_position_of_Z = probable_position_of_Z + 1;
                    character_right_to_probable_position_of_Z = modified_substring.charAt(probable_position_of_Z + 1);
                } // end of while-05
  
                string_to_be_replaced = modified_substring.substr(position_of_half_R + 2, (probable_position_of_Z - position_of_half_R - 1));
                modified_substring = modified_substring.replace("र्" + string_to_be_replaced, string_to_be_replaced + "Z");
                position_of_half_R = modified_substring.indexOf("र्");
            } // end of while-04
  
  
            modified_substring = modified_substring.substr(0, modified_substring.length - 2);
  
  
  
            //substitute array_two elements in place of corresponding array_one elements
  
            for (input_symbol_idx = 0; input_symbol_idx < array_one_length; input_symbol_idx++) {
                idx = 0;  // index of the symbol being searched for replacement
  
                while (idx != -1) //whie-00
                {
                    modified_substring = modified_substring.replace(array_one[input_symbol_idx], array_two[input_symbol_idx])
                    idx = modified_substring.indexOf(array_one[input_symbol_idx])
                } // end of while-00 loop
            } // end of for loop
  
        } // end of IF  statement  meant to  supress processing of  blank  string.
  
    } // end of the function  Replace_Symbols( )
    
    
}

function increaseFont(text)
{
  fontSizes=[11,12,12,13];
  const lastFourChars = text.slice(-4); // Get the last 4 characters
  const formattedText = [];
  formattedText.push(text.slice(0, -4));

  for (let i = 0; i < lastFourChars.length; i++) {
    const char = lastFourChars[i];
    const size = fontSizes[i];
    if(i==0 || i==2)
    {
        formattedText.push(`<span style="font-size: ${size}pt;margin-left:0px;">${char}</span>`);
    }
    else if(i==1)
    {
        formattedText.push(`<span style="font-size: ${size}pt;margin-left:1px;">${char}</span>`);
    }
    else
    {
        formattedText.push(`<span style="font-size: ${size}pt;margin-left:2px;">${char}</span>`);
    }
    
  }
  console.log(formattedText.join(''));
  return formattedText.join('');
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
    console.log(err);
    return false;   
   }    
}
function sleep(ms) {  
    return new Promise(resolve => setTimeout(resolve, ms));
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
async function getProfileFromAccountId(accountId)
{
  var profileInfo={};
  var query = format(`SELECT * FROM setting where accountid='${accountId}';`);    
  var settingresult=await pool.query(query);      
  if(settingresult.rows && settingresult.rows.length != 0) {
    profileInfo=settingresult.rows[0];
  }
  return profileInfo;
}
async function getQRwithbase64(code, width, write=false) {  
    const canvas = createCanvas(width, width);
    QRCode.toCanvas(
      canvas,
      code,
      {
        errorCorrectionLevel: "H",
        margin: 1,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      }
    );
    // console.log(canvas.toDataURL("image/png"));
    let result = canvas.toDataURL("image/png");
    
    return result;
}

async function fileToBase64(url) {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(response.data, 'binary').toString('base64');
}



module.exports = {
    formatDateString: function(dateStr, type = "Month DD, YYYY") {
        console.log("dateStr", dateStr);
        console.log("type", type);
        // Format the date as "DD Month YYYY"
        const date = new Date(dateStr);
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let day = date.getDate();
        const month = monthNames[date.getMonth()]; // getMonth() returns 0-11
        const year = date.getFullYear();
        if ( type === "Month DD, YYYY" ) {
            return `${month} ${day}, ${year}`;
        } else if ( type == "DD Month YYYY" ) {
            if (day.toString().length == 1) day = "0" + day.toString();
            return `${day} ${month} ${year}`;
        } else if ( type == "dd-MMM-yyyy") {
            console.log("Current", `${day}-${month.substring(0, 3)}-${year}`);
            return `${day}-${month.substring(0, 3)}-${year}`;
        } else if ( type == "CURRENT_TIMESTAMP") {
            let isoString = date.toISOString().replace('T', ' ').replace('Z', '+00');
            console.log("Current", isoString.replace(/\.\d+/, match => match.padEnd(7, '0')));
            return isoString.replace(/\.\d+/, match => match.padEnd(7, '0'));
        }
    },
    sendcertificate: async function(req, res, next)
    {
        console.log("@@@@@@@@@@@@- sendcertificate start");
        const path = require('path');
        try {
            if(req.user.business_is_verified==false)
            {
                res.json({Status: 400, message: "Your account is currently under verification, please contact certonce team."});
                return;
            }
            var permission=await getPermission(req.user.user_id,"sendCertificate");
            if(permission==false)
            {
                res.json({ Status: 400, message: "Access denied."});
                return;
            }        
            var os = new os_func(); 
            var params = req.body.selectedItems;
            var certtype=req.body.certtype;
            var isdownload=req.body.isdownload;
            var receive_email = req.body.email;
            var certtypes={"degree":"cohortmembers_degree","transcript":"cohortmembers_transcript","openbadges":"cohortmembers_openbadges","migration":"cohortmembers_degree","bonafide":"cohortmembers_degree","transfer":"cohortmembers_degree","relieving":"cohortmembers_degree","awards":"cohortmembers_degree","semesterwisegradecard":"cohortmembers_degree","medal":"cohortmembers_degree","or":"cohortmembers_degree"};
            var cohorttablename="cohortmembers_degree";
            if(certtype && certtype!="" && certtype!=="null" && certtype!==undefined && certtype!=null)
            {      
              cohorttablename=certtypes[certtype];
            }
            else certtype="degree";
            if(isdownload && isdownload!="" && isdownload!=="null" && isdownload!==undefined && isdownload!=null)
            {      
              isdownload=req.body.isdownload;
            }
            var currentUser = req.user;  
            var organization_name=currentUser.organization_name;
            var organization_verify_uri=currentUser.organization_verify_uri;
            if(organization_verify_uri==""||organization_verify_uri=="null"||organization_verify_uri==null|| organization_verify_uri==undefined) organization_verify_uri="certonce";
            var puserid=await getParentAccountIdFromId(req.user.user_id);
            //////////smtp information/////////
            var smtpaccount = { 'type': true, 'username': "", 'clientid': "", 'clientsecret': "", 'refreshtoken': "", 'from': ""};
            var smtphost="";
            var smtpport="";
            var smtpusername="";
            var smtppassword="";
            var smtpfrom="";
            var cc="";
            var contact_email = "";
            var s_baseurl = "";
            var s_issuerurl = "";
            var s_revocationurl = "";
            var s_issuername = "";
            var s_issueremail = "";
            var s_verifybaseurl = "";
        
            var settingInfo = await getProfileFromAccountId(puserid);    
            s_baseurl = settingInfo.baseurl;
            s_issuerurl = settingInfo.issuerurl;
            s_revocationurl = settingInfo.revocationurl;
            s_issuername = settingInfo.issuername;
            s_issueremail = settingInfo.issueremail;
            s_verifybaseurl = settingInfo.verifybaseurl;      
            
            smtpaccount['id'] = puserid;
            smtpaccount['type'] = settingInfo.smtptype;
            smtpaccount['host'] = settingInfo.smtphost;
            smtpaccount['port'] = settingInfo.smtpport;
            smtpaccount['username'] = settingInfo.smtpusername;
            smtpaccount['password'] = settingInfo.smtppassword;
            smtpaccount['from'] = settingInfo.smtpfrom;
            smtpaccount['clientid'] = settingInfo.smtpclientid;
            smtpaccount['clientsecret'] = settingInfo.smtpclientsecret;
            smtpaccount['refreshtoken'] = settingInfo.smtprefreshtoken;
            smtpaccount['isoffice365'] = settingInfo.isoffice365;
            smtpaccount['office365clientid'] =settingInfo.office365clientid;
            smtpaccount['office365clientsecret'] =settingInfo.office365clientsecret;
            smtpaccount['office365tanentid'] =settingInfo.office365tanentid;
            smtpaccount['office365accesstoken'] =settingInfo.office365accesstoken;
            smtpaccount['office365refreshtoken'] =settingInfo.office365refreshtoken;

            cc=settingInfo.smtpcc;
            contact_email = settingInfo.contact_email;
            if (contact_email == null || contact_email == undefined) contact_email = "";
        
            if(contact_email=="") {
              res.json({Status: 400, message: 'Contact Email is not defined. Please set contact email in /My PROFILE/Setting/CONTACT INFORMATION ',});
              return;
            }
            ///////////////////////////////////
            ///checking download///
            if(isdownload==true)
            {
                console.log("@@@@@@@@@@@@ - is download ",isdownload);
              var downloadjson = req.body.downloadjson;
              var downloadpdf = req.body.downloadpdf;
              var downloadprint = req.body.downloadprint;
              var downloadqrcode = req.body.downloadqrcode;
              var downloadtype = req.body.downloadtype;
              var downloadIitems=[];
              var os = new os_func();
              let download_category = ['pdf', 'json', 'uuidjson', 'print', 'qrcode'];
              for (let index = 0; index < download_category.length; index ++){
                let temp_path = `${DOWNLOAD_TEMP_PATH}${puserid}/${download_category[index]}`;
                if (!fs.existsSync(temp_path))
                {
                    await os.execCommand('sudo mkdir -p "'+temp_path+'"');
                    await os.execCommand('sudo chmod -R 777 "'+temp_path+'"');
                }
                var empty = extfs.isEmptySync(temp_path);
                if(empty == false) {
                  res.json({Status: 400, message: 'Same account is downloading now.'});
                  return;
                }
              }  
              var clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
              console.log('Your IP address is ' + clientIp);
              let ipQuery = format(`INSERT INTO activitylog (activity,ipaddress,userid) values ('downloadcertificate (${params.length} students are selected)','${clientIp}','${puserid}');`);
              await pool.query(ipQuery);
              
              res.json({ Status: 200, message: 'Please wait the certificates data is being downloaded , on completion you will receive an email with zip file.' });
              try{
                for (let index = 0; index < params.length; index++) {
                  const element = params[index];
                  let cohortid=element.split("=")[0];
                  let studentid=element.split("=")[1];
                  console.log("cohortid="+cohortid+",studentid="+studentid);
                  ///////////////////////////////////////////
                  if ( cohortid == '' || studentid == '') {continue;}
                  var whereClause = "";
                  if (downloadtype == "select")  whereClause = "WHERE c.cohortid='"+ cohortid +"' and b.id='"+studentid+"' and c.accountid='"+puserid+"' and e.accountid='"+puserid+"';";
                  else if (downloadtype == "all") whereClause = "WHERE c.cohortid='"+ cohortid +"' and c.accountid='"+puserid+"' and e.accountid='"+puserid+"';";
                  var studentQuery = format(`SELECT a.studentid as mainstudentid, a.*, c.*,b.*,d.* FROM student a 
                                                LEFT JOIN ${cohorttablename} b ON b.studentid=a.id 
                                                LEFT JOIN cohort c ON c.id=b.cohortid 
                                                LEFT JOIN cohort_group e ON e.cohortid=c.cohortid 
                                                LEFT JOIN certtemplate d ON d.id=e.certtemplateid ${whereClause}`);
                  let students = await pool.query(studentQuery);            
                  if ( students.rowCount > 0 ) {                            
                    for ( const student of students.rows ) {              
                      var signedcertificateurl = student['signedcertificateurl'];
                      var signedcertificatepdfurl = student['signedcertificatepdfurl'];
                      var unsignedcertificateurl = student['unsignedcertificateurl'];
                      var certificationcategory = student['certificationcategory'];
                      var email_sub = student['emailaddress'].split("@")[0];
                      var printpdf = student['printpdf'];
                      if(printpdf == null || printpdf == undefined) printpdf = "";
                      var qrcodeurl = student['qrcodepath'];
                      var mainstudentid = student['mainstudentid'];
                      var certificaterevoked = student['certificaterevoked'];
                      var rollnumber = student['mainstudentid'];
                      var semesternumber = student['semesternumber'];
                      
                      if (student['unsignedcertificateurl'] == null) student['unsignedcertificateurl'] = "";
                      if (student['firstname'] == null) student['firstname'] = "";
                      if (student['middlename'] == null) student['middlename'] = "";
                      if (student['lastname'] == null) student['lastname'] = "";
                      var fullname = `${student['firstname']} ${student['middlename'].trim()} ${student['lastname'].trim()}`.trim();
                      var competency_name=student['competencyname'];
                      var attachment_name = fullname + "_" + mainstudentid;//competency_name; 
                      attachment_name = attachment_name.replace(/ /g, "_");
          
                      if (student['hold']!=null && (student['hold'].toLowerCase() == "y" || student['hold'].toLowerCase() == "yes")) continue;
                      if(signedcertificateurl==null||signedcertificateurl=="") continue;
                      if(signedcertificatepdfurl==null||signedcertificatepdfurl=="") continue;
                      
                      var jsonurl=myip+subwwwurl+"/certificatejson/";
                      var pdfurl=myip+subwwwurl+"/certificatepdf/";
          
                      var lastelement=signedcertificateurl.split("/")[signedcertificateurl.split("/").length-1];//signedcertificateurl.split("/").pop();
                      var jsoncollegeid=signedcertificateurl.split("/")[signedcertificateurl.split("/").length-2];//signedcertificatepdfurl.split("/").pop();
                      var pdflastelement=signedcertificatepdfurl.split("/")[signedcertificatepdfurl.split("/").length-1];//signedcertificatepdfurl.split("/").pop();
                      var pdfcollegeid=signedcertificatepdfurl.split("/")[signedcertificatepdfurl.split("/").length-2];//signedcertificatepdfurl.split("/").pop();
                      
                      var verifyid=lastelement.replace(".json","");
                      var pdfid=pdflastelement.replace(".pdf","");
                      
                      var downloadpdfname = `${fullname}_${mainstudentid}`.replace(/ /g, "_").replace(/\//g, "_");
                      var downloadjsonname = `${fullname}_${mainstudentid}`.replace(/ /g, "_").replace(/\//g, "_");
                      var downloadjsonuuidname = verifyid;
                      var downloadprintpdfname = `${fullname}_${mainstudentid}`.replace(/ /g, "_").replace(/\//g, "_");
                      var qrcodename = `${fullname}_${mainstudentid}`.replace(/ /g, "_").replace(/\//g, "_");
                      pdfurl=`${pdfurl}${pdfcollegeid}/${pdfid}`;
                      jsonurl=`${jsonurl}${jsoncollegeid}/${verifyid}`;
                      //  console.log("signedcertificateurl=",signedcertificateurl);
                      //  console.log("signedcertificatepdfurl=",signedcertificatepdfurl);
                      //  console.log("printpdf=",student['printpdf']);
                      if(puserid == "20001")
                      {
                        //pdfurl=`https://certification.mitwpu.edu.in/pdf/${pdfid}`;
                        //jsonurl=`https://certification.mitwpu.edu.in/certificate/${verifyid}`;
                        if(signedcertificateurl.toLowerCase().indexOf("m22")!==-1)
                        {   
                          pdfurl=`https://certification.mitwpu.edu.in/pdf/M22/${pdfid}`;
                          jsonurl=`https://certification.mitwpu.edu.in/certificate/M22/${verifyid}`;
                        }
                      }              
                      else if(puserid == "20021")
                      {
                        // year=signedcertificateurl.split("/")[signedcertificateurl.split("/").length-2];
                        //subject=signedcertificateurl.split("/")[signedcertificateurl.split("/").length-4];          
                        let pdfyear=signedcertificatepdfurl.split("/")[signedcertificatepdfurl.split("/").length-2];
                        let pdfsubject=signedcertificatepdfurl.split("/")[signedcertificatepdfurl.split("/").length-4];                
                        pdfurl=`https://verification.spjimr.org/certificatepdf/${pdfsubject}/${pdfyear}/${lastelement.replace(".json","")}`;
                        jsonurl=`https://verification.spjimr.org/certificatejson/${pdfsubject}/${pdfyear}/${lastelement.replace(".json","")}`;         
        
                        if(printpdf!="")
                        {
                          let pdffullfilename=("SPJIMR-"+fullname+"-"+rollnumber).trim();
                          pdffullfilename = pdffullfilename.replace(/ /g, "-");
                          printpdf = `https://verification.spjimr.org/print/20021/${pdfyear}/${pdffullfilename}`;
                          console.log(printpdf);
                        }
                        
                      }
                      else if(puserid=="20025")
                      {   
                        jsonurl="https://growthschool.certonce.com/certificatejson/";
                        pdfurl="https://growthschool.certonce.com/certificatepdf/";
                      }
                      else if(puserid=="20045")
                      {   
                        var year=signedcertificateurl.split("/")[signedcertificateurl.split("/").length-2];            
                        pdfurl=`https://verification.ndimexamination.org/certificatepdf/${year}/${lastelement.replace(".json","")}`;
                        jsonurl=`https://verification.ndimexamination.org/certificatejson/${year}/${lastelement.replace(".json","")}`;                
                        if(printpdf!="")
                        {
                          downloadprintpdfname=(fullname+"-"+rollnumber).replace(/\./g, "_").replace(/ /g, "_").trim();
                          let lastelprintement=printpdf.split("/")[printpdf.split("/").length-1];
                          printpdf = `https://verification.ndimexamination.org/print/${year}/${lastelprintement.replace(".pdf","")}`;
                        }
                      }              
                      else if(puserid=="20077" || puserid == "35")
                      {
                        let institute_name = student['institute_name'];
                        if(institute_name==null || institute_name=="") institute_name="";
                        let course_name = student['coursename'];
                        if(course_name==null || course_name==undefined || course_name=="undefined") course_name="";
                        downloadprintpdfname = rollnumber.trim().replace(/\//g, '_');
                        downloadpdfname=rollnumber.trim().replace(/\//g, '_');
                        downloadjsonname=lastelement.replace(".json","");
                        // jsonurl = `${myip+subwwwurl}/certonce/json/${path.basename(signedcertificateurl)}`;
                        // pdfurl = `${myip+subwwwurl}/certonce/pdf/${path.basename(signedcertificatepdfurl)}`;
                        // if(printpdf!="") {
                        //   printpdf = `${myip+subwwwurl}/certonce/print/${path.basename(signedcertificatepdfurl)}`;
                        // }
                        jsonurl = `https://certonce.s3.us-east-2.amazonaws.com/json/${lastelement.replace(".json",".json")}`;
                        pdfurl = `https://certonce.s3.us-east-2.amazonaws.com/pdf/${lastelement.replace(".json",".pdf")}`;
                        if(printpdf!="") {
                            printpdf = `https://certonce.s3.us-east-2.amazonaws.com/print/${lastelement.replace(".json",".pdf")}`;
                            }
                      }
                      else if(puserid=="20081")
                      { 
                        year=signedcertificateurl.split("/")[signedcertificateurl.split("/").length-2];                
                        pdfurl=`https://digicert.charusat.ac.in/certificatepdf/${year}/${lastelement.replace(".json","")}`;
                        jsonurl=`https://digicert.charusat.ac.in/certificate/${year}/${lastelement.replace(".json","")}`;                
                      }
                      // else if(puserid == "20088")
                      else if(puserid == "20088" || puserid == "20")
                      {                 
                        if(signedcertificateurl==null||signedcertificateurl==undefined) signedcertificateurl="";
                        if(signedcertificateurl!="")
                        {     
                          pdfurl=`https://certification.ljku.edu.in/pdf/${lastelement.replace(".json","")}`;
                          jsonurl=`https://certification.ljku.edu.in/certificate/${lastelement.replace(".json","")}`;
                          qrcodeurl = `https://certification.ljku.edu.in/image/${lastelement.replace(".json","")}`;
                          if (printpdf!="") {
                            let lastelprintement=printpdf.split("/")[printpdf.split("/").length-1];
                            printpdf=`https://certification.ljku.edu.in/pdf/${lastelprintement.replace(".pdf","")}`;
                          }
                        }
                        qrcodename = `${mainstudentid}`.replace(/ /g, "_").replace(/\//g, "_");
                      }
                      else if(puserid=="20091" || puserid=="30")
                      {
                        year=signedcertificateurl.split("/")[signedcertificateurl.split("/").length-2];
                        pdfurl=`https://certificates.galgotiasuniversity.edu.in/pdf/${year}/${lastelement.replace(".json","")}`;
                        jsonurl=`https://certificates.galgotiasuniversity.edu.in/certificate/${year}/${lastelement.replace(".json","")}`;  
                        qrcodeurl = `https://certificates.galgotiasuniversity.edu.in/qrcode/${year}/${lastelement.replace(".json","")}`;
                        if(certtype=="semesterwisegradecard" || cohortid == "Gradecard_combined_86") {
                          qrcodename = mainstudentid+"_"+semesternumber;
                        }
                        else qrcodename = mainstudentid;
                      }
                      else if(puserid=="20094"){
                        year=signedcertificateurl.split("/")[signedcertificateurl.split("/").length-2];                
                        pdfurl=`https://certification.mietjmu.in/pdf/${year}/${lastelement.replace(".json","")}`;
                        jsonurl=`https://certification.mietjmu.in/certificate/${year}/${lastelement.replace(".json","")}`;
                      }
                      else if(puserid=="20099"){
                        year=signedcertificateurl.split("/")[signedcertificateurl.split("/").length-2];                
                        pdfurl=`https://verification.cutm.ac.in/pdf/${year}/${lastelement.replace(".json","")}`;
                        jsonurl=`https://verification.cutm.ac.in/certificate/${year}/${lastelement.replace(".json","")}`;
                        printpdf = `https://verification.cutm.ac.in/print/${year}/${lastelement.replace(".json","")}`;
                        qrcodeurl = `https://verification.cutm.ac.in/qrcode/${year}/${lastelement.replace(".json","")}`;
                        downloadpdfname = `${mainstudentid}_${fullname}`.replace(/ /g, "_");
                        downloadjsonname = `${mainstudentid}_${fullname}`.replace(/ /g, "_");                
                        downloadprintpdfname = `${mainstudentid}_${fullname}`.replace(/ /g, "_");
                      }
                      else if(puserid=="20107")
                      {
                        year=signedcertificateurl.split("/")[signedcertificateurl.split("/").length-2];                
                        pdfurl=`https://verification.cutmap.ac.in/pdfap/${year}/${lastelement.replace(".json","")}`;
                        jsonurl=`https://verification.cutmap.ac.in/certificateap/${year}/${lastelement.replace(".json","")}`;
                        printpdf = `https://verification.cutmap.ac.in/printap/${year}/${lastelement.replace(".json","")}`;
                        qrcodeurl = `https://verification.cutmap.ac.in/qrcodeap/${year}/${lastelement.replace(".json","")}`;
                      }
                      else if(puserid=="20102" || puserid=="24")//gcu
                      {                
                        pdfurl=`https://verify.gardencity.university/pdf/${lastelement.replace(".json","")}`;
                        jsonurl=`https://verify.gardencity.university/certificate/${lastelement.replace(".json","")}`;                
                        printpdf=`https://verify.gardencity.university/print/${lastelement.replace(".json","")}`;   
                        downloadprintpdfname = `${mainstudentid}`;
                      }              
                      // else if(puserid=="20122" || puserid=="25")//rv
                      // {                
                      //   pdfurl=`https://documentverification.rvce.edu.in/pdf/${lastelement.replace(".json","")}`;
                      //   jsonurl=`https://documentverification.rvce.edu.in/certificate/${lastelement.replace(".json","")}`;                
                      // }              
                      else if(puserid=="20103" || puserid=="32")
                      {
                        // if (certificationcategory == "hindi") downloadprintpdfname=("MEDI-"+email_sub+"-"+rollnumber).trim()+".pdf";
                        // else downloadprintpdfname = ("MEDI-"+fullname+"-"+rollnumber).trim();
                        pdfurl=`https://verification.medicaps.ac.in/pdf/${lastelement.replace(".json","")}`;
                        jsonurl=`https://verification.medicaps.ac.in/certificate/${lastelement.replace(".json","")}`;
                        printpdf = `https://verification.medicaps.ac.in/print/${lastelement.replace(".json","")}`;
                        let pdfname = fullname.replace(/ /g, "-");
                        downloadprintpdfname = rollnumber.trim() + "-" + pdfname.trim();
                      }              
                      else if(puserid=="20108")
                      {                
                        pdfurl=`https://digi-record.iilm.ac.in/pdf/${lastelement.replace(".json","")}`;
                        jsonurl=`https://digi-record.iilm.ac.in/certificate/${lastelement.replace(".json","")}`;                
                        printpdf=`https://digi-record.iilm.ac.in/pdf/${verifyid}_print`;                
                      }
                      else if(puserid=="20109")
                      {                
                        pdfurl=`https://digi-record.iilm.edu.in/pdf/${lastelement.replace(".json","")}`;
                        jsonurl=`https://digi-record.iilm.edu.in/certificate/${lastelement.replace(".json","")}`;                
                        printpdf=`https://digi-record.iilm.edu.in/pdf/${verifyid}_print`;                
                      }
                      else if(puserid=="20117")
                      {                
                        pdfurl=`https://digi-record.iilmlko.ac.in/pdf/${lastelement.replace(".json","")}`;
                        jsonurl=`https://digi-record.iilmlko.ac.in/certificate/${lastelement.replace(".json","")}`;                
                        printpdf=`https://digi-record.iilmlko.ac.in/pdf/${verifyid}_print`;                
                      }
                      else if(puserid=="20113" || puserid == "19")
                      {                
                        pdfurl=`https://verification.dypunik.edu.in/pdf/${lastelement.replace(".json","")}`;
                        jsonurl=`https://verification.dypunik.edu.in/certificate/${lastelement.replace(".json","")}`;                
                        printpdf=`https://verification.dypunik.edu.in/print/${lastelement.replace(".json","")}`;
                      }              
                      else if(puserid=="20110") { 
                        pdfurl=`https://verify.jainuniversity.ac.in/pdf/${lastelement.replace(".json","")}`;
                        jsonurl=`https://verify.jainuniversity.ac.in/certificate/${lastelement.replace(".json","")}`;
                        // printpdf = `https://verification.cutmap.ac.in/printap/${year}/${lastelement.replace(".json","")}`;
                        qrcodeurl = `https://verify.jainuniversity.ac.in/qrcode/${lastelement.replace(".json","")}`;
                        qrcodename = mainstudentid;
                      }
                      else if(puserid == "20111" || puserid == "26") {
                        downloadpdfname = `${mainstudentid}`.replace(/ /g, "_");
                        downloadjsonname = `${mainstudentid}`.replace(/ /g, "_");
                        downloadprintpdfname = `${mainstudentid}`.replace(/ /g, "_");
                        if (s_baseurl != "" && s_baseurl != null) {
                            jsonurl = `${s_baseurl}/certificatenormal/json/${path.basename(signedcertificateurl)}`;
                            pdfurl = `${s_baseurl}/certificatenormal/pdf/${path.basename(signedcertificatepdfurl)}`;
                            printpdf = `${s_baseurl}/certificatenormal/print/${path.basename(printpdf)}`;
                            qrcodeurl = `${s_baseurl}/certificatenormal/qrcode/${path.basename(signedcertificatepdfurl).replace(".pdf", ".png")}`;
                        }
                      }
                      else if(puserid=="20122" || puserid=="25")//rv
                      {                
                        pdfurl=`https://documentverification.rvce.edu.in/pdf/${lastelement.replace(".json","")}`;
                        jsonurl=`https://documentverification.rvce.edu.in/certificate/${lastelement.replace(".json","")}`;                
                        printpdf=`https://documentverification.rvce.edu.in/print/${lastelement.replace(".json","")}`;   
                      }
                      else if(puserid=="20123" || puserid=="23")//ct
                      {                
                        //pdfurl=`https://verification.ctuniversity.in/pdf/${lastelement.replace(".json","")}`;
                        //jsonurl=`https://verification.ctuniversity.in/certificate/${lastelement.replace(".json","")}`;                
                        //printpdf=`https://verification.ctuniversity.in/print/${lastelement.replace(".json","")}`;
                        pdfurl=`https://myctustorage.s3.ap-southeast-2.amazonaws.com/pdf/${lastelement.replace(".json","")}.pdf`;
                        jsonurl=`https://myctustorage.s3.ap-southeast-2.amazonaws.com/json/${lastelement.replace(".json","")}.json`;            
                        printpdf=`https://myctustorage.s3.ap-southeast-2.amazonaws.com/print/${lastelement.replace(".json","")}.pdf`;         
                      }
                      else if(puserid=="20134" || puserid=="33") {
                            pdfurl=`https://apexcert.s3.ap-south-1.amazonaws.com/pdf/${lastelement.replace(".json",".pdf")}`;
                            jsonurl=`https://apexcert.s3.ap-south-1.amazonaws.com/json/${lastelement.replace(".json",".json")}`;
                            if(printpdf!="") {
                                printpdf = `https://apexcert.s3.ap-south-1.amazonaws.com/print/${lastelement.replace(".json",".pdf")}`;
                            }
                        }
                     else if(puserid=="20173")
                        {
                        var collegeid=signedcertificateurl.split("/")[signedcertificateurl.split("/").length-2];
                        var filename=lastelement.replace(".json","");
                        jsonurl = `https://certonce.s3.us-east-2.amazonaws.com/json/${lastelement.replace(".json","")}.json`;
                        pdfurl = `https://certonce.s3.us-east-2.amazonaws.com/pdf/${lastelement.replace(".json","")}.pdf`;
                        printpdf = `https://certonce.s3.us-east-2.amazonaws.com/print/${path.basename(printpdf)}`;
                        if(qrcodeurl!=null && qrcodeurl!="") {
                          qrcodeurl = `https://certonce.s3.us-east-2.amazonaws.com/qrcode/${path.basename(signedcertificatepdfurl).replace(".pdf", ".png")}`;
                        }
                    }
                      else if(puserid=="20131" || puserid=="29")//snu
                      {                
                        pdfurl=`https://verification.snu.edu.in/pdf/${lastelement.replace(".json","")}`;
                        jsonurl=`https://verification.snu.edu.in/certificate/${lastelement.replace(".json","")}`;                
                        if(printpdf!="") {
                          printpdf=`https://verification.snu.edu.in/print/${lastelement.replace(".json","")}`;   
                        }
                        downloadpdfname = `${mainstudentid}`.replace(/ /g, "_");
                        downloadjsonname = `${mainstudentid}`.replace(/ /g, "_");                
                        downloadprintpdfname = `${mainstudentid}`.replace(/ /g, "_");
                        if(certtype=="transcript") {
                          downloadpdfname = `${mainstudentid}_transcript`.replace(/ /g, "_");
                          downloadjsonname = `${mainstudentid}_transcript`.replace(/ /g, "_");                
                          downloadprintpdfname = `${mainstudentid}_transcript`.replace(/ /g, "_");
                        }
                      }
                      else if(puserid=="20121" || puserid=="39") { // SBUP
                        qrcodename = rollnumber.trim();
                        jsonurl = `https://certonceblockchainsa.blob.core.windows.net/json/${path.basename(signedcertificateurl)}`;
                        pdfurl = `https://certonceblockchainsa.blob.core.windows.net/pdf/${path.basename(signedcertificatepdfurl)}`;
                        printpdf = `https://certonceblockchainsa.blob.core.windows.net/print/${path.basename(printpdf)}`;
                        qrcodeurl = `https://certonceblockchainsa.blob.core.windows.net/qrcode/${path.basename(signedcertificatepdfurl).replace(".pdf", ".png")}`;
                      }
                      // else if(puserid=="20145" || puserid=="43") { // NICMAR
                      //   qrcodename = rollnumber.trim();
                      //   jsonurl = `https://nicmar.s3.ap-south-1.amazonaws.com/json/${path.basename(signedcertificateurl)}`;
                      //   pdfurl = `https://nicmar.s3.ap-south-1.amazonaws.com/pdf/${path.basename(signedcertificatepdfurl)}`;
                      //   printpdf = `https://nicmar.s3.ap-south-1.amazonaws.com/print/${path.basename(printpdf)}`;
                      //   qrcodeurl = `https://nicmar.s3.ap-south-1.amazonaws.com/qrcode/${path.basename(signedcertificatepdfurl).replace(".pdf", ".png")}`;
                      // }
                      else if(puserid=="20006"){                                          
                        pdfurl=`https://certonce.s3.us-east-2.amazonaws.com/pdf/${lastelement.replace(".json","")}.pdf`;
                        jsonurl=`https://certonce.s3.us-east-2.amazonaws.com/json/${lastelement.replace(".json","")}.json`;                 
                      }
                      else if(puserid=="20164" || puserid=="48"){                                                  
                      jsonurl = `https://certonce.s3.us-east-2.amazonaws.com/Gjust/json/${path.basename(signedcertificateurl)}`;
                      pdfurl = `https://certonce.s3.us-east-2.amazonaws.com/Gjust/pdf/${path.basename(signedcertificatepdfurl)}`;
                      }
                      else if(puserid =="20027")
                        {
                            pdfurl=`https://360digitmg.com/certificatepdf/${path.basename(signedcertificateurl)}`;
                            jsonurl=`https://360digitmg.com/certificatejson/${path.basename(signedcertificatepdfurl)}`;
                        }
                      else
                      {
                        if (s_baseurl != "" && s_baseurl != null) {
                            jsonurl = `${s_baseurl}/certificatenormal/json/${path.basename(signedcertificateurl)}`;
                            pdfurl = `${s_baseurl}/certificatenormal/pdf/${path.basename(signedcertificatepdfurl)}`;
                            printpdf = `${s_baseurl}/certificatenormal/print/${path.basename(printpdf)}`;
                            qrcodeurl = `${s_baseurl}/certificatenormal/qrcode/${path.basename(signedcertificatepdfurl).replace(".pdf", ".png")}`;
                        }
                      }
                      console.log("downloading...", pdfurl);
                      if (downloadpdf) {
                        await os.execCommand(`wget --user-agent="Mozilla/5.0" --user-agent="Mozilla/5.0" -O ${DOWNLOAD_TEMP_PATH}${puserid}/pdf/${downloadpdfname}.pdf "${pdfurl}"`);
                        console.log("downloading  pdf...", pdfurl);
                        }
                      if (downloadjson) {
                        await os.execCommand(`wget --user-agent="Mozilla/5.0" --user-agent="Mozilla/5.0" -O ${DOWNLOAD_TEMP_PATH}${puserid}/json/${downloadjsonname}.json "${jsonurl}"`);
                        await os.execCommand(`wget --user-agent="Mozilla/5.0" --user-agent="Mozilla/5.0" -O ${DOWNLOAD_TEMP_PATH}${puserid}/uuidjson/${downloadjsonuuidname}.json "${jsonurl}"`);
                        console.log("downloading  json...", jsonurl);
                      }
                      if (downloadprint) {
                        if (downloadprintpdfname) {
                            downloadprintpdfname = downloadprintpdfname.replace(/ /g, "-");
                        }
                        if (printpdf != null && printpdf != "") {
                            await os.execCommand(`wget --user-agent="Mozilla/5.0" -O ${DOWNLOAD_TEMP_PATH}${puserid}/print/${downloadprintpdfname}.pdf "${printpdf}"`);
                            console.log("downloading  printpdf...", printpdf);
                        }
                      }
                      if (downloadqrcode) {
                        if (qrcodeurl != null && qrcodeurl != "") {
                            await os.execCommand(`wget --user-agent="Mozilla/5.0" -O ${DOWNLOAD_TEMP_PATH}${puserid}/qrcode/${qrcodename}.png "${qrcodeurl}"`);
                            console.log("downloading  QR code...", qrcodeurl);
                        }
                      }
                    }
                  }
                  if (downloadtype == "all") break;
                }
                if(settingInfo.downloadmultiplefile==1)
                {
                  if (downloadprint && printpdf != null && printpdf != "")
                  {
                    console.log("downloading  printpdf multiple...", printpdf);
                    let parentDir= `${DOWNLOAD_TEMP_PATH}${puserid}/print`;
                    const mergedPdf = await PDFDocument.create();
                    var files=await getFiles(parentDir,".pdf", ".pdf");
                    for (const pdfPath of files) {
                      const pdfBytes = fs.readFileSync(pdfPath);
                      const pdfDoc = await PDFDocument.load(pdfBytes);
                      const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
                      copiedPages.forEach(page => mergedPdf.addPage(page));
                      if (fs.existsSync(pdfPath))
                      {
                        fs.unlinkSync(pdfPath);
                      } 
                    }      
                    const mergedPdfBytes = await mergedPdf.save();
                    fs.writeFileSync(`${parentDir}/consolidatedprint.pdf`, mergedPdfBytes);
                  }
                  if (downloadpdf)
                  {
                    console.log("downloading multiple pdf...", pdfurl);
                    let parentDir= `${DOWNLOAD_TEMP_PATH}${puserid}/pdf`;
                    const mergedPdf = await PDFDocument.create();
                    var files=await getFiles(parentDir,".pdf", ".pdf");
                    for (const pdfPath of files) {
                      const pdfBytes = fs.readFileSync(pdfPath);
                      const pdfDoc = await PDFDocument.load(pdfBytes);
                      const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
                      copiedPages.forEach(page => mergedPdf.addPage(page));
                      if (fs.existsSync(pdfPath))
                      {
                        fs.unlinkSync(pdfPath);
                      } 
                    }      
                    const mergedPdfBytes = await mergedPdf.save();
                    fs.writeFileSync(`${parentDir}/consolidateddigital.pdf`, mergedPdfBytes);
                  }
                }
                let zip_path = `${DOWNLOAD_ZIP_PATH}${puserid}`;
                if (!fs.existsSync(zip_path))
                {
                  await os.execCommand('mkdir -p "'+zip_path+'"');
                  await os.execCommand('chmod -R 777 "'+zip_path+'"');
                }
                if(puserid!="20077" || puserid == "35")
                {  
                  fsExtra.emptyDirSync(zip_path);
                }
                let zip_name = getOnetimecode(15);
                let zip = new AdmZip();
                zip.addLocalFolder(`${DOWNLOAD_TEMP_PATH}${puserid}`);
                await zip.writeZipPromise(`${zip_path}/${zip_name}.zip`);
                console.log("Zip file path=",`${zip_path}/${zip_name}.zip`);
                for (let index = 0; index < download_category.length; index ++){
                  let empty_path = `${DOWNLOAD_TEMP_PATH}${puserid}/${download_category[index]}`;
                  fsExtra.emptyDirSync(empty_path);
                }
                
                console.log("success to make zip file.")
                // res.status(200).download(`${zip_path}/file.zip`);
                
                // var obj = {
                //   Status: 200,
                //   message: 'Downloaded successfully',
                //   downloadIitems:downloadIitems
                // }
                // res.json(obj);
                let email_body = `<p style="color: black;">Download request is completed successfully. Below are download link.</p>
                <p style="color: blue;">${myip}/download/${puserid}/${zip_name}.zip</p>`
                let email_subject = "Download Result";
               
                const mailer_downloadcertificate = require("../../config/mailer_downloadcertificate");
                let logfilename=logfiledir+puserid+"/sendcertificate.log";
                let mailer_result = await mailer_downloadcertificate(email_body, email_subject, contact_email, smtpaccount, logfilename)
                
                if (mailer_result.status == "400"){
                    console.log("@#@#@#----- Errormail sending");
                  const mailer_certonce = require("../../config/mailer_certonce");
                  let logfilename=logfiledir+puserid+"/sendcertificate.log";
                  let email_body = `<p style="color: black;">There is an error in downloading certificates.</p>
                  <p style="color: black;">Error: ${JSON.stringify(mailer_result.message.response)}</p>`
                  let email_subject = "Download Result";
                  mailer_certonce(email_body, email_subject, contact_email, logfilename);
                }
                return;
              }
              catch(err){
                console.log(err);
                for (let index = 0; index < download_category.length; index ++){
                  let empty_path = `${DOWNLOAD_TEMP_PATH}${puserid}/${download_category[index]}`;
                  fsExtra.emptyDirSync(empty_path);
                }
                let email_body = `<p style="color: black;">There is an error in downloading certificates.</p>
                <p style="color: black;">Error: ${JSON.stringify(err.message)}</p>`
                let email_subject = "Download Result";
               
                const mailer_downloadcertificate = require("../../config/mailer_downloadcertificate");
                let logfilename=logfiledir+puserid+"/sendcertificate.log";
                mailer_downloadcertificate(email_body, email_subject, receive_email, smtpaccount, logfilename);
                return;
              }
            }//download end
            ///////////////////////  
            var obj = {
              Status: 200,
              message: 'Please wait while sending email',
              // downloadIitems:downloadIitems
            }
            res.json(obj);  
        
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
            isTotal=false; 
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
            console.log("@@@@@@@@@@@@ is total",isTotal);
            if(isTotal==false)
            {

              var stop_flag = false;
              var clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
              console.log('Your IP address is ' + clientIp);
              let ipQuery = format(`INSERT INTO activitylog (activity,ipaddress,userid) values ('sendcertificate (${params.length} students are selects)','${clientIp}','${puserid}');`);
              await pool.query(ipQuery);
        
              for (let index = 0; index < params.length; index++) 
              {
                if (stop_flag) break;
                const element = params[index]; 
                let cohortid=element.split("=")[0];       
                let studentid=element.split("=")[1];
                if ( studentid == '') {continue;}
                //let updateStateQuery = format(`UPDATE ${cohorttablename} SET certificatesendstate=1	WHERE id='${studentid}' and certificatesendstate!=2;`);
                let updateStateQuery = format(`UPDATE ${cohorttablename} SET certificatesendstate=1 WHERE id='${studentid}' and hold !='y' and hold!='yes' and certificatesendstate!=2;`);
                //let updateStateQuery = format(`UPDATE ${cohorttablename} SET certificatesendstate=1	WHERE id='${studentid}';`);
                await pool.query(updateStateQuery);
              // }
              // for (let index = 0; index < params.length; index++) 
              // {
              //   const element = params[index];
              //   let cohortid=element.split("=")[0];
              //   let studentid=element.split("=")[1];
              //   console.log("cohortid="+cohortid+",studentid="+studentid);
              //   ///////////////////////////////////////////
              //   if ( cohortid == '' || studentid == '') {continue;}
                //let whereClause =  "WHERE c.cohortid='"+ cohortid +"' and b.id='"+studentid+"' and c.accountid='"+puserid+"' and e.accountid='"+puserid+"' and b.certificatesendstate=1;"
                let whereClause =  "WHERE c.cohortid='"+ cohortid +"' and b.id='"+studentid+"' and c.accountid='"+puserid+"' and e.accountid='"+puserid+"';"
                let studentQuery = format(`SELECT a.*, c.*,b.*,d.*,c.cohortid as cohortfullid, a.studentid as studentmainid FROM student a 
                                              LEFT JOIN ${cohorttablename} b ON b.studentid=a.id 
                                              LEFT JOIN cohort c ON c.id=b.cohortid 
                                              LEFT JOIN cohort_group e ON e.cohortid=c.cohortid 
                                              LEFT JOIN certtemplate d ON d.id=e.certtemplateid ${whereClause}
                                              `);
                
                let students = await pool.query(studentQuery);   
                if ( students.rowCount > 0 ) {                            
                  for ( const student of students.rows ) {               
                    let email=student['emailaddress'];
                    let secondemailaddress=student['secondemailaddress'];
                    
                    let cc2=student['cc2'];
                    let cc3=student['cc3'];
                    var smtpcc=[];
                    if(cc!="" && cc!=null && cc!==undefined)
                    {
                      smtpcc.push(cc);
                    }
                    if(secondemailaddress!="" && secondemailaddress!=null && secondemailaddress!==undefined)
                    {                          
                      smtpcc.push(secondemailaddress);
                    }
                    if(cc2!="" && cc2!=null && cc2!==undefined)
                    {                          
                      smtpcc.push(cc2);
                    }
                    if(cc3!="" && cc3!=null && cc3!==undefined)
                    {                          
                      smtpcc.push(cc3);
                    }
                    if(smtpcc.length>0)
                    {                  
                      smtpaccount['cc']=smtpcc.join(",");
                    }
                    console.log("----------@@!!!",smtpaccount['cc']);
                    let signedcertificateurl = student['signedcertificateurl'];
                    let signedcertificatepdfurl = student['signedcertificatepdfurl'];
                    
                    let studentmainid = student['studentmainid'];
        
                    let certificaterevoked = student['certificaterevoked'];
                    let first_name = student['firstname'];
                    
                    let middle_name = student['middlename'];
                    let last_name = student['lastname'];
                    let fullname="";       
                    if(middle_name==null||middle_name=="")
                    {
                      fullname=first_name+" "+last_name;
                    }
                    else
                    {
                      fullname=first_name+" "+middle_name+" "+last_name;
                    }
                    let competency_name=student['competencyname'];
                    let attachment_name=fullname+" - "+competency_name; 
                    
                    
                    
                    
                    if (student['hold']!=null && (student['hold'].toLowerCase() == "y" || student['hold'].toLowerCase() == "yes")) continue;
                    if(signedcertificateurl==null||signedcertificateurl=="") continue;
                    let cohortfullid = student['cohortfullid'];
                    if(email&&signedcertificateurl&&certificaterevoked!=true)
                    {
                      let jsonurl=signedcertificateurl;//myip+subwwwurl+"/certificatejson/";
                      let pdfurl=signedcertificatepdfurl;//myip+subwwwurl+"/certificatepdf/";
                      let printpdf="";
                      let qrcodeurl="";
                      //console.log(email+"=="+signedcertificateurl)
                      let lastelement=signedcertificateurl.split("/")[signedcertificateurl.split("/").length-1];//signedcertificateurl.split("/").pop();
                      let jsoncollegeid=signedcertificateurl.split("/")[signedcertificateurl.split("/").length-2];//signedcertificatepdfurl.split("/").pop();
                      let pdflastelement=signedcertificatepdfurl.split("/")[signedcertificatepdfurl.split("/").length-1];//signedcertificatepdfurl.split("/").pop();
                      let pdfcollegeid=signedcertificatepdfurl.split("/")[signedcertificatepdfurl.split("/").length-2];//signedcertificatepdfurl.split("/").pop();
                      
                      let verifyid=lastelement.replace(".json","");
                      let pdfid=pdflastelement.replace(".pdf","");
                      
                      
                      const cert_url = (jsonurl+jsoncollegeid+"/"+verifyid).split("/").join("%2F");
                      const cert_deepurl = "https://wallet.blockcerts.org/#/import-certificate/"+cert_url;
                      const cert_deepurlqr = encodeURIComponent("https://wallet.blockcerts.org/#/import-certificate/"+cert_url)
                      const qrcode = "<img src='"+await getQRwithbase64(cert_deepurlqr, 300)+"' title='Introduction url' />";
                      
                      var cert_email_subject = "";  
                      var email_body="";
                      var email_subject_university = "";  
                      var email_body_university="";
                      let applicationid = student['a_other12'];
                      let universitymail = student['a_other13'];

                      if(puserid == "20006")//enhelion
                      { 
                        pdfurl=`https://certonce.s3.us-east-2.amazonaws.com/pdf/${pdfid}.pdf`;
                        jsonurl=`https://certonce.s3.us-east-2.amazonaws.com/json/${verifyid}.json`;
                        cert_email_subject = "A Digital certificate has been issued by "+organization_name;  
                        email_body=`<p style="color: black;">Hi ${first_name},</p>
                          <p style="color: black;">Congratulations on completing your Certificate course in ${competency_name}</p>
                          <p style="color: black;">You have been issued a <span style="color:rgb(0,94,122);font-weight:bold">Blockchain Verifiable Digital Certificate by ${organization_name}.</span></p>
                          <p style="color: black;">The certificate is in three formats.</p>
                          <ul>
                            <li style="color: black;" type="none">1.  <a style="color:rgb(0,94,122);font-weight:bold;text-decoration:none;" href="${pdfurl}">PDF</a> &ndash; Store it anywhere permanently for your records for seeing and sharing
                          with anyone. The PDF will also have a verification link. Receiver can click it for
                          instant verification.</li>
                            
                            <li style="color: black;" type="none">2.  <a style="color:rgb(0,94,122);font-weight:bold;text-decoration:none;" href="${verifier_url_direct}${verifyid}">URL of Online certificate</a> &ndash; Click on this link to view the digital copy anchored on
                          Blockchain. You can share this link on any social media or professional platform or
                          forward on Whatsapp or mail.</li>
                            
                            <li style="color: black;" type="none">3.  <a style="color:rgb(0,94,122);font-weight:bold;text-decoration:none;" href="${jsonurl}">.json file</a> &ndash; It’s the techie version of your record. Store it along with your PDF. Some institutes may ask you to share this too along with PDF.</li>
                            
        
                          </ul>
                          
                          <p style="color: black;">Always remember that the law firm partners of Enhelion and the management of Enhelion are always there with you. Be a good person and do well in life. Our best wishes and blessings shall always be there with you. :)</p>
                          <p style="color:rgb(0,94,122);font-weight:bold;font-style:italic">Queries regarding your Digital Certificate</p>
                          <ul>
                          <li style="color: black;" type="none">If you have any queries regarding your certificate, please write to
                          info@enhelion.com</li>
                          </ul>
                          <p style="color: black;">We wish you success in every future endeavour.</p>
                          <p style="color: black;">Warm Regards,</p>
                          <p style="color: black;">Deborah Schneider,</p>
                          <p style="color:rgb(0,94,122);">(Student Engagements Division</p>
                          <p style="color:rgb(0,94,122);">Enhelion Knowledge Ventures Private Limited)</p> 
                        `;                    
                      }
                      else if(puserid == "20001")
                      { 
                        pdfurl=`https://certification.mitwpu.edu.in/pdf/${pdfid}`;
                        jsonurl=`https://certification.mitwpu.edu.in/certificate/${verifyid}`;
                        if(signedcertificateurl.toLowerCase().indexOf("o21")!==-1)
                        {   
                          pdfurl=`https://certification.mitwpu.edu.in/pdf/O21/${pdfid}`;
                          jsonurl=`https://certification.mitwpu.edu.in/certificate/O21/${verifyid}`;
                        }
                        else if(signedcertificateurl.toLowerCase().indexOf("j22")!==-1)
                        {   
                          pdfurl=`https://certification.mitwpu.edu.in/pdf/J22/${pdfid}`;
                          jsonurl=`https://certification.mitwpu.edu.in/certificate/J22/${verifyid}`;
                        }
                        else if(signedcertificateurl.toLowerCase().indexOf("a21")!==-1)
                        { 
                          var issueddate = student['issueddate'];
                          if(issueddate!=null && issueddate.indexOf("2022")!==-1)
                          {
                            pdfurl=`https://certification.mitwpu.edu.in/pdf/A21/${pdfid}`;
                            jsonurl=`https://certification.mitwpu.edu.in/certificate/A21/${verifyid}`;
                          }
                          else
                          {
                            pdfurl=`https://certification.mitwpu.edu.in/pdf/${pdfid}`;
                            jsonurl=`https://certification.mitwpu.edu.in/certificate/${verifyid}`;
                          }
                        }
                        else if(signedcertificateurl.toLowerCase().indexOf("m22")!==-1)
                        {   
                          pdfurl=`https://certification.mitwpu.edu.in/pdf/M22/${pdfid}`;
                          jsonurl=`https://certification.mitwpu.edu.in/certificate/M22/${verifyid}`;
                        }
                        //mit-wpu
                        cert_email_subject = "MIT World Peace University has awarded you a Blockchain Secured Digital Degree Certificate";  
                        email_body=`<p style="color: black;">Hi ${first_name}</p>
                          <p style="color: black;"><strong style="color:#cc0066;">Many Congratulations</strong> on the successful completion of your program at Dr. Vishwanath Karad MIT World Peace University.</p>
                          <p style="color: black;">We, at Dr. Vishwanath Karad MIT World Peace University are proud to award you a Blockchain secured Degree for your achievements. With this, you have the technology advantage over many others in today&rsquo;s time.</p>
                          <p style="color: black;">Your records have a lifetime value. <strong style="color:#cc0066;font-style:italic;">Keep it safe.</strong></p>
                          <p style="color: black;">Forward the PDF through email in an easily readable format. The receiver can click the verification link mentioned at left below corner of the PDF to see the verified copy on the University website. <strong style="color:#cc0066;font-style:italic;">Share when required.</strong></p>
                          <p style="color: black;">The Digital Degree Certificate can be secured in two formats,</p>
                          <p style="color: black;">1. <a style="color:#cc0066; font-weight: bold; text-decoration: none;" href="${pdfurl}">PDF</a> &ndash; Store it permanently. Share it anywhere required.</p>
                          <p style="color: black;">2. <a style="color:#cc0066;font-weight: bold; text-decoration: none;" href="${jsonurl}">.json file</a> &ndash; It&rsquo;s the techie version of your record. Store it along with your PDF. Do Not edit this file ever as it will stop working. This can be directly uploaded on <a href="https://certification.mitwpu.edu.in/verifier.html">https://certification.mitwpu.edu.in</a>&nbsp;and also any independent verification platform like <a href="https://www.blockcerts.org">https://www.blockcerts.org</a>, <a href="https://www.certonce.com/verifier.php">https://www.certonce.com</a></p>
                          
                          <p style="color: black;">Feel free to reach out to us for query,if any on convocation@mitwpu.edu.in or on +91 8669990193. <span style="color: black;"><a href="https://www.certonce.com">Click here</a> to know more about Digital Certification</span>
                          </p>
                          
                          <p style="color: black;">We wish you all the success in every future endeavour. Make us and your family proud!</p>
                          
                          <p>&nbsp;</p>
                          <p style="color: black;">Thanks and Regards</p>
                          <p>&nbsp;</p>
                          <p style="color: black; ">Controller of Examinations</p>
                          <p style="color: black; font-weight: bold;">MIT World Peace University</p>
                          <p style="color: black; font-weight: bold;">Pune - 38</p>
                        `;
                      }
                      else if(puserid == "20018")
                      { 
                        //deepak
                        cert_email_subject = `DDIP Certificate for ${first_name}`;  
                        email_body=`<p style="color: black;">Hello ${first_name},</p>
                          <p style="color: black;">Congratulations on successfully completing the <strong>${competency_name}.</strong></p>
                          <p style="color: black;">You have been issued a <strong>blockchain anchored digital certificate</strong> for completion of the training program.</p>
                          <p><strong>What was your biggest learning from DDIP?</strong></p>
                          <p>Share the Certificate on <strong>LinkedIn</strong> with a single-click and let us know <a href="https://www.linkedin.com/shareArticle?url=${verifier_url_direct}${verifyid}"><img style="width: 25px;" src="https://www.certonce.com/images/linkedin.png" height="21" /></a>.</p>
                          <p>Feel free to share it on <strong>Twitter</strong> as well. And tag Digital Deepak <a href="https://twitter.com/intent/tweet?url=${verifier_url_direct}${verifyid}"><img style="width: 25px;" src="https://www.certonce.com/images/twitter.png" /></a>.</p>
                          <p>Find Digital Deepak on <strong>Twitter</strong> at: <a href="https://twitter.com/highdeepak">https://twitter.com/highdeepak</a></p>
                          <p>And, on LinkedIn at: <a href="https://www.linkedin.com/in/deepakkanakaraju">https://www.linkedin.com/in/deepakkanakaraju</a></p>
                          <p>With regard to your blockchain certificate, please note, the certificate is in two formats.</p>
                          <ul>
                          <li style="color: black;" type="none">1. <a style="color: #005e7a; font-weight: bold; text-decoration: none;" href="${pdfurl}${pdfcollegeid}/${pdfid}">PDF</a> &ndash; Store it anywhere permanently for your records for seeing and sharing with anyone. The PDF will also have a verification link. Receiver can click it for instant verification.</li>
                          <li style="color: black;" type="none">2. <a style="color: #005e7a; font-weight: bold; text-decoration: none;" href="${jsonurl}${jsoncollegeid}/${verifyid}">.json file</a> &ndash; It&rsquo;s the techie version of your record. Store it along with your PDF. Some institutes may ask you to share this too along with PDF.</li>
                          </ul>
                          <p>Wish you all the best in all your future endeavours.</p>
                          <p style="color: black;">Regards,</p>
                          <p style="color: black;">Team Digital Deepak</p>
                        `;
                      }
                      else if(puserid == "20021")
                      { 
                        //var lastelement=signedcertificateurl.split("/")[signedcertificateurl.split("/").length-1];
                        var year=signedcertificatepdfurl.split("/")[signedcertificatepdfurl.split("/").length-2];
                        var subject=signedcertificatepdfurl.split("/")[signedcertificatepdfurl.split("/").length-4];                                            
                        let socialshareurl=`https://verification.spjimr.org/verify/${subject}/${year}/${lastelement.replace(".json","")}`;
                        pdfurl=`https://verification.spjimr.org/certificatepdf/${subject}/${year}/${lastelement.replace(".json","")}`;
                        jsonurl=`https://verification.spjimr.org/certificatejson/${subject}/${year}/${lastelement.replace(".json","")}`;
                        cert_email_subject = `SPJIMR Certificate for ${first_name}`;  
                        email_body=`<p style="color: black;">Hello ${first_name},</p>
                          <p style="color: black;">Congratulations on successfully completing the <strong>${competency_name}.</strong></p>
                          <p style="color: black;">You have been issued a <strong>Blockchain anchored digital certificate</strong> for participating in the training programme.</p>
                          <p>With regard to your Blockchain certificate, please note, the certificate is in two formats.</p>
                          <ul>
                          <li style="color: black;" type="none">1. <a style="color: #005e7a; font-weight: bold; text-decoration: none;" href="${pdfurl}">PDF</a> &ndash; Store it anywhere permanently for your records for seeing and sharing with anyone. The PDF will also have a verification link. Receiver can click it for instant verification.</li>
                          <li style="color: black;" type="none">2. <a style="color: #005e7a; font-weight: bold; text-decoration: none;" href="${jsonurl}">.json file</a> &ndash; It&rsquo;s the techie version of your record. Store it along with your PDF. Some institutes may ask you to share this too along with PDF.</li>
                          </ul>
                          <p>Share the Certificate on <strong>LinkedIn</strong> with a single-click and let us know <a href="https://www.linkedin.com/shareArticle?url=${socialshareurl}"><img style="width: 25px;" src="https://www.certonce.com/images/linkedin.png" height="21" /></a>.</p>
                          <p>Feel free to share it on <strong>Twitter</strong> as well.<a href="https://twitter.com/intent/tweet?url=${socialshareurl}"><img style="width: 25px;" src="https://www.certonce.com/images/twitter.png" /></a>.</p>
                          <p>Do tag <a style="text-decoration: none;" href="https://www.linkedin.com/company/spjimr-executive-education-mdp-project-management"> SPJIMR </a> while sharing your proud moment on social media.</p>
                          <p>Wish you all the best in all your future endeavours.</p>
                          <p style="color: black;">Regards,</p>
                          <p style="color: black;">Team SPJIMR</p>
                        `;
                      }
                      else if(puserid == "20045")
                      { 
                      let year=signedcertificatepdfurl.split("/")[signedcertificatepdfurl.split("/").length-2];                     
                      pdfurl=`https://verification.ndimexamination.org/certificatepdf/${year}/${lastelement.replace(".json","")}`;
                      jsonurl=`https://verification.ndimexamination.org/certificatejson/${year}/${lastelement.replace(".json","")}`;
                      let ndim_diploma_transcript="Diploma";
                      
                        if(certtype=="transcript") 
                        {
                          ndim_diploma_transcript="Transcript";
                          cert_email_subject = `Your NDIM PGDM Blockchain Secured Digital ${ndim_diploma_transcript}`;  
                          email_body=`<p style="color: black;">Hi ${first_name},</p>
                          <p style="color: black;"><strong>Many Congratulations</strong>&nbsp;on the successful completion of your PGDM program at New Delhi Institute of Management.</p>
                          <p style="color: black;">We, at NDIM are proud to award you a <strong>Blockchain secured Transcript (consolidated marksheet)</strong> for your achievements. With this, you have the technology advantage over many others in today’s time. The hardcopy of the transcript has already been issued during the Convocation of your batch.</p>
                          <p style="color: black;">Your records have a lifetime value.&nbsp;<strong><em>Keep it safe.</em></strong></p>
                          <p style="color: black;">The receiver can click the verification link mentioned below. <strong><em>Share it as and when required.</em></strong></p>
                          <p>The Digital Transcript can be secured in two formats:</p>
                          <ul>
                          <li style="color: black;" type="none">1. <span style="color: #000000;"><a style="color: #000000; font-weight: bold; text-decoration: none;" href="${pdfurl}">PDF</a></span> &ndash; Store it permanently. Share it anywhere required.</li>
                          <li style="color: black;" type="none">2. <span style="color: #000000;"><a style="color: #000000; font-weight: bold; text-decoration: none;" href="${jsonurl}">.json file</a></span> &ndash; It&rsquo;s the tech version of your record. Store it along with your PDF<strong><u>. Do Not edit this file</u></strong>&nbsp;else it will stop working. It can directly be uploaded on&nbsp;<u><a href="https://verification.ndimexamination.org/" target="_blank">https://verification.ndimexamination.org</a></u>&nbsp;and also on any independent verification platform like&nbsp;<span style="color: #000000;"><u> <a style="color: #000000;" href="https://www.blockcerts.org">https://www.blockcerts.org</a></u></span>,&nbsp;<span style="color: #000000;"><u><a style="color: #000000;" href="https://www.certonce.com">https://www.certonce.com</a></u></span></li>
                          </ul>
                          <p>Please feel free to reach out to us for any query on&nbsp;<u><a href="mailto:examination@ndimdelhi.org" target="_blank" rel="noopener">examination@ndimdelhi.org</a></u>&nbsp;<wbr />or on Phone No. 011-40111000.&nbsp;</p>
                          <p><span style="color: #ff0000;">This Blockchain secured Transcript is valid for Employment and Immigration purposes as well.</span></p>
                          <p><span style="color: #000000;"><strong><u><a style="color: #000000;" href="https://www.ndimexamination.org/digital-credentials" target="_blank">Click here</a></u></strong></span> to know more about Digital Certification</p>
                          <p>We wish you all the success for future endeavors.</p>
                          <p style="font-weight: 400;">Best Wishes,</p>
                          <p style="font-weight: 400;">Controller of Examinations</p>
                          <p style="font-weight: 400;"><strong>New Delhi Institute of Management</strong></p>
                          <p style="font-weight: 400;"><strong>Website:&nbsp;</strong><a href="https://www.ndimdelhi.org/">https://www.ndimdelhi.org</a>;&nbsp;<a href="https://www.ndimexamination.org/">https://www.ndimexamination.org</a></p>
                          `;
                        }
                        else
                        {
                          
                          cert_email_subject = `Your NDIM PGDM Blockchain Secured Digital ${ndim_diploma_transcript} Certificate`;  
                          email_body=`<p style="color: black;">Hi ${first_name},</p>
                          <p style="color: black;"><strong>Many Congratulations</strong>&nbsp;on the successful completion of your PGDM program at New Delhi Institute of Management.</p>
                          <p style="color: black;">We, at NDIM are proud to award you a <strong>Blockchain secured Diploma</strong> for your achievements. With this, you have the technology advantage over many others in today&rsquo;s time. The hardcopy of the diploma has already been issued during the Convocation of your batch.</p>
                          <p style="color: black;">Your records have a lifetime value.&nbsp;<strong><em>Keep it safe.</em></strong></p>
                          <p style="color: black;">The receiver can click the verification link mentioned below. <strong><em>Share it as and when required.</em></strong></p>
                          <p>The Digital Diploma Certificate can be secured in two formats:</p>
                          <ul>
                          <li style="color: black;" type="none">1. <span style="color: #000000;"><a style="color: #000000; font-weight: bold; text-decoration: none;" href="${pdfurl}">PDF</a></span> &ndash; Store it permanently. Share it anywhere required.</li>
                          <li style="color: black;" type="none">2. <span style="color: #000000;"><a style="color: #000000; font-weight: bold; text-decoration: none;" href="${jsonurl}">.json file</a></span> &ndash; It&rsquo;s the tech version of your record. Store it along with your PDF<strong><u>. Do Not edit this file</u></strong>&nbsp;else it will stop working. It can directly be uploaded on&nbsp;<u><a href="https://verification.ndimexamination.org/" target="_blank">https://verification.ndimexamination.org</a></u>&nbsp;and also on any independent verification platform like&nbsp;<span style="color: #000000;"><u> <a style="color: #000000;" href="https://www.blockcerts.org">https://www.blockcerts.org</a></u></span>,&nbsp;<span style="color: #000000;"><u><a style="color: #000000;" href="https://www.certonce.com">https://www.certonce.com</a></u></span></li>
                          </ul>
                          <p>Please feel free to reach out to us for any query on&nbsp;<u><a href="mailto:examination@ndimdelhi.org" target="_blank" rel="noopener">examination@ndimdelhi.org</a></u>&nbsp;<wbr />or on Phone No. 011-40111000.&nbsp;</p>
                          <p><span style="color: #ff0000;">This Blockchain secured Diploma is valid for Employment and Immigration purposes as well.</span></p>
                          <p><span style="color: #000000;"><strong><u><a style="color: #000000;" href="https://www.ndimexamination.org/digital-credentials" target="_blank">Click here</a></u></strong></span>&nbsp;to know more about Digital Certification</p>
                          <p>We wish you all the success for future endeavors.</p>
                          <p style="font-weight: 400;">Best Wishes,</p>
                          <p style="font-weight: 400;">Controller of Examinations</p>
                          <p style="font-weight: 400;"><strong>New Delhi Institute of Management</strong></p>
                          <p style="font-weight: 400;"><strong>Website:&nbsp;</strong><a href="https://www.ndimdelhi.org/">https://www.ndimdelhi.org</a>;&nbsp;<a href="https://www.ndimexamination.org/">https://www.ndimexamination.org</a></p>
                          `;
                        }
                      }
                      else if(puserid == "101")
                      { 
                        //deepak
                        cert_email_subject = `${competency_name} Certificate for ${first_name}`;
                        email_body=`<p style="color: black;">Hello ${first_name},</p>
                          <p style="color: black;">Congratulations on successfully completing the ${competency_name}</p>
                          <p style="color: black;">You have been issued a <strong>Blockchain anchored digital certificate</strong> for completion of the training program.</p>
                          <p>Share the Certificate on <strong>LinkedIn</strong> with a single-click and let us know <a href="https://www.linkedin.com/shareArticle?url=${verifier_url_direct}${verifyid}"><img style="width: 25px;" src="https://www.certonce.com/images/linkedin.png" height="21" /></a>.</p>
        
                          <p>Feel free to share it on <strong>Twitter</strong> as well. And tag Sanjay Shenoy <a href="https://twitter.com/intent/tweet?url=${verifier_url_direct}${verifyid}"><img style="width: 25px;" src="https://www.certonce.com/images/twitter.png" /></a>.</p>
        
                          <p>Find Sanjay Shenoy on Twitter at: <a href="https://twitter.com/SanjayShenoy13">https://twitter.com/SanjayShenoy13</a></p>
                          <p>And, on LinkedIn at: <a href="https://www.linkedin.com/in/jsanjayshenoy">https://www.linkedin.com/in/jsanjayshenoy</a></p>
        
                          <p>With regard to your Blockchain certificate, please note, the certificate is in two formats.</p>
                          <ul>
                            <li style="color: black;" type="none">1. <a style="color: #005e7a; font-weight: bold; text-decoration: none;" href="${pdfurl}">PDF</a> &ndash; Store it anywhere permanently for your records for seeing and sharing with anyone. The PDF will also have a verification link. Receiver can click it for instant verification.</li>
                            <li style="color: black;" type="none">2. <a style="color: #005e7a; font-weight: bold; text-decoration: none;" href="${jsonurl}">.json file</a> &ndash; It&rsquo;s the techie version of your record. Store it along with your PDF. Some institutes may ask you to share this too along with PDF.</li>
                          </ul>
                          <p>Wish you all the best in all your future endeavours.</p>
                          <p style="color: black;">Regards,</p>
                          <p style="color: black;">Team Sanjay Shenoy</p>
                        `;
                      }
                      else if(puserid == "20025")
                      { 
                        jsonurl="https://growthschool.certonce.com/certificatejson/";
                        pdfurl="https://growthschool.certonce.com/certificatepdf/";    
                        cert_email_subject = `Your ${competency_name} certificate is here`;  
                        email_body=`<p style="color: black;">Hey ${first_name},</p>
                          <p style="color: black;">Congratulations!</p>
                          <p style="color: black;">Here's your blockchain anchored digital certificate for completing the ${competency_name}.</p>
                          <p>Concerning your Blockchain certificate, please note, the certificate is in two formats:</p>
                          <ul>
                          <li style="color: black;" type="none">1. <a style="color: #005e7a; font-weight: bold; text-decoration: none;" href="${pdfurl}${pdfid}">PDF</a> &ndash; Store it anywhere permanently for your records for seeing and sharing with anyone. The PDF will also have a verification link. Anyone can verify it with just one click.</li>
                          <li style="color: black;" type="none">2. <a style="color: #005e7a; font-weight: bold; text-decoration: none;" href="${jsonurl}${verifyid}">.json file</a> &ndash; It&rsquo;sthe techie version of your record. Store it along with your PDF. Some institutes may ask you to share this too along with PDF.</li>
                          </ul>
                          
                          <p>Now you can flaunt your certificates on your LinkedIn Profile with the link given on the PDF.</p>
                          <p>You can also share it across all social media platforms instantly!</p>
                          <p>Use #growthschool and <strong>share your experiences about the program.</strong></p>
                          <p>Thank you for believing in us. You are now part of the GrowthSchool Fam!</p>
                          <p>All the best for your journey.</p>
                          <p>P.S. If you were able to reach your desired outcome/goal after completing the program, we would love to hear from you and feature you on our website. <a clicktracking="off" href="https://forms.gle/Xx5riEsxiWyKVwCG6">Click here</a>, to learn more about it!</p>
                          
                          <p>Cheers,</p>
                          <p style="color: black;">Team GrowthSchool</p>
                        `;
                      }
                      else if(puserid == "20077" || puserid == "35")
                      { 
                        //Bachelor of Technology
                        /*
                        let year=signedcertificatepdfurl.split("/")[signedcertificatepdfurl.split("/").length-2];
                        pdfurl=`https://credentials.nitkkr.ac.in/pdf/${year}/${pdfid}`;
                        jsonurl=`https://credentials.nitkkr.ac.in/certificate/${year}/${pdfid}`;      
                        */
                        pdfurl=`https://credentials.nitkkr.ac.in/pdf/${pdfid}`;
                        jsonurl=`https://credentials.nitkkr.ac.in/certificate/${pdfid}`;      
        
                        let institute_name=student['institute_name'];    
                        if(institute_name==null) institute_name="";                 
                        cert_email_subject = `Your ${competency_name} Blockchain-Secured Degree`;
                        //if(competency_name.indexOf("Bachelor of Technology")!==-1 && institute_name.indexOf("Indian Institute of Information Technology Sonepat")!==-1)//IIITS
                        if(cohortid.trim()=="Btech-IIIT-2022")
                        {  
                        console.log("IIITS"); 
                        email_body=`
                        <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Dear ${first_name},</span></span></span></span></p>
        
                        <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><strong><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Congratulations</span></strong><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"> on the successful completion of your </span></span></span></span>${competency_name}<span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"> program at Indian Institute Of Information Technology Sonepat (Mentor Institute: National Institute of Information Technology Kurukshetra). We are extremely proud of your achievements and accomplishments over the past years</span></span></span></span></p>
        
                        <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">We, at Indian Institute of Information Technology Sonepat (Mentor Institute: National Institute of Information Technology Kurukshetra) are proud to award you with a<strong> Blockchain-secured&nbsp; Degree</strong> for your achievements. With this, you have the technology advantage over many others in today&rsquo;s time. </span></span></span></span></p>
        
                        <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Your records have a lifetime value. <strong><em>Keep it safe.</em></strong></span></span></span></span></p>
        
                        <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">The Digital Degree Certificate will be available to you in 3 formats:</span></span></span></span></p>
        
                        <ul>
                          <li><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><u><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Printed Version</span></u><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">: The hardcopy will be presented to you during your convocation ceremony which will have a printed QR code redirecting your future employers or Higher Education Institutes in India and abroad to verify your certificates. The particulars of the students had already been uploaded on the web site <strong><u>nitkkr.ac.in</u></strong> before convocation. No request will be entertained later on for corrections if any. If there are any genuine grievances of the student, it will be entertained with due approval of the competent authority of the institute.</span></span></span></li>
                          <li><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"><u>PDF</u> &ndash; Store it permanently. Share it anywhere as and when required. </span></span></span></li>
                          <li><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"><u>.json file</u> &ndash; It&rsquo;s the tech version of your record. Store it along with your PDF. <strong><u>Do Not edit this file</u></strong> or else it will stop working. It can directly be uploaded on </span><a href="https://credentials.nitkkr.ac.in/verify">https://credentials.nitkkr.ac.in/verify</a><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"> and also on any independent verification platform like </span><a href="https://www.blockcerts.org"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"><span style="color:#1155cc">https://www.blockcerts.org</span></span></a><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">, </span><a href="https://www.certonce.com"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"><span style="color:#1155cc">https://www.certonce.com</span></span></a><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"> for verification purposes.</span></span></span></li>
                        </ul>
        
                        <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Please feel free to reach out to us for any query on </span><a href="mailto:examinations@nitkkr.ac.in"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"><span style="color:#1155cc">examinations@nitkkr.ac.in</span></span></a><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"> or on the Phone No. +01744-233208. </span></span></span></p>
        
                        <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">This Blockchain secured Diploma is valid for Employment and Immigration purposes as well.</span></span></span></span></p>
        
                        <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><a href="https://credentials.nitkkr.ac.in"><strong><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Click here</span></strong></a><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"> to know more about Digital Certification<strong><span style="color:red">&nbsp;</span></strong></span></span></span></span></p>
        
                        <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">We wish you all the success for future endeavors.</span></span></span></span></p>
        
                        <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Best Wishes,</span></span></span></span></p>
        
                        <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Associate Dean (Examinations)</span></span></span></span></p>
        
                        <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><strong><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">National Institute of Technology Kurukshetra</span></strong></span></span></span></p>
        
                        <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><strong><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Website: </span></strong><a href="https://nitkkr.ac.in/"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"><span style="color:#1155cc">https://nitkkr.ac.in/</span></span></a></span></span></span></p>
        
                        <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><strong><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">BENEFITS TO YOU:</span></strong></span></span></p>
        
                        <p>&nbsp;</p>
        
                        <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">These smart degrees will ensure that your college degrees and transcripts are stored on our server forever, which allows you the following benefits:</span></span></span></p>
        
                        <p>&nbsp;</p>
        
                        <ul>
                          <li><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Globally acceptable digital degrees that can never be lost or damaged </span></span></span></li>
                          <li><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Instantly verifiable (as compared to 3-4 weeks in case of paper degrees)</span></span></span></li>
                          <li><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">College verification whenever required, within seconds</span></span></span></li>
                        </ul>
        
                        <p>&nbsp;</p>
        
                        <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">This means no back-and-forth or waiting for weeks every time you need to get your degrees verified for a potential university or employer. To know more about smart degrees, watch this fun clip: </span></span></span></p>
        
                        <p>&nbsp;</p>
        
                        <hr />
                        <p>&nbsp;</p>
        
                        <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><strong><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">HOW TO VERIFY:</span></strong></span></span></p>
        
                        <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><strong><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">DIGITAL:</span></strong></span></span></p>
        
                        <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Click the link at the bottom of your blockchain-secured degree.</span></span></span></p>
        
                        <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><strong><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">PRINTED VERSION:</span></strong></span></span></p>
        
                        <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Scan the QR code at the bottom of your blockchain-secured paper based degree.</span></span></span></p>
        
                        <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">&nbsp;You will be instantly redirected to the Institute verification portal. You can view the original degree certificate with the college&rsquo;s Issuer key and date of issuing the certificate. </span></span></span></p>
        
                        <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">You can now share this certificate with your future employers or global institutions and get it instantly verified without waiting for weeks!</span></span></span></p>
        
                        `;
                        }
                        else
                        {
                          console.log("B Tech"); 
                          email_body=`
                          <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Dear ${first_name},</span></span></span></span></p>
        
                          <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><strong><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Congratulations</span></strong><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"> on the successful completion of your </span></span></span></span>${competency_name}<span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"> program at National Institute of Technology Kurukshetra. We are extremely proud of your achievements and accomplishments over the past years.</span></span></span></span></p>
                          
                          <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">We, at National Institute of Technology Kurukshetra, during our 19<sup>th</sup> Convocation are proud to award you with a<strong> Blockchain-secured&nbsp; Degree</strong> for your achievements. With this, you have the technology advantage over many others in today&rsquo;s time. </span></span></span></span></p>
                          
                          <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Your records have a lifetime value. <strong><em>Keep it safe.</em></strong></span></span></span></span></p>
                          
                          <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">The Digital Degree Certificate will be available to you in 3 formats:</span></span></span></span></p>
                          
                          <ul>
                            <li><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><u><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Printed Version</span></u><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">: The hardcopy will be presented to you during your convocation ceremony which will have a printed QR code redirecting your future employers or Higher Education Institutes in India and abroad to verify your certificates. The particulars of the students had already been uploaded on the web site <strong><u>nitkkr.ac.in</u></strong> before convocation. No request will be entertained later on for corrections if any. If there are any genuine grievances of the student, it will be entertained with due approval of the competent authority of the institute.</span></span></span></li>
                            <li><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"><u>PDF</u> &ndash; Store it permanently. Share it anywhere as and when required. </span></span></span></li>
                            <li><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"><u>.json file</u> &ndash; It&rsquo;s the tech version of your record. Store it along with your PDF. <strong><u>Do Not edit this file</u></strong> or else it will stop working. It can directly be uploaded on </span><a href="https://credentials.nitkkr.ac.in/verify"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"><span style="color:#1155cc">https://credentials.nitkkr.ac.in/verify</span></span></a><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"> and also on any independent verification platform like </span><a href="https://www.blockcerts.org"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"><span style="color:#1155cc">https://www.blockcerts.org</span></span></a><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">, </span><a href="https://www.certonce.com"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"><span style="color:#1155cc">https://www.certonce.com</span></span></a><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"> for verification purposes.</span></span></span></li>
                          </ul>
                          
                          <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Please feel free to reach out to us for any query on </span><a href="mailto:examinations@nitkkr.ac.in"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"><span style="color:#1155cc">examinations@nitkkr.ac.in</span></span></a><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"> or on the Phone No. +01744-233208. </span></span></span></p>
                          
                          <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">This Blockchain secured Diploma is valid for Employment and Immigration purposes as well.</span></span></span></span></p>
                          
                          <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><a href="https://credentials.nitkkr.ac.in"><strong><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Click here</span></strong></a><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"> to know more about Digital Certification<strong><span style="color:red">&nbsp;</span></strong></span></span></span></span></p>
                          
                          <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">We wish you all the success for future endeavors.</span></span></span></span></p>
                          
                          <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Best Wishes,</span></span></span></span></p>
                          
                          <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Associate Dean (Examinations)</span></span></span></span></p>
                          
                          <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><strong><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">National Institute of Technology Kurukshetra</span></strong></span></span></span></p>
                          
                          <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><strong><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Website: </span></strong><a href="https://nitkkr.ac.in/"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"><span style="color:#1155cc">https://nitkkr.ac.in/</span></span></a></span></span></span></p>
                          
                          <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><strong><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">BENEFITS TO YOU:</span></strong></span></span></p>
                          
                          <p>&nbsp;</p>
                          
                          <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">These smart degrees will ensure that your college degrees and transcripts are stored on our server forever, which allows you the following benefits:</span></span></span></p>
                          
                          <p>&nbsp;</p>
                          
                          <ul>
                            <li><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Globally acceptable digital degrees that can never be lost or damaged </span></span></span></li>
                            <li><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Instantly verifiable (as compared to 3-4 weeks in case of paper degrees)</span></span></span></li>
                            <li><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">College verification whenever required, within seconds</span></span></span></li>
                          </ul>
                          
                          <p>&nbsp;</p>
                          
                          <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">This means no back-and-forth or waiting for weeks every time you need to get your degrees verified for a potential university or employer. To know more about smart degrees, watch this fun clip: </span></span></span></p>
                          
                          <p>&nbsp;</p>
                          
                          <hr />
                          <p>&nbsp;</p>
                          
                          <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><strong><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">HOW TO VERIFY:</span></strong></span></span></p>
                          
                          <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">DIGITAL:</span></span></span></p>
                          
                          <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Click the link at the bottom of your blockchain-secured degree.</span></span></span></p>
                          
                          <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">PRINTED VERSION:</span></span></span></p>
                          
                          <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Scan the QR code at the bottom of your blockchain-secured paper based degree.</span></span></span></p>
                          
                          <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">&nbsp;You will be instantly redirected to the Institute verification portal. You can view the original degree certificate with the college&rsquo;s Issuer key and date of issuing the certificate. </span></span></span></p>
                          
                          <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">You can now share this certificate with your future employers or global institutions and get it instantly verified without waiting for weeks!</span></span></span></p>
                          
                      `;
                        }
        
                      }
                      else if(puserid == "20081")
                      { 
                        //Bachelor of Technology
                        let year=signedcertificatepdfurl.split("/")[signedcertificatepdfurl.split("/").length-2];
                        pdfurl=`https://digicert.charusat.ac.in/certificatepdf/${year}/${pdfid}`;
                        jsonurl=`https://digicert.charusat.ac.in/certificate/${year}/${pdfid}`;      
                        let institute_name=student['institute_name'];    
                        if(institute_name==null) institute_name="";                 
                        cert_email_subject = `Your Blockchain-Secured Degree`;
                        //if(competency_name.indexOf("Bachelor of Technology")!==-1 && institute_name.indexOf("Indian Institute of Information Technology Sonepat")!==-1)//IIITS
                        
                      email_body=`
                      <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Dear ${first_name},</span></span></span></span></p>
        
                      <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><strong><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Congratulations</span></strong><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"> on the successful completion of your program at Charotar University of Science and Technology. We are extremely proud of your achievements and accomplishments over the past years.</span></span></span></span></p>
        
                      <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">We are proud to award you with a<strong> Blockchain-secured&nbsp; Degree</strong> for your achievements. With this, you have the technology advantage over many others in today&rsquo;s time. </span></span></span></span></p>
        
                      <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Your records have a lifetime value. <strong><em>Keep it safe.</em></strong></span></span></span></span></p>
        
                      <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">The Digital Degree Certificate will be available to you in 3 formats:</span></span></span></span></p>
        
                      <ul>
                        <li><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Smart PDF &ndash; Store it permanently. Share it anywhere as and when required. </span></span></span></li>
                        <li><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">.json file &ndash; It&rsquo;s the tech version of your record. Store it along with your Smart PDF. </span></span></span></li>
                      </ul>
        
                      <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><strong><u><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Do Not edit this file</span></u></strong><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"> or else it will stop working.</span></span></span></p>
        
                      <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">It can directly be uploaded on </span><a href="https://digicert.charusat.ac.in/"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"><span style="color:#1155cc">https://digicert.charusat.ac.in/</span></span></a><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"> and also on any independent verification platform like </span><a href="https://www.blockcerts.org"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"><span style="color:#1155cc">https://www.blockcerts.org</span></span></a><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">, </span><a href="https://www.certonce.com"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"><span style="color:#1155cc">https://www.certonce.com</span></span></a><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"> for verification purposes.</span></span></span></p>
        
                      <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Please feel free to reach out to us for any query on </span><a href="mailto:certificate@charusat.edu.in"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"><span style="color:#1155cc">certificate@charusat.edu.in</span></span></a><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"> or on the Phone No. 02697265011. </span></span></span></p>
        
                      <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><a href="https://digicert.charusat.ac.in/"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"><span style="color:#1155cc">Click here</span></span></a><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"> to know more about Digital Certification</span></span></span></p>
        
                      <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">We wish you all the success for future endeavors.</span></span></span></span></p>
        
                      <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Best Wishes,</span></span></span></span></p>
        
                      <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Exam Controller</span></span></span></span></p>
        
                      <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><strong><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Charotar University of Science and Technology</span></strong></span></span></span></p>
        
                      <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><strong><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Website:</span></strong><a href="https://abcinstitute.ac.in"><strong> </strong></a><a href="https://www.charusat.ac.in/"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;"><span style="color:#1155cc">https://www.charusat.ac.in/</span></span></a></span></span></span></p>
        
                      <p>&nbsp;</p>
        
                      <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><strong><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">BENEFITS TO YOU:</span></strong></span></span></p>
        
                      <p>&nbsp;</p>
        
                      <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">These smart degrees will ensure that your college degrees and transcripts are stored on our server forever, which allows you the following benefits:</span></span></span></p>
        
                      <p>&nbsp;</p>
        
                      <ul>
                        <li><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Globally acceptable digital degrees that can never be lost or damaged </span></span></span></li>
                        <li><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Instantly verifiable (as compared to 3-4 weeks in case of paper degrees)</span></span></span></li>
                        <li><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">College verification whenever required, within seconds</span></span></span></li>
                      </ul>
        
                      <p>&nbsp;</p>
        
                      <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">This means no back-and-forth or waiting for weeks every time you need to get your degrees verified for a potential university or employer. </span></span></span></p>
        
                      <p>&nbsp;</p>
        
                      <hr />
                      <p>&nbsp;</p>
        
                      <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><strong><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">HOW TO VERIFY:</span></strong></span></span></p>
        
                      <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Click the link at the bottom of your blockchain-secured degree. It will redirect you/ the verifier to the verification page.</span></span></span></p>
        
                      `;
                        
                        
        
                      }
                      else if(puserid == "20091" || puserid=="30")
                      {             
                        cert_email_subject = `Your Blockchain-Secured Degree/Transcript at Galgotias University!`;
                        email_body=`
                        <p>Dear ${fullname},</p>
        
                        <p>Congratulations on your remarkable achievement and successful completion of your program at Galgotias University. We are thrilled to extend our heartfelt congratulations on your journey of growth and excellence.</p>
        
                        <p>At Galgotias University, we take immense pride in recognizing your accomplishments by conferring upon you a Blockchain-secured Degree/Transcript. This not only celebrates your achievements but also equips you with a technological edge that holds great significance in today&#39;s rapidly evolving world.</p>
        
                        <p>Your academic records, embodying your hard work and dedication, now possess a lasting value. Safeguarding these records is of utmost importance.</p>
        
                        <p>Your Digital Degree/Transcript Certificate is available in three formats:</p>
        
                        <p>1. Printed Version: During your upcoming convocation ceremony, you will receive a hardcopy of your certificate. This physical certificate will include a QR code that allows prospective employers and educational institutions, both in India and abroad, to promptly verify your credentials. Scan the QR code on your paper-based blockchain-secured Degree/Transcript. This action will promptly redirect you to the University&rsquo;s verification portal.</p>
        
                        <p>2. Smart PDF Format: This version provides a portable and easily shareable format for your certificate. Store it securely for instant access when needed. Simply click the link located at the bottom of your blockchain-secured Degree/Transcript to verify.</p>
        
                        <p>3. .json File: As a tech-oriented version of your record, this file complements the PDF. It should not be edited, as any alterations could render it inoperative. You have the option to upload it on https://certificates.galgotiasuniversity.edu.in/ or other independent verification platforms like https://www.blockcerts.org and https://www.certonce.com for efficient verification.</p>
        
                        <p>Should you have any queries or require further assistance, please don&#39;t hesitate to contact us at registrar@galgotiasuniversity.edu.in. Additionally, rest assured that this Blockchain-secured Documents holds validity for both employment and immigration purposes.</p>
        
                        <p>As you embark on your future endeavors, we extend our best wishes for continued success and accomplishments.</p>
        
                        <p><br />
                        Benefits for You:<br />
                        Our innovative smart Degrees/Transcripts bring forth a host of benefits that ensure the safety and accessibility of your academic records:</p>
        
                        <p>- Global Acceptance: Your digital Degrees/Transcripts are universally recognized and immune to loss or damage.<br />
                        - Instant Verification: Unlike the traditional 3-4 week verification process for paper Degrees/Transcripts, your digital credentials can be verified instantly.<br />
                        - Effortless University Verification: Whenever required, you can swiftly verify your Degree/Transcript without any delays or complications.</p>
        
                        <p>Now, you can share your certificate with prospective employers and institutions worldwide, ensuring rapid and hassle-free verification.</p>
        
                        <p>Warm regards,</p>
        
                        <p><br />
                        Registrar<br />
                        Galgotias University<br />
                        https://www.galgotiasuniversity.edu.in/<br />
                        &nbsp;</p>
        
                        `;
                        if(cohortfullid=="Alumni_2022_3545" || cohortfullid=="Alumni_2021")
                        {
                          cert_email_subject = `Blockchain Secured Digital Degree for Alumni of Galgotias University`;
                          email_body=`
                          <p>Dear ${fullname},</p>
          
                          <p style="background-color:#ffffff;line-height:1.595;margin-bottom:0pt;margin-top:10pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">You are a proud Alumnus of Galgotias University.&nbsp;</span></span></p>
                          <p style="background-color:#ffffff;line-height:1.595;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">We are pleased to inform you that we have made your degree instantly verifiable using Blockchain secured Digital PDF.&nbsp;</span></span></p>
                          <p style="background-color:#ffffff;line-height:1.595;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>What does it mean to you?</strong></span></span></p>
                          <p style="background-color:#ffffff;line-height:1.595;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">It solves the problem of your degree verification whenever you apply for a new job or higher education.&nbsp;</span></span></p>
                          <p style="background-color:#ffffff;line-height:1.595;margin-bottom:0pt;margin-top:0pt;padding:10pt 0pt 0pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">This PDF can be shared with your potential employers, and potential Universities for further education</span></span></p>
                          <p style="background-color:#ffffff;line-height:1.595;margin-bottom:0pt;margin-top:0pt;padding:10pt 0pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>How does it work?</strong></span></span></p>
                          <p style="background-color:#ffffff;line-height:1.595;margin-bottom:0pt;margin-top:0pt;padding:10pt 0pt 0pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your digital PDF will have this footer.&nbsp;</span></span></p>
                          <p style="background-color:#ffffff;line-height:1.595;margin-bottom:0pt;margin-top:0pt;padding:20pt 0pt 0pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="border-style:none;display:inline-block;font-style:normal;font-variant:normal;font-weight:400;height:64px;overflow:hidden;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;width:427px;"><img style="margin-left:0px;margin-top:0px;" src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXc5YqZCzw-vfCXs18wHFoLoDbdrEd6CIatL5eeDwNuNEfsvSJkX6wJvDVCnkjpolOSYkOLPTIeMaL97F0X6B9082FSL53QHTfj52agwIGdlO0yagExZcICqsLz3nkYkBLKnIg9ioyX-icp_tF4TmsGf4Jpy3iDQ3UOErxOlvUjoQtj5ydBrYw?key=7vt52EvhhDGaFMKmNb7jRw" width="427" height="64"></span></span></p>
                          <p style="background-color:#ffffff;line-height:1.595;margin-bottom:0pt;margin-top:0pt;padding:20pt 0pt 0pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">You or your verifier just has to click on the Golgotias logo and it will display your actual degree on Galgotias University website for instant verification.&nbsp;</span></span></p>
                          <p style="background-color:#ffffff;line-height:1.595;margin-bottom:0pt;margin-top:0pt;padding:20pt 0pt 0pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>What if the verifier wants a copy in mail?</strong></span></span></p>
                          <p style="background-color:#ffffff;line-height:1.595;margin-bottom:0pt;margin-top:0pt;padding:20pt 0pt 0pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">The verifier can also request for an official e-mail from your alma-mater for records purpose by applying through the link on the website.&nbsp;</span></span></p>
                          <p style="background-color:#ffffff;line-height:1.595;margin-bottom:0pt;margin-top:0pt;padding:20pt 0pt 0pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Even you can click on the link and send it to your prospective employer and the mail will go from your official institute ID.</span></span></p>
                          <p style="background-color:#ffffff;line-height:1.595;margin-bottom:0pt;margin-top:0pt;padding:20pt 0pt 0pt;" dir="ltr">&nbsp;</p>
                          <p style="background-color:#ffffff;line-height:1.595;margin-bottom:0pt;margin-top:0pt;padding:10pt 0pt 0pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">In addition you will also get a .json that you or verifier can upload the JSON file on&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://certificates.galgotiasuniversity.edu.in/"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://certificates.galgotiasuniversity.edu.in/</u></span></span></a><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> to verify.</span></span></p>
                          <p style="background-color:#ffffff;line-height:1.595;margin-bottom:0pt;margin-top:0pt;padding:10pt 0pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">If you encounter any difficulties or have questions regarding the Degree or the process. Please feel free to contact us at&nbsp;</span></span><a style="text-decoration:none;" href="mailto:certificate@galgotiasuniversity.edu.in"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>certificate@galgotiasuniversity.edu.in</u></span></span></a><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">.&nbsp; We hope you find our innovative verification system beneficial.</span></span></p>
                          <p style="background-color:#ffffff;line-height:1.595;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr">&nbsp;</p>
                          <p style="background-color:#ffffff;line-height:1.595;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Thank you</span></span></p>
                          <p style="background-color:#ffffff;line-height:1.595;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Best Regards</span></span></p>
                          <p style="background-color:#ffffff;line-height:1.595;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Registrar</span></span></p>
                          <p style="background-color:#ffffff;line-height:1.595;margin-bottom:10pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Galgotias University</span></span></p>
                          <p><img class="image_resized" style="width:100px;" src="https://www.certonce.com/images/Galgotias/logo.png"></p>
                          `;
                        }
                        
        
                      }
                      else if(puserid == "20094")
                      { 
                      
                      let lastelement=signedcertificateurl.split("/")[signedcertificateurl.split("/").length-1];
                      let year=signedcertificateurl.split("/")[signedcertificateurl.split("/").length-2];                
                      pdfurl=`https://certification.mietjmu.in/pdf/${year}/${lastelement.replace(".json","")}`;
                      jsonurl=`https://certification.mietjmu.in/certificate/${year}/${lastelement.replace(".json","")}`;
                        
                        
                      let institute_name=student['institute_name'];    
                      if(institute_name==null) institute_name="";                 
                      cert_email_subject = `Your Blockchain-Secured Provisional Certificate/Transcript at the Model Institute of Engineering and Technology(Autonomous), Jammu!`;
                        //if(competency_name.indexOf("Bachelor of Technology")!==-1 && institute_name.indexOf("Indian Institute of Information Technology Sonepat")!==-1)//IIITS
                        
                      email_body=`
                      <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Dear ${first_name},</span></span></span></span></p>
        
                      <p><span style="font-size:11.0pt"><span style="font-family:&quot;Cambria&quot;,&quot;serif&quot;">Congratulations on your remarkable achievement and successful completion of your program at the Model Institute of Engineering and Technology, Jammu. We are thrilled to extend our heartfelt congratulations on your journey of growth and excellence.</span></span></p>
        
                      <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Cambria&quot;,&quot;serif&quot;">At MIET, we take immense pride in recognizing your accomplishments by conferring upon you a Blockchain-secured Provisional Certificate/Transcript. This not only celebrates your achievements but also equips you with a technological edge that holds great significance in today&#39;s rapidly evolving world.</span></span></span></p>
        
                      <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Cambria&quot;,&quot;serif&quot;">Your academic records, embodying your hard work and dedication, now possess a lasting value. Safeguarding these records is of utmost importance.</span></span></span></p>
        
                      <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Cambria&quot;,&quot;serif&quot;">1. Printed Version: You will be handed a physical Certificate. This certificate will include a QR code that allows prospective employers and educational institutions, both in India and abroad, to promptly verify your credentials. Scan the QR code on your paper-based blockchain-secured Provisional Certificate/Transcript. This action will promptly redirect you to the University&rsquo;s verification portal.</span></span></span></p>
        
                      <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Cambria&quot;,&quot;serif&quot;">2. Smart PDF Format: This version provides a portable and easily shareable format for your certificate. Store it securely for instant access when needed. Simply click the link located at the bottom of your blockchain-secured Provisional Certificate/Transcript to verify.</span></span></span></p>
        
                      <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Cambria&quot;,&quot;serif&quot;">3. .json File: As a tech-oriented version of your record, this file complements the PDF. It should not be edited, as any alterations could render it inoperative. You have the option to upload it on https://certification.mietjmu.in/ or other independent verification platforms like https://www.blockcerts.org and https://www.certonce.com for efficient verification.</span></span></span></p>
        
                      <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Cambria&quot;,&quot;serif&quot;">Should you have any queries or require further assistance, please don&#39;t hesitate to contact us at </span><a href="mailto:coe@mietjammu.in"><span style="font-family:&quot;Cambria&quot;,&quot;serif&quot;"><span style="color:#1155cc">coe@mietjammu.in</span></span></a><span style="font-family:&quot;Cambria&quot;,&quot;serif&quot;"> or call us at 7889395696. Additionally, rest assured that this Blockchain-secured Diploma holds validity for both employment and immigration purposes.</span></span></span></p>
        
                      <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Cambria&quot;,&quot;serif&quot;">As you embark on your future endeavors, we extend our best wishes for continued success and accomplishments.</span></span></span></p>
        
                      <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><u><span style="font-family:&quot;Cambria&quot;,&quot;serif&quot;">Benefits for You:</span></u></span></span></p>
        
                      <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Cambria&quot;,&quot;serif&quot;">Our innovative smart Provisional Certificates/Transcripts bring forth a host of benefits that ensure the safety and accessibility of your academic records:</span></span></span></p>
        
                      <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Cambria&quot;,&quot;serif&quot;">- Global Acceptance: Your digital Provisional Certificates/Transcripts are universally recognized and immune to loss or damage.</span></span></span></p>
        
                      <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Cambria&quot;,&quot;serif&quot;">- Instant Verification: Unlike the traditional 3-4 week verification process for paper Provisional Certificates/Transcripts, your digital credentials can be verified instantly.</span></span></span></p>
        
                      <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Cambria&quot;,&quot;serif&quot;">- Effortless University Verification: Whenever required, you can swiftly verify your Provisional Certificates/Transcript without any delays or complications.</span></span></span></p>
        
                      <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Cambria&quot;,&quot;serif&quot;">Now, you can share your certificate with prospective employers and institutions worldwide, ensuring rapid and hassle-free verification.</span></span></span></p>
        
                      <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Cambria&quot;,&quot;serif&quot;">Warm regards,</span></span></span></p>
        
                      <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Cambria&quot;,&quot;serif&quot;">Prof. Ankur Gupta</span></span></span></p>
        
                      <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Cambria&quot;,&quot;serif&quot;">Director, MIET</span></span></span></p>
        
                      <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Cambria&quot;,&quot;serif&quot;">Model Institute of Engineering and Technology,(Autonomous), Jammu</span></span></span></p>
        
                      <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><a href="http://www.mietjmu.in"><span style="font-family:&quot;Cambria&quot;,&quot;serif&quot;"><span style="color:#1155cc">www.mietjmu.in</span></span></a></span></span></p>
        
                      <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Cambria&quot;,&quot;serif&quot;"><span style="color:#1155cc"><img alt="" src="https://www.certonce.com/images/miet/mietkalogo.png" style="height:100px; width:284px" /></span></span></span></span></p>
        
                      `;
                        
                        
        
                      }
                      // else if(puserid == "20088")
                      else if(puserid == "20088" || puserid == "20")
                      { 
                      
                        lastelement=signedcertificateurl.split("/")[signedcertificateurl.split("/").length-1];
                        // var collegeid=signedcertificateurl.split("/")[signedcertificateurl.split("/").length-3];                  
                        pdfurl=`https://certification.ljku.edu.in/pdf/${lastelement.replace(".json","")}`;
                        jsonurl=`https://certification.ljku.edu.in/certificate/${lastelement.replace(".json","")}`;
                        qrcodeurl = `https://certification.ljku.edu.in/image/${lastelement.replace(".json","")}`;
                        
                        
                      let institute_name=student['institute_name'];    
                      if(institute_name==null) institute_name="";                 
                      cert_email_subject = `Your Blockchain-Secured Degree at the Lok Jagruti Kendra University`;
                        //if(competency_name.indexOf("Bachelor of Technology")!==-1 && institute_name.indexOf("Indian Institute of Information Technology Sonepat")!==-1)//IIITS
                        
                      email_body=`
                      <p><span style="font-size:11pt"><span style="background-color:white"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Georgia&quot;,&quot;serif&quot;">Dear ${fullname}</span></span></span></span></p>
        
                      <p><span style="font-size:11pt"><span style="font-family:Cambria,serif"><span style="color:#000000">Congratulations on your remarkable achievement and successful completion of your program at the Lok Jagruti Kendra University. We are thrilled to extend our heartfelt congratulations on your journey of growth and excellence.</span></span></span></p>
                      
                      <p><span style="font-size:11pt"><span style="font-family:Cambria,serif"><span style="color:#000000">At Lok Jagruti Kendra University, we take immense pride in recognizing your accomplishments by conferring upon you a Blockchain-secured Degree. This not only celebrates your achievements but also equips you with a technological edge that holds great significance in today&#39;s rapidly evolving world.</span></span></span></p>
                      
                      <p><span style="font-size:11pt"><span style="font-family:Cambria,serif"><span style="color:#000000">Your academic records, embodying your hard work and dedication, now possess a lasting value. Safeguarding these records is of utmost importance.</span></span></span></p>
                      
                      <p><span style="font-size:11pt"><span style="font-family:Cambria,serif"><span style="color:#000000">Your Digital Degree Certificate is available in three formats:</span></span></span></p>
                      
                      <p><span style="font-size:11pt"><span style="font-family:Cambria,serif"><span style="color:#000000">1. Printed Version: You will be handed a physical Certificate. This certificate will include a QR code that allows prospective employers and educational institutions, both in India and abroad, to promptly verify your credentials. Scan the QR code on your paper-based blockchain-secured Lok Jagruti Kendra University Degree. This action will promptly redirect you to the University&rsquo;s verification portal.</span></span></span></p>
                      
                      <p><span style="font-size:11pt"><span style="font-family:Cambria,serif"><span style="color:#000000">2. Smart PDF Format: This version provides a portable and easily shareable format for your certificate. Store it securely for instant access when needed. Simply click the link located at the bottom of your blockchain-secured Degree to verify.</span></span></span></p>
                      
                      <p><span style="font-size:11pt"><span style="font-family:Cambria,serif"><span style="color:#000000">3. .json File: As a tech-oriented version of your record, this file complements the PDF. It should not be edited, as any alterations could render it inoperative. You have the option to upload it on https://certification.ljku.edu.in/ or other independent verification platforms like https://www.blockcerts.org and https://www.certonce.com for efficient verification.</span></span></span></p>
                      
                      <p><span style="font-size:11pt"><span style="font-family:Cambria,serif"><span style="color:#000000">Should you have any queries or require further assistance, please don&#39;t hesitate to contact us at registrar@ljku.edu.in. Additionally, rest assured that this Blockchain-secured Degree holds validity for both employment and immigration purposes.</span></span></span></p>
                      
                      <p><span style="font-size:11pt"><span style="font-family:Cambria,serif"><span style="color:#000000">As you embark on your future endeavors, we extend our best wishes for continued success and accomplishments.</span></span></span></p>
                      
                      <p><span style="font-size:11pt"><span style="font-family:Cambria,serif"><span style="color:#000000">Benefits for You:</span></span></span></p>
                      
                      <p><span style="font-size:11pt"><span style="font-family:Cambria,serif"><span style="color:#000000">Our innovative smart Degree brings forth a host of benefits that ensure the safety and accessibility of your academic records:</span></span></span></p>
                      
                      <p><span style="font-size:11pt"><span style="font-family:Cambria,serif"><span style="color:#000000">- Global Acceptance: Your Digital Smart Degree is universally recognized and immune to loss or damage.</span></span></span></p>
                      
                      <p><span style="font-size:11pt"><span style="font-family:Cambria,serif"><span style="color:#000000">- Instant Verification: Unlike the traditional 3-4 week verification process for paper Degree, your digital credentials can be verified instantly.</span></span></span></p>
                      
                      <p><span style="font-size:11pt"><span style="font-family:Cambria,serif"><span style="color:#000000">- Effortless University Verification: Whenever required, you can swiftly verify your Smart Degree without any delays or complications.</span></span></span></p>
                      
                      <p><span style="font-size:11pt"><span style="font-family:Cambria,serif"><span style="color:#000000">Now, you can share your certificate with prospective employers and institutions worldwide, ensuring rapid and hassle-free verification.</span></span></span></p>
                      
                      <p><span style="font-size:11pt"><span style="font-family:Cambria,serif"><span style="color:#000000">Warm regards,</span></span></span></p>
                      
                      <p><span style="font-size:11pt"><span style="font-family:Cambria,serif"><span style="color:#000000">Minesh Shah</span></span></span></p>
                      
                      <p><span style="font-size:11pt"><span style="font-family:Cambria,serif"><span style="color:#000000">Registrar</span></span></span></p>
                      
                      <p><span style="font-size:11pt"><span style="font-family:Cambria,serif"><span style="color:#000000">https://www.ljku.edu.in</span></span></span></p>
                      
                      <p>&nbsp;</p>
                      
                      <p>&nbsp;</p>
                      
                      <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;"><span style="font-family:&quot;Cambria&quot;,&quot;serif&quot;"><span style="color:#1155cc"><img alt="" src="https://www.certonce.com/images/LJKU/emaillogo.png" style="height:100px" /></span></span></span></span></p>
                      `;
                      }
                      else if(puserid == "20099")
                      {  
                        lastelement=signedcertificateurl.split("/")[signedcertificateurl.split("/").length-1];
                        year=signedcertificateurl.split("/")[signedcertificateurl.split("/").length-2];                
                        pdfurl=`https://certverify.s3.ap-south-1.amazonaws.com/pdf/${year}/${lastelement.replace(".json",".pdf")}`;
                        jsonurl=`https://certverify.s3.ap-south-1.amazonaws.com/json/${year}/${lastelement}`;
                        printpdf = `https://verification.cutm.ac.in/print/${year}/${lastelement.replace(".json","")}`;
                        qrcodeurl = `https://verification.cutm.ac.in/qrcode/${year}/${lastelement.replace(".json","")}`;               
                        if(certtype=="transcript") 
                        {
                          
                          cert_email_subject = `Your Blockchain-Secured Transcript Certificate at the Centurion University of Technology and Management, Odisha`;  
                          email_body=`<p style="color: black;">Dear ${fullname},</p>
                          <p>Congratulations on your remarkable achievement and successful completion of your program at the Centurion University of Technology and Management. We are thrilled to extend our heartfelt congratulations on your journey of growth and excellence.</p>
        
                          <p>At Centurion University, we take immense pride in recognizing your accomplishments by conferring upon you a Blockchain-secured Transcript Certificate. This not only celebrates your achievements but also equips you with a technological edge that holds great significance in today&#39;s rapidly evolving world.</p>
        
                          <p>Your academic records, embodying your hard work and dedication, now possess a lasting value. Safeguarding these records is of utmost importance.</p>
        
                          <p>Your Transcript Certificate is available in three formats:</p>
        
                          <p>1. Printed Version: You will be handed a physical Certificate. This certificate will include a QR code that allows prospective employers and educational institutions, both in India and abroad, to promptly verify your credentials. Scan the QR code on your paper-based blockchain-secured Centurion University of Technology and Management Degree certificate. This action will promptly redirect you to the University&rsquo;s verification portal.</p>
        
                          <p>2. Smart PDF Format: This version provides a portable and easily shareable format for your certificate. Store it securely for instant access when needed. Simply click the link located at the bottom of your blockchain-secured Transcript certificate to verify.</p>
        
                          <p>3. .json File: As a tech-oriented version of your record, this file complements the PDF. It should not be edited, as any alterations could render it inoperative. You have the option to upload it on https://verification.cutm.ac.in/ or other independent verification platforms like https://www.blockcerts.org and https://www.certonce.com for efficient verification.</p>
        
                          <p>Should you have any queries or require further assistance, please don&#39;t hesitate to contact us at qa@cutm.ac.in or call us at +91 8763178520. Additionally, rest assured that this Blockchain-secured certificate holds validity for both employment and immigration purposes.</p>
        
                          <p>As you embark on your future endeavors, we extend our best wishes for continued success and accomplishments.</p>
        
                          <p><br />
                          Benefits for You:<br />
                          Our innovative smart Transcript certificate bring forth a host of benefits that ensure the safety and accessibility of your academic records:</p>
        
                          <p>- Global Acceptance: Your digital Transcript certificates are universally recognized and immune to loss or damage.<br />
                          - Instant Verification: Unlike the traditional 3-4 week verification process for paper Transcript certificate, your digital credentials can be verified instantly.<br />
                          - Effortless University Verification: Whenever required, you can swiftly verify your Transcript certificate without any delays or complications.</p>
        
                          <p>Now, you can share your certificate with prospective employers and institutions worldwide, ensuring rapid and hassle-free verification.</p>
        
                          <p>Warm regards,</p>
        
                          <p>Dr. Jyoti sayantani<br />
                          Controller of Examination<br />
                          Centurion University of Technology and Management, Odisha<br />
                          www.cutm.ac.in<br />
                          &nbsp;</p>
                          `;
                        }
                        else
                        {
                          cert_email_subject = `Your Blockchain-Secured Degree Certificate at the Centurion University of Technology and Management, Odisha`;  
                          email_body=`<p style="color: black;">Dear ${fullname},</p>
                          <p>Congratulations on your remarkable achievement and successful completion of your program at the Centurion University of Technology and Management. We are thrilled to extend our heartfelt congratulations on your journey of growth and excellence.</p>
        
                          <p>At Centurion University, we take immense pride in recognizing your accomplishments by conferring upon you a Blockchain-secured Degree Certificate. This not only celebrates your achievements but also equips you with a technological edge that holds great significance in today&#39;s rapidly evolving world.</p>
        
                          <p>Your academic records, embodying your hard work and dedication, now possess a lasting value. Safeguarding these records is of utmost importance.</p>
        
                          <p>Your Digital Degree Certificate is available in three formats:</p>
        
                          <p>1. Printed Version: You will be handed a physical Certificate. This certificate will include a QR code that allows prospective employers and educational institutions, both in India and abroad, to promptly verify your credentials. Scan the QR code on your paper-based blockchain-secured Centurion University of Technology and Management Degree certificate. This action will promptly redirect you to the University&rsquo;s verification portal.</p>
        
                          <p>2. Smart PDF Format: This version provides a portable and easily shareable format for your certificate. Store it securely for instant access when needed. Simply click the link located at the bottom of your blockchain-secured Degree certificate to verify.</p>
        
                          <p>3. .json File: As a tech-oriented version of your record, this file complements the PDF. It should not be edited, as any alterations could render it inoperative. You have the option to upload it on https://verification.cutm.ac.in/ or other independent verification platforms like https://www.blockcerts.org and https://www.certonce.com for efficient verification.</p>
        
                          <p>Should you have any queries or require further assistance, please don&#39;t hesitate to contact us at qa@cutm.ac.in or call us at +91 8763178520. Additionally, rest assured that this Blockchain-secured certificate holds validity for both employment and immigration purposes.</p>
        
                          <p>As you embark on your future endeavors, we extend our best wishes for continued success and accomplishments.</p>
        
                          <p><br />
                        Benefits for You:<br />
                        Our innovative smart Degree certificate bring forth a host of benefits that ensure the safety and accessibility of your academic records:</p>
        
                        <p>- Global Acceptance: Your digital Degree certificates are universally recognized and immune to loss or damage.<br />
                        - Instant Verification: Unlike the traditional 3-4 week verification process for paper Degree certificate, your digital credentials can be verified instantly.<br />
                        - Effortless University Verification: Whenever required, you can swiftly verify your Degree certificate without any delays or complications.</p>
        
                        <p>Now, you can share your certificate with prospective employers and institutions worldwide, ensuring rapid and hassle-free verification.</p>
        
                        <p>Warm regards,</p>
        
                        <p>Dr. Jyoti sayantani<br />
                        Controller of Examination<br />
                        Centurion University of Technology and Management, Odisha<br />
                        www.cutm.ac.in<br />
                        &nbsp;</p>
                          `;
                        }
                      }
                      else if(puserid == "20102" || puserid == "24")//gcu
                      { 
                        pdfurl=`https://verify.gardencity.university/pdf/${lastelement.replace(".json","")}`;
                        jsonurl=`https://verify.gardencity.university/certificate/${lastelement.replace(".json","")}`;                
                        printpdf=`https://verify.gardencity.university/print/${lastelement.replace(".json","")}`;   
                        
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
                        let insertQuery = format(`insert into verifyrequest (fullname, accountid, cohortid, studentid, pdfurl, payer_name, onetimecode,onetimeblockcertscode, designation, organization, email, contactnumber, documentid, enrollnumber, certificatetype, issendcase) values ('${fullname}', '${puserid}', '${cohortid}', '${studentid}', '${pdfurl}','${fullname}','${onetimecode}','', '', '','${email}','', '${lastelement.replace(".json","")}', '${studentmainid}', '${certtype}', true) returning id`);                
                        let insertResult = await pool.query(insertQuery);                
                        
                        
                        cert_email_subject = `Your Blockchain-Secured Degree at the GARDEN CITY UNIVERSITY!`;  
                        email_body=`<p style="background-color:white;line-height:150%;margin:10.0pt 0in;"><span style="font-family:&quot;Cambria&quot;,serif;font-size:12.0pt;"><span style="line-height:150%;" lang="EN" dir="ltr">Dear ${fullname},</span></span></p>
                        <p>
                          <meta charset="utf-8">
                            </p>
                            <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:10pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Congratulations on successfully graduating at Garden City University. We are pleased to inform you that your Degree is now available for viewing and verification.</span></span></p>
                            <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">How to access your Degree</span></span></p>
                            <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:10pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">You will receive your Degree in 3 formats:</span></span></p>
                            <ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
                                <li style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Digital Smart PDF: Your digital PDF will have a logo to click and verify. This PDF can be shared with your potential employers, and potential Universities for further education.</span></span></li>
                                <li style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Print Version: Scan the QR code, to verify.</span></span></li>
                                <li style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">JSON: Can be uploaded for verification on&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://verify.gardencity.university/"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://verify.gardencity.university/</u></span></span></a></li>
                            </ol>
                            <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:10pt;margin-top:10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Experience our new verification process</span></span></p>
                            <ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
                                <li style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Click on the logo, Scan the QR code or upload the JSON file on&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://verify.gardencity.university/"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://verify.gardencity.university/</u></span></span></a></li>
                                <li style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">You will be redirected to a secure portal to add your one-time code</span></span></li>
                            </ol>
                            <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:10pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Please note the one-time code is solely for the purpose of demonstration of the verification and will only be valid for a single access. You will have the opportunity to view and verify the authenticity of your Degree only once on our Blockchain-based verification system.</span></span></p>
                            <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your one-time code:&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>${onetimecode}</strong></span></span></p>
                            <p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Verifier Verification Process:</span></span></p>
                            <ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
                                <li style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Verifiers will need to click the logo on the PDF, scan the QR code or upload the JSON file on&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://verify.gardencity.university/"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://verify.gardencity.university/</u></span></span></a><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> and proceed to pay a fee of ₹800, they will receive a one-time code which will be active for 15 days.</span></span></li>
                            </ul>
                            <ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
                                <li style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your verifiers can also click on the request an official email button after submitting the One time code to receive an official email from the University confirming your credentials.</span></span></li>
                            </ul>
                            <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:10pt;padding:0pt 0pt 10pt;" dir="ltr">&nbsp;</p>
                            <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">If you encounter any difficulties or have questions regarding the Degree or the process. Please feel free to contact us at [University number] or [University email address]. We hope you find our innovative verification system beneficial.</span></span></p>
                            <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Thank you</span></span></p>
                            <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Best Regards</span></span></p>
                            <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Registrar</span></span></p>
                            <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:10pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Garden City University</span></span></p>
                        <p><img src="https://www.certonce.com/images/GCU/gcu_logo.png" height="110px"></p>
        
                        `;
                      }
                      else if(puserid == "20103" || puserid == "32") // medicaps
                      { 
                        pdfurl=`https://verification.medicaps.ac.in/pdf/${lastelement.replace(".json","")}`;
                        jsonurl=`https://verification.medicaps.ac.in/certificate/${lastelement.replace(".json","")}`;                
                        printpdf=`https://verification.medicaps.ac.in/print/${lastelement.replace(".json","")}`;   
                        
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
                        // let insertQuery = format(`insert into verifyrequest (fullname, accountid, cohortid, studentid, pdfurl, payer_name, onetimecode,onetimeblockcertscode, designation, organization, email, contactnumber, documentid) values ('${fullname}', '${puserid}', '${cohortid}', '${studentid}', '${pdfurl}','${fullname}','${onetimecode}','', '', '','${email}','', '${lastelement.replace(".json","")}') returning id`);   
                        let insertQuery = format(`insert into verifyrequest (fullname, accountid, cohortid, studentid, pdfurl, payer_name, onetimecode,onetimeblockcertscode, designation, organization, email, contactnumber, documentid, enrollnumber, certificatetype, issendcase) values ('${fullname}', '${puserid}', '${cohortid}', '${studentid}', '${pdfurl}','${fullname}','${onetimecode}','', '', '','${email}','', '${lastelement.replace(".json","")}', '${studentmainid}', '${certtype}', true) returning id`);                 
                        let insertResult = await pool.query(insertQuery);                
                        
                        
                        cert_email_subject = `Your Blockchain-Secured Degree at the Medi-Caps University!`;  
                        email_body=`<p style="background-color:white;line-height:150%;margin:10.0pt 0in;"><span style="font-family:&quot;Cambria&quot;,serif;font-size:12.0pt;"><span style="line-height:150%;" lang="EN" dir="ltr">Dear ${fullname},</span></span></p>
                        <p>
                          <meta charset="utf-8">
                            </p>
                            <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:10pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Congratulations on successfully graduating at Medi-Caps University. We are pleased to inform you that your Degree is now available for viewing and verification.</span></span></p>
                            <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">How to access your Degree</span></span></p>
                            <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:10pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">You will receive your Degree in 3 formats:</span></span></p>
                            <ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
                                <li style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Digital Smart PDF: Your digital PDF will have a logo to click and verify. This PDF can be shared with your potential employers, and potential Universities for further education.</span></span></li>
                                <li style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Print Version: Scan the QR code, to verify.</span></span></li>
                                <li style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">JSON: Can be uploaded for verification on&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://verification.medicaps.ac.in/"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://verification.medicaps.ac.in/</u></span></span></a></li>
                            </ol>
                            <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:10pt;margin-top:10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Experience our new verification process</span></span></p>
                            <ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
                                <li style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Click on the logo, Scan the QR code or upload the JSON file on&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://verification.medicaps.ac.in/"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://verification.medicaps.ac.in/</u></span></span></a></li>
                                <li style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">You will be redirected to a secure portal to add your one-time code</span></span></li>
                            </ol>
                            <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:10pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Please note the one-time code is solely for the purpose of demonstration of the verification and will only be valid for a single access. You will have the opportunity to view and verify the authenticity of your Degree only once on our Blockchain-based verification system.</span></span></p>
                            <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your one-time code:&nbsp;</span><span style="font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>${onetimecode}</strong></span></span></p>
                            <p style="background-color:#ffffff;line-height:1.5954545454545457;margin-bottom:10pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Verifier Verification Process:</span></span></p>
                            <ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
                                <li style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Verifiers will need to click the logo on the PDF, scan the QR code or upload the JSON file on&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://verification.medicaps.ac.in/"><span style="background-color:transparent;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://verification.medicaps.ac.in/</u></span></span></a><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> and proceed to pay a fee of ₹800, they will receive a one-time code which will be active for 15 days.</span></span></li>
                            </ul>
                            <ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
                                <li style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your verifiers can also click on the request an official email button after submitting the One time code to receive an official email from the University confirming your credentials.</span></span></li>
                            </ul>
                            <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:10pt;padding:0pt 0pt 10pt;" dir="ltr">&nbsp;</p>
                            <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">If you encounter any difficulties or have questions regarding the Degree or the process. Please feel free to contact us at [University number] or [University email address]. We hope you find our innovative verification system beneficial.</span></span></p>
                            <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Thank you</span></span></p>
                            <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Best Regards</span></span></p>
                            <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Registrar</span></span></p>
                            <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:10pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Medi-Caps University</span></span></p>
                        <p><img src="https://www.certonce.com/images/MEDI/medi_logo.png" height="110px"></p>
        
                        `;
                      }
                      else if(puserid == "20122" || puserid == "25")//rv
                      {
                        pdfurl=`https://documentverification.rvce.edu.in/pdf/${lastelement.replace(".json","")}`;
                        jsonurl=`https://documentverification.rvce.edu.in/certificate/${lastelement.replace(".json","")}`;
                        let onetimecode = "";
                        // email = degreeResult.rows[0].emailaddress;
                        while (true) {
                          onetimecode = getOnetimecode(15);             
                          let getExistStudent = format(`SELECT id FROM verifyrequest WHERE onetimecode='${onetimecode}';`);
                          studentsforonetimecode = await pool.query(getExistStudent);
                          if (studentsforonetimecode.rowCount == 0) break;
                        }
                        let insertQuery = format(`insert into verifyrequest (fullname, accountid, cohortid, studentid, pdfurl, payer_name, onetimecode,onetimeblockcertscode, designation, organization, email, contactnumber, documentid, enrollnumber, certificatetype, issendcase) values ('${fullname}', '${puserid}', '${cohortid}', '${studentid}', '${pdfurl}','${fullname}','${onetimecode}','', '', '','${email}','', '${lastelement.replace(".json","")}', '${studentmainid}', '${certtype}', true) returning id`);    
                        let insertResult = await pool.query(insertQuery);     
                                            
                        let applicationidpart="";
                        if(certtype == "transcript"){
                            if (applicationid != ""){
                            applicationidpart = `<p style="color:black;">Candidate’s Reference/Application/University ID : ${applicationid}</p>`;
                            email_subject_university = `Official Certificate Verification from RVCE`;
                            email_body_university = `
                            <p>Dear Sir/Madam;</p>

                            <p>Please find the document of: ${fullname}</p>

                            ${applicationidpart}

                            <p style="color:black;">For verification of documents:</p>

                            <p style="color:black;">For Verification, your verifiers will need to click the logo on the PDF, scan the QR code or upload the JSON file on <a href="https://documentverification.rvce.edu.in">https://documentverification.rvce.edu.in</a> and proceed to pay a fee of ₹800, they will receive a one-time code which will be active for 15 days.</p>

                            <p style="color:black;">If you encounter any difficulties or have questions regarding the transcript or the process. Please feel free to contact us at 080-68188132 or coe1@rvce.edu.in.</p>

                            <p style="color:black;">We hope you find our innovative verification system beneficial.</p>

                            
                            <p style="color:black;">Thank you</p>

                            <p style="color:black;">Best Regards</p>

                            <p style="color:black;">Controller of Examinations</p>

                            <p style="color:black;">RV College of Engineering, Mysore, Road, Bengaluru-560059, India.</p>
                            `;
                        }

                        cert_email_subject = `Your Blockchain-Secured Certificate at RVCE`;  
                        email_body=`<p>Dear ${fullname},</p>

                        ${applicationidpart}
        
                        <p style="color:black;">Congratulations on successfully completing the semester at RVCE. We are pleased to inform you that your Transcript is now available for viewing and verification.</p>
                        <p style="color:black;">How to access your transcript</p>
                        <p style="color:black;">You will receive your transcript in 3 formats:</p>
                        <p style="color:black;">1. Digital Smart PDF: Your digital PDF will have a logo to click and verify. This PDF can be shared with your potential employers, and potential Universities for further education.</p>
                        <p style="color:black;">2. Print Version: Scan the QR code, to verify.</p>
                        <p style="color:black;">3. JSON: Can be uploaded for verification on <a href="https://documentverification.rvce.edu.in">https://documentverification.rvce.edu.in</a></p>
                        
                        <p style="color:black;">Experience our new verification process</p>
                        <p style="color:black;">1. Click on the logo, Scan the QR code or upload the JSON file on <a href="https://documentverification.rvce.edu.in">https://documentverification.rvce.edu.in</a></p>
                        <p style="color:black;">2. You will be redirected to a secure portal to add your one-time code</p>
                        <p style="color:black;">Please note the one-time code is solely for the purpose of demonstration of the verification and will only be valid for a single access. You will have the opportunity to view and verify the authenticity of your Transcript only once on our Blockchain-based verification system.</p>
        
                        <p style="color:black;">Your one-time code:<span style ="font-weight:bold;">${onetimecode}</span></p>
        
                        <p style="color:black;">For Verification, your verifiers will need to click the logo on the PDF, scan the QR code or upload the JSON file on <a href="https://documentverification.rvce.edu.in">https://documentverification.rvce.edu.in</a> and proceed to pay a fee of ₹800, they will receive a one-time code which will be active for 15 days.</p>
        
                        <p style="color:black;">If you encounter any difficulties or have questions regarding the transcript or the process. Please feel free to contact us at 080-68188132 or coe1@rvce.edu.in.</p>
        
                        <p style="color:black;">We hope you find our innovative verification system beneficial.</p>
        
                        
                        <p style="color:black;">Thank you</p>
        
                        <p style="color:black;">Best Regards</p>
        
                        <p style="color:black;">Controller of Examinations</p>
        
                        <p style="color:black;">RV College of Engineering</p>`;
                        }
                        else{
                        if (applicationid != ""){
                        applicationidpart = `<p style="color:black;">Candidate’s Reference/Application/University ID : ${applicationid}</p>`;
                        email_subject_university = `Official Certificate Verification from RVCE`;
                        email_body_university = `
                        <p>Dear Sir/Madam;</p>

                        <p>Please find the document of: ${fullname}</p>

                        ${applicationidpart}

                        <p style="color:black;">For verification of documents:</p>

                        <p style="color:black;">For Verification, your verifiers will need to click the logo on the PDF, scan the QR code or upload the JSON file on <a href="https://documentverification.rvce.edu.in">https://documentverification.rvce.edu.in</a> and proceed to pay a fee of ₹800, they will receive a one-time code which will be active for 15 days.</p>

                        <p style="color:black;">If you encounter any difficulties or have questions regarding the grade card or the process. Please feel free to contact us at 080-68188132 or coe1@rvce.edu.in.</p>

                        <p style="color:black;">We hope you find our innovative verification system beneficial.</p>

                        
                        <p style="color:black;">Thank you</p>

                        <p style="color:black;">Best Regards</p>

                        <p style="color:black;">Controller of Examinations</p>

                        <p style="color:black;">RV College of Engineering, Mysore, Road, Bengaluru-560059, India.</p>
                        `;
                        }

                        cert_email_subject = `Your Blockchain-Secured Certificate at RVCE`;  
                        email_body=`<p>Dear ${fullname},</p>

                        ${applicationidpart}
        
                        <p style="color:black;">Congratulations on successfully completing the semester at RVCE. We are pleased to inform you that your Grade card is now available for viewing and verification.</p>
                        <p style="color:black;">How to access your grade card</p>
                        <p style="color:black;">You will receive your grade card in 3 formats:</p>
                        <p style="color:black;">1. Digital Smart PDF: Your digital PDF will have a logo to click and verify. This PDF can be shared with your potential employers, and potential Universities for further education.</p>
                        <p style="color:black;">2. Print Version: Scan the QR code, to verify.</p>
                        <p style="color:black;">3. JSON: Can be uploaded for verification on <a href="https://documentverification.rvce.edu.in">https://documentverification.rvce.edu.in</a></p>
                        
                        <p style="color:black;">Experience our new verification process</p>
                        <p style="color:black;">1. Click on the logo, Scan the QR code or upload the JSON file on <a href="https://documentverification.rvce.edu.in">https://documentverification.rvce.edu.in</a></p>
                        <p style="color:black;">2. You will be redirected to a secure portal to add your one-time code</p>
                        <p style="color:black;">Please note the one-time code is solely for the purpose of demonstration of the verification and will only be valid for a single access. You will have the opportunity to view and verify the authenticity of your Grade card only once on our Blockchain-based verification system.</p>
        
                        <p style="color:black;">Your one-time code:<span style ="font-weight:bold;">${onetimecode}</span></p>
        
                        <p style="color:black;">For Verification, your verifiers will need to click the logo on the PDF, scan the QR code or upload the JSON file on <a href="https://documentverification.rvce.edu.in">https://documentverification.rvce.edu.in</a> and proceed to pay a fee of ₹800, they will receive a one-time code which will be active for 15 days.</p>
        
                        <p style="color:black;">If you encounter any difficulties or have questions regarding the grade card or the process. Please feel free to contact us at 080-68188132 or coe1@rvce.edu.in.</p>
        
                        <p style="color:black;">We hope you find our innovative verification system beneficial.</p>
        
                        
                        <p style="color:black;">Thank you</p>
        
                        <p style="color:black;">Best Regards</p>
        
                        <p style="color:black;">Controller of Examinations</p>
        
                        <p style="color:black;">RV College of Engineering</p>`;}
                      }
                      else if(puserid == "20123" || puserid == "23")//ct
                      {
                        pdfurl=`https://verification.ctuniversity.in/pdf/${lastelement.replace(".json","")}`;
                        jsonurl=`https://verification.ctuniversity.in/certificate/${lastelement.replace(".json","")}`;
                        let onetimecode = "";
                        while (true) {
                          onetimecode = getOnetimecode(15);             
                          let getExistStudent = format(`SELECT id FROM verifyrequest WHERE onetimecode='${onetimecode}';`);
                          studentsforonetimecode = await pool.query(getExistStudent);
                          if (studentsforonetimecode.rowCount == 0) {
                            break;
                          }
                        }
                        // let insertQuery = format(`insert into verifyrequest (fullname, accountid, cohortid, studentid, pdfurl, payer_name, onetimecode,onetimeblockcertscode, designation, organization, email, contactnumber, documentid) values ('${fullname}', '${puserid}', '${cohortid}', '${studentid}', '${pdfurl}','${fullname}','${onetimecode}','', '', '','${email}','', '${lastelement.replace(".json","")}') returning id`);
                        let insertQuery = format(`insert into verifyrequest (fullname, accountid, cohortid, studentid, pdfurl, payer_name, onetimecode,onetimeblockcertscode, designation, organization, email, contactnumber, documentid, enrollnumber, certificatetype, issendcase) values ('${fullname}', '${puserid}', '${cohortid}', '${studentid}', '${pdfurl}','${fullname}','${onetimecode}','', '', '','${email}','', '${lastelement.replace(".json","")}', '${studentmainid}', '${certtype}', true) returning id`);    
                        let insertResult = await pool.query(insertQuery);
                        cert_email_subject = `Your Blockchain-Secured Certificate at CT`;  
                        email_body=`<p>Dear ${fullname},</p>
        
                        <p style="color:black;">Congratulations on successfully completing the semester at CT. We are pleased to inform you that your Grade card is now available for viewing and verification.</p>
                        <p style="color:black;">How to access your grade card</p>
                        <p style="color:black;">You will receive your grade card in 3 formats:</p>
                        <p style="color:black;">1. Digital Smart PDF: Your digital PDF will have a logo to click and verify. This PDF can be shared with your potential employers, and potential Universities for further education.</p>
                        <p style="color:black;">2. Print Version: Scan the QR code, to verify.</p>
                        <p style="color:black;">3. JSON: Can be uploaded for verification on <a href="https://verification.ctuniversity.in">https://verification.ctuniversity.in</a></p>
                        
                        <p style="color:black;">Experience our new verification process</p>
                        <p style="color:black;">1. Click on the logo, Scan the QR code or upload the JSON file on <a href="https://verification.ctuniversity.in">https://verification.ctuniversity.in</a></p>
                        <p style="color:black;">2. You will be redirected to a secure portal to add your one-time code</p>
                        <p style="color:black;">Please note the one-time code is solely for the purpose of demonstration of the verification and will only be valid for a single access. You will have the opportunity to view and verify the authenticity of your Grade card only once on our Blockchain-based verification system.</p>
        
                        <p style="color:black;">Your one-time code:<span style ="font-weight:bold;">${onetimecode}</span></p>
        
                        <p style="color:black;">For Verification, your verifiers will need to click the logo on the PDF, scan the QR code or upload the JSON file on <a href="https://verification.ctuniversity.in">https://verification.ctuniversity.in</a> and proceed to pay a fee of ₹800, they will receive a one-time code which will be active for 15 days.</p>
        
                        <p style="color:black;">If you encounter any difficulties or have questions regarding the grade card or the process. Please feel free to contact us at admin@verification.ctuniversity.in</p>
        
                        <p style="color:black;">We hope you find our innovative verification system beneficial.</p>
        
                        
                        <p style="color:black;">Thank you</p>
        
                        <p style="color:black;">Best Regards</p>
        
                        <p style="color:black;">Registrar</p>
        
                        <p style="color:black;">CT University</p>`;
                      }
                      else if(puserid == "20107")
                      {                 
                        cert_email_subject = `Your Blockchain-Secured Degree at the Centurion University of Technology and Management, Andhra Pradesh`;  
                        email_body=`<p>Dear ${fullname},</p>
        
                        <p>Congratulations on your remarkable achievement and successful completion of your program at the Centurion University of Technology and Management, Andhra Pradesh. We are thrilled to extend our heartfelt congratulations on your journey of growth and excellence.</p>
                        
                        <p>At Centurion University of Technology and Management, Andhra Pradesh, we take immense pride in recognizing your accomplishments by conferring upon you a Blockchain-secured Degree. This not only celebrates your achievements but also equips you with a technological edge that holds great significance in today&#39;s rapidly evolving world.</p>
                        
                        <p>Your academic records, embodying your hard work and dedication, now possess a lasting value. Safeguarding these records is of utmost importance.</p>
                        
                        <p>Your Digital Degree Certificate is available in three formats:</p>
                        
                        <p>1. Printed Version: You will be handed a physical Certificate. This certificate will include a QR code that allows prospective employers and educational institutions, both in India and abroad, to promptly verify your credentials. Scan the QR code on your paper-based blockchain-secured Centurion University of Technology and Management, Andhra Pradesh Degree. This action will promptly redirect you to the University&rsquo;s verification portal.</p>
                        
                        <p>2. Smart PDF Format: This version provides a portable and easily shareable format for your certificate. Store it securely for instant access when needed. Simply click the link located at the bottom of your blockchain-secured Degree to verify.</p>
                        
                        <p>3. .json File: As a tech-oriented version of your record, this file complements the PDF. It should not be edited, as any alterations could render it inoperative. You have the option to upload it on https://verification.cutmap.ac.in/ or other independent verification platforms like https://www.blockcerts.org and https://www.certonce.com for efficient verification.</p>
                        
                        <p>Should you have any queries or require further assistance, please don&#39;t hesitate to contact us at examcell@cutmap.ac.in or call us at 9849874545. Additionally, rest assured that this Blockchain-secured Diploma holds validity for both employment and immigration purposes.</p>
                        
                        <p>As you embark on your future endeavors, we extend our best wishes for continued success and accomplishments.</p>
                        
                        <p><br />
                        Benefits for You:<br />
                        Our innovative Smart Degree bring forth a host of benefits that ensure the safety and accessibility of your academic records:</p>
                        
                        <p>- Global Acceptance: Your digital Degree are universally recognized and immune to loss or damage.<br />
                        - Instant Verification: Unlike the traditional 3-4 week verification process for paper Degree, your digital credentials can be verified instantly.<br />
                        - Effortless University Verification: Whenever required, you can swiftly verify your Degree without any delays or complications.</p>
                        
                        <p>Now, you can share your certificate with prospective employers and institutions worldwide, ensuring rapid and hassle-free verification.</p>
                        
                        <p>Warm regards,</p>
                        
                        <p>Prof. Madhava Rao K<br />
                        Dean-Examinations<br />
                        CENTURION UNIVERSITY OF TECHNOLOGY AND MANAGEMENT<br />
                        ANDHRA PRADESH<br />
                        www.cutmap.ac.in<br />
                        <img alt="" src="https://www.certonce.com/images/CUTM-AP/cutmaplogo.png" style="height:200px" /><br />
                        &nbsp;</p>
                        `;
                      }
                      else if(puserid == "20108")
                      {                
                        pdfurl=`https://digi-record.iilm.ac.in/pdf/${lastelement.replace(".json","")}`;
                        jsonurl=`https://digi-record.iilm.ac.in/certificate/${lastelement.replace(".json","")}`;                
                        printpdf=`https://digi-record.iilm.ac.in/pdf/${verifyid}_print`;                
                      }
                      else if(puserid == "20109")
                      { 
                        pdfurl=`https://digi-record.iilm.edu.in/pdf/${lastelement.replace(".json","")}`;
                        jsonurl=`https://digi-record.iilm.edu.in/certificate/${lastelement.replace(".json","")}`;                
                        printpdf=`https://digi-record.iilm.edu.in/pdf/${verifyid}_print`;                                
                        cert_email_subject = `Provisional Certificate/ Transcript/ Degree (Block-chain Secured)`;  
                        email_body=`<p>Dear ${fullname},</p>
        
                        <p>Congratulations on your remarkable achievement and successful completion of your program at IILM University, Gurugram. We compliment you on your&nbsp;journey towards academic&nbsp;growth and excellence.&nbsp;</p>
                        <p>At IILM University, Gurugram, we take immense pride in recognizing your accomplishments by conferring upon you a Blockchain-secured Provisional Certificate/Transcript/Degree. This not only celebrates your achievements but also equips you with a technological edge that holds great significance in today's rapidly evolving world.&nbsp;</p>
                        <p>Your academic records, embodying your hard work and dedication, now possess a lasting value. Safeguarding these records is of utmost importance.&nbsp;</p>
                        <p>Your Digital Provisional Certificate/Transcript/Degree Certificate is available in three formats:&nbsp;</p>
                        <ol>
                        <li><u>Printed Version</u>: You will be handed a physical Certificate during the Convocation Ceremony. This certificate will include a QR code that allows prospective employers and educational institutions, both in India and abroad, to promptly verify your credentials. Scan the QR code on your paper-based blockchain-secured IILM University, Gurugram Provisional Certificate/Transcript/Degree. This action will promptly redirect you to the University&rsquo;s verification portal.&nbsp;</li>
                        </ol>
                        <ol start="2">
                        <li><u>Smart PDF Format</u>: This version provides a portable and easily shareable format for your certificate. Store it securely for instant access when needed. Simply click the link located at the bottom of your blockchain-secured Provisional Certificate/Transcript/Degree to verify.&nbsp;</li>
                        </ol>
                        <ol start="3">
                        <li><u>.json File</u>:&nbsp;</li>
                        </ol>
                        <p>You have the option to upload the json file attached in this email in the following steps:</p>
                        <ol>
                        <li>Log on to <a href="https://digi-record.iilm.edu.in/">https://digi-record.iilm.edu.in/</a>or other independent verification platforms like <a href="https://www.blockcerts.org/">https://www.blockcerts.org</a> and <a href="https://www.certonce.com/">https://www.certonce.com</a></li>
                        <li>The attached json file should be uploaded on the verification portal</li>
                        <li>The document duly verified would be available to be viewed by you / employer.</li>
                        </ol>
                        <p>*&nbsp;The json file should <strong><u>not</u></strong> be edited, as any alterations could render it inoperative.&nbsp;</p>
                        <p>Should you have any queries or require further assistance, please don't hesitate to contact us at registrar@iilm.edu or call Mr Koshtuba Nand at 9996559986.&nbsp;</p>
                        <p>This Blockchain-secured document holds validity for both employment and immigration purposes.</p>
                        <p><u>Benefits for You</u>:</p>
                        <p>Our innovative smart Provisional Certificate/Transcript/Degree brings forth a host of benefits that ensure the safety and accessibility of your academic records:&nbsp;</p>
                        <ol>
                        <li><u>Global Acceptance</u>: Your digital Provisional Certificate/Transcript/Degree is universally recognized and immune to loss or damage.</li>
                        <li><u>Instant Verification</u>: Unlike the traditional 3-4 week verification process for paper Provisional Certificate/Transcript/Degree, your digital credentials can be verified instantly.</li>
                        <li><u>Effortless University Verification</u>: Whenever required, you can swiftly verify your Provisional Certificate/Transcript/Degree without any delays or complications.</li>
                        </ol>
                        <p>&nbsp;</p>
                        <p>Now, you can share your certificate with prospective employers and institutions worldwide, ensuring rapid and hassle-free verification.&nbsp;</p>
                        <p>Warm regards,&nbsp;</p>
                        <p>Registrar</p>
                        <p>IILM University, Gurugram</p>
                        `;
                      }
                      else if(puserid == "20110")
                      {                 
                        cert_email_subject = `Your Blockchain-Secured Degree at the Jain (Deemed-to-be University)!`;  
                        email_body=`<p>Dear ${fullname},</p>
        
                        <p>Congratulations on your remarkable achievement and successful completion of your program at the Jain (Deemed-to-be University).</p>
        
                        <p>We are thrilled to extend our heartfelt congratulations on your journey of growth and excellence.</p>
        
                        <p>&nbsp;</p>
        
                        <p>At Jain (Deemed-to-be University), we take immense pride in recognizing your accomplishments by conferring upon you a Blockchain-secured Degree. This not only celebrates your achievements but also equips you with a technological edge that holds great significance in today&#39;s rapidly evolving world.</p>
        
                        <p>&nbsp;</p>
        
                        <p>Your academic records, embodying your hard work and dedication, now possess a lasting value. Safeguarding these records is of utmost importance.</p>
        
                        <p>Your Digital Degree Certificate is available in three formats:</p>
        
                        <p>1. Printed Version: You will be handed a physical Certificate. This certificate will include a QR code that allows prospective employers and educational institutions, both in India and abroad, to promptly verify your credentials. Scan the QR code on your paper-based blockchain-secured Jain (Deemed-to-be University) Degree. This action will promptly redirect you to the University&#39;s verification portal.</p>
        
                        <p>2. Smart PDF Format: This version provides a portable and easily shareable format for your certificate. Store it securely for instant access when needed. Simply click the link located at the bottom of your blockchain-secured Degree to verify.</p>
        
                        <p>3. .json File: As a tech-oriented version of your record, this file complements the PDF. It should not be edited, as any alterations could render it inoperative. You have the option to upload it on <a href="https://verify.jainuniversity.ac.in/ ">https://verify.jainuniversity.ac.in&nbsp;</a>or other independent verification platforms like <a href="https://www.blockcerts.org">https://www.blockcerts.org</a> and <a href="https://www.certonce.com">https://www.certonce.com</a> for efficient verification.</p>
        
                        <p>Should you have any queries or require further assistance, please don&#39;t hesitate to contact us at <span style="color:#3498db">academics6@onlinejain.com</span> or call us at 6364938007. Additionally, rest assured that this Blockchain-secured Diploma holds validity for both employment and immigration purposes.</p>
        
                        <p>As you embark on your future endeavors, we extend our best wishes for continued success and accomplishments.</p>
        
                        <p>Benefits for You: Our innovative smart Degree bring forth a host of benefits that ensure the safety and accessibility of your academic records:</p>
        
                        <p>- Global Acceptance: Your digital Degree are universally recognized and immune to loss or damage.</p>
        
                        <p>- Instant Verification: Unlike the traditional 3-4 week verification process for paper Degree, your digital credentials can be verified instantly.</p>
        
                        <p>- Effortless University Verification: Whenever required, you can swiftly verify your Degree without any delays or complications. Now, you can share your certificate with prospective employers and institutions worldwide, ensuring rapid and hassle-free verification.</p>
        
                        <p>Warm regards,</p>
        
                        <p>Dr. Arvind Kumar</p>
        
                        <p>Deputy Controller of Examinations</p>
        
                        <p>Jain (Deemed-to-be University)</p>
        
                        <p><span style="color:#3498db">www.jainuniversity.ac.in</span></p>
        
        
        
                        `;
                      }
                      else if(puserid == "20111" || puserid == "26")
                      {                 
                        cert_email_subject = `Your Blockchain-Secured Degree at the IIIT Bhopal!`;  
                        email_body=`<p>Dear ${fullname},</p>
        
                        <p>Greetings&nbsp;of the day !</p>
                        <p><br /> Congratulations&nbsp;on your remarkable achievement and successful completion of your program at the Indian Institute of Information Technology Bhopal. We are thrilled to extend our heartfelt&nbsp;congratulations&nbsp;on your journey of growth and excellence.</p>
                        <p><br /> At IIIT Bhopal, we take immense pride in recognizing your accomplishments by conferring upon you a Blockchain-secured Grade sheet and Degree. This not only celebrates your achievements but also equips you with a technological edge that holds great significance in today's rapidly evolving world. Your academic records, embodying your hard work and dedication, now possess a lasting value. Safeguarding these records is of utmost importance.</p>
                        <p><br /> Your Digital Certificates are available in below indicated three formats:</p>
                        <ul>
                        <li><strong>Printed Version</strong>: You will be handed a physical Certificate. This certificate will include a QR code that allows prospective employers and educational institutions, both in India and abroad, to promptly verify your credentials. Scan the QR code on your paper-based blockchain-secured Indian Institute of Information Technology Bhopal Certificate. This action will promptly redirect you to the IIIT Bhopal&rsquo;s verification portal.</li>
                        <li><strong>Smart PDF Format</strong>: This version provides a portable and easily shareable format for your certificate. Store it securely for instant access when needed. Simply click the link located at the bottom of your blockchain-secured Certificate to verify.</li>
                        <li><strong>.json File*:&nbsp;</strong>You have the option to upload the json file attached in this email in the following steps:</li>
                        </ul>
                        <ol>
                        <li>Log on to&nbsp;<a href="https://deekshaakosh.iiitbhopal.ac.in/"><strong>https://deekshaakosh.iiitbhopal.ac.in/</strong></a>or other independent verification platforms like&nbsp;<a href="https://www.blockcerts.org/"><strong>https://www.blockcerts.org</strong></a>and&nbsp;<a href="https://www.certonce.com/"><strong>https://www.certonce.com</strong></a>.</li>
                        <li>This json file should be uploaded on the verification portal</li>
                        <li>The document duly verified would be available to view.</li>
                        </ol>
                        <p><br /> </p>
                        <p><strong><em>*&nbsp;The json file should not be edited, as any alterations could render it inoperative.</em></strong><br /> </p>
                        <p>You can also be confident that this degree is valid for immigration and employment because it is safeguarded by Blockchain.&nbsp;We wish you continued success and accomplishments as you set out on your future ventures.</p>
                        <p><br /> </p>
                        <p><strong>Benefits for You:</strong></p>
                        <p><br /> Our innovative Smart Certificate brings forth a host of benefits that ensure the safety and accessibility of your academic records:</p>
                        <p><br /> </p>
                        <ul>
                        <li><strong>Global Acceptance:</strong>&nbsp;Your digital Certificates are universally recognized and immune to loss or damage.</li>
                        <li><strong>Instant Verification:</strong>&nbsp;Unlike the traditional 3-4 week verification process for paper Certificates, your digital credentials can be verified instantly.</li>
                        <li><strong>Effortless University Verification:&nbsp;</strong>Whenever required, you can swiftly verify your Certificate without any delays or complications.</li>
                        </ul>
                        <p><br /> Now, you can share your certificate with prospective employers and institutions worldwide, ensuring rapid and hassle-free verification.</p>
                        <p>&nbsp;</p>
                        <p>Please feel free to call us at&nbsp;<strong><em><u>+91-755-4051950</u></em></strong>&nbsp;or send us an email at&nbsp;<a href="mailto:aracademics@iiitbhopal.ac.in"><strong>aracademics@iiitbhopal.ac.in</strong></a>&nbsp;if you have any questions or need further help.&nbsp;</p>
                        <p>&nbsp;</p>
                        <p><strong>--------------------------------------</strong></p>
                        <p>Thanks &amp; Regards,<br /> </p>
                        <p>Assistant Registrar (Academics)</p>
                        <p>Indian Institute of Information Technology, Bhopal</p>
                        <p>Email -&nbsp;<strong><u>aracademics@iiitbhopal.ac.in</u></strong></p>
                        <p>Mob. No:<strong>&nbsp;</strong>+91-755 4051950, Weblink:&nbsp;<a href="https://iiitbhopal.ac.in/#!/">https://iiitbhopal.ac.in</a></p>
                        <p>(An Institution of National Importance)</p>
                        <p>New Teaching Block (NTB), Maulana Azad National Institute of Technology (MANIT) Campus, Room No TC-105, Bhopal (MP) - 462003<br /> </p>
                        `;
                      }
                      else if(puserid == "20113" || puserid == "19")
                        { 
                          pdfurl=`https://verification.dypunik.edu.in/pdf/${lastelement.replace(".json","")}`;
                          jsonurl=`https://verification.dypunik.edu.in/certificate/${lastelement.replace(".json","")}`;                
                          
                          cert_email_subject = `Your Blockchain-Secured Degree Certificate at the D. Y. Patil Education Society(Deemed to be University), Kolhapur.`;  
                          email_body=`<p>Dear ${fullname},</p>
          
                          <p style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;">Congratulations on your remarkable achievement and successful completion of your program at the D. Y. Patil Education Society (Deemed to be University), Kolhapur. We are thrilled to extend our heartfelt congratulations on your journey of growth and excellence.</span></span></p>
          
                          <p style="text-align:justify">&nbsp;</p>
          
                          <p style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;">At D. Y. Patil Education Society (Deemed to be University), Kolhapur, we take immense pride in recognizing your accomplishments by conferring upon you a Blockchain-secured Degree Certificate. This not only celebrates your achievements but also equips you with a technological edge that holds great significance in today&#39;s rapidly evolving world.</span></span></p>
          
                          <p style="text-align:justify">&nbsp;</p>
          
                          <p style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;">Your academic records, embodying your hard work and dedication, now possess a lasting value. Safeguarding these records is of utmost importance.</span></span></p>
          
                          <p style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;">Your Digital Degree Certificate is available in three formats:</span></span></p>
          
                          <p style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;">1. Printed Version: You will be handed a physical Certificate. This certificate will include a QR code that allows prospective employers and educational institutions, both in India and abroad, to promptly verify your credentials. Scan the QR code on your paper-based blockchain-secured D. Y. Patil Education Society (Deemed to be University), Kolhapur Degree Certificate. This action will promptly redirect you to the University&rsquo;s verification portal.</span></span></p>
          
                          <p style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;">2. Smart PDF Format: This version provides a portable and easily shareable format for your certificate. Store it securely for instant access when needed. Simply click the link located at the bottom of your blockchain-secured Degree Certificate to verify.</span></span></p>
          
                          <p style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;">3. .json File: </span></span></p>
          
                          <p style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;">You have the option to upload the json file attached in this email in the following steps:</span></span></p>
          
                          <ol>
                            <li style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;">Log on to https://verification.dypunik.edu.in or other independent verification platforms like https://www.blockcerts.org and https://www.certonce.com.</span></span></li>
                            <li style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;">This json file should be uploaded on the verification portal</span></span></li>
                            <li style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;">The document duly verified would be available to view.</span></span></li>
                          </ol>
          
                          <p style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;">*&nbsp; The json file should not be edited, as any alterations could render it inoperative.</span></span></p>
          
                          <p style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;">Should you have any queries or require further assistance, please do not hesitate to contact us at coedypatil@gmail.com or call us at 0231-2601235/36 Ext.211. Additionally, rest assured that this Blockchain-secured Degree Certificate holds validity for both employment and immigration purposes.</span></span></p>
          
                          <p style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;">As you embark on your future endeavors, we extend our best wishes for continued success and accomplishments.</span></span></p>
          
                          <p style="text-align:justify">&nbsp;</p>
          
                          <p style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;">Benefits for You:</span></span></p>
          
                          <p style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;">Our innovative smart Degree Certificate bring forth a host of benefits that ensure the safety and accessibility of your academic records:</span></span></p>
          
                          <p style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;">- Global Acceptance: Your digital Degree Certificate is universally recognized and immune to loss or damage.</span></span></p>
          
                          <p style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;">- Instant Verification: Unlike the traditional 3&ndash;4-week verification process for paper Degree Certificate, your digital credentials can be verified instantly.</span></span></p>
          
                          <p style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;">- Effortless University Verification: Whenever required, you can swiftly verify your Degree Certificate without any delays or complications.</span></span></p>
          
                          <p style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;">Now, you can share your Degree Certificate with prospective employers and institutions worldwide, ensuring rapid and hassle-free verification.</span></span></p>
          
                          <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;">Warm regards,</span></span></p>
          
                          <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;">Controller of Examinations</span></span></p>
          
                          <p><span style="font-size:11pt"><span style="font-family:Arial,&quot;sans-serif&quot;">D. Y. Patil Education Society (Deemed to be University), Kolhapur </span></span></p>
          
                          `;
                      }
                        else if(puserid =="20131" || puserid == "29")//snu
                        { 
                            pdfurl=`https://verification.snu.edu.in/pdf/${lastelement.replace(".json","")}`;
                            jsonurl=`https://verification.snu.edu.in/certificate/${lastelement.replace(".json","")}`;
                            printpdf=`https://verification.snu.edu.in/print/${lastelement.replace(".json","")}`;
                            let onetimecode = "";
                            while (true) {
                                onetimecode = getOnetimecode(15);
                                let getExistStudent = format(`SELECT id FROM verifyrequest WHERE onetimecode='${onetimecode}';`);
                                studentsforonetimecode = await pool.query(getExistStudent);
                                if (studentsforonetimecode.rowCount == 0) break;
                            }
                            let insertQuery = format(`insert into verifyrequest (fullname, accountid, cohortid, studentid, pdfurl, payer_name, onetimecode,onetimeblockcertscode, designation, organization, email, contactnumber, documentid, enrollnumber, certificatetype, issendcase) values ('${fullname}', '${puserid}', '${cohortid}', '${studentid}', '${pdfurl}','${fullname}','${onetimecode}','', '', '','${email}','', '${lastelement.replace(".json","")}', '${studentmainid}', '${certtype}', true) returning id`);    
                            let insertResult = await pool.query(insertQuery);
                            if ( certtype == "transcript" ) {
                                cert_email_subject = `Your Blockchain-Secured Official Transcript at the Shiv Nadar (Institution of Eminence Deemed to be University)!`;
                            } else {
                                cert_email_subject = `Your Blockchain Secured Degree at Shiv Nadar (Institution of Eminence Deemed to be University)!`;
                            }
                            let certtypetitle = "Degree";
                            let receiveFormatNum = '3';
                            let receiveFormats = `<ul style="list-style-type: decimal; margin-left: 26px;">
                            <li><span style="font-family:Cambria;font-size:16px;">&nbsp;</span><span style="line-height:150%;font-family:Cambria;font-size:16px;">Digital Smart PDF: Your digital PDF will have a logo to click and verify. This PDF can be shared with your potential employers, and potential Universities for further education.</span></li>
                            <li><span style="font-family:Cambria;font-size:16px;">&nbsp;</span><span style="line-height:150%;font-family:Cambria;font-size:16px;">Print Version: Scan the QR code, to verify.</span></li>
                            <li><span style="font-family:Cambria;font-size:16px;">&nbsp;</span><span style="line-height:150%;font-family:Cambria;font-size:16px;">JSON: Can be uploaded for verification on&nbsp;</span><a href="https://verification.snu.edu.in/"><u><span style="line-height:150%;font-family:Cambria;font-size:16px;color:rgb(17,85,204);">https://verification.snu.edu.in/</span></u></a><span style="line-height:150%;font-family:Cambria;font-size:16px;">&nbsp;</span></li>
                            </ul>`;
                            let verifyprocessFormats =`<ul style="list-style-type: decimal; margin-left: 26px;">
                            <li><span style="font-family:Cambria;font-size:16px;">&nbsp;</span><span style="line-height:150%;font-family:Cambria;font-size:16px;">Click on the logo, Scan the QR code or upload the JSON file on&nbsp;</span><a href="https://verification.snu.edu.in/"><u><span style="line-height:150%;font-family:Cambria;font-size:16px;color:rgb(17,85,204);">https://verification.snu.edu.in/</span></u></a><span style="line-height:150%;font-family:Cambria;font-size:16px;">&nbsp;</span></li>
                            <li><span style="font-family:Cambria;font-size:16px;">&nbsp;</span><span style="line-height:150%;font-family:Cambria;font-size:16px;">You will be redirected to a secure portal to add your one-time code</span></li>
                            </ul>`;
                            let verifierFormats =`<ul style="list-style-type: '-'; margin-left: 18px;">
                            <li><span style="font-family:Cambria;font-size:16px;">&nbsp;&nbsp;&nbsp;</span><span style="line-height:150%;font-family:Cambria;font-size:16px;">Your Verifiers will need to click the logo on the PDF, scan the QR code or upload the JSON file on&nbsp;</span><a href="https://verification.snu.edu.in/"><u><span style="line-height:150%;font-family:Cambria;font-size:16px;color:rgb(17,85,204);">https://verification.snu.edu.in/</span></u></a><span style="line-height:150%;font-family:Cambria;font-size:16px;">&nbsp;and proceed to pay a fee of ₹1000, they will receive a one-time code which can be used multiple times during 15 days from the date of receipt.</span></li>
                            <li><span style="font-family:Cambria;font-size:16px;color:rgb(34,34,34);">&nbsp;&nbsp;&nbsp;</span><span style="line-height:132%;font-family:Cambria;font-size:16px;color:rgb(34,34,34);">Your verifiers can also click on the request an official email button after submitting the One-time code to receive an official email from the University confirming your credentials.</span></li>
                            </ul>`;
                            if ( certtype == "transcript" ) {
                                certtypetitle = "Official Transcript";
                                receiveFormatNum = '2';
                                receiveFormats = `<ul style="list-style-type: decimal; margin-left: 26px;">
                                <li><span style="font-family:Cambria;font-size:16px;">&nbsp;</span><span style="line-height:150%;font-family:Cambria;font-size:16px;">Digital Smart PDF: Your digital PDF will have a logo to click and verify. This PDF can be shared with your potential employers, and potential Universities for further education.</span></li>
                                <li><span style="font-family:Cambria;font-size:16px;">&nbsp;</span><span style="line-height:150%;font-family:Cambria;font-size:16px;">JSON: Can be uploaded for verification on&nbsp;</span><a href="https://verification.snu.edu.in/"><u><span style="line-height:150%;font-family:Cambria;font-size:16px;color:rgb(17,85,204);">https://verification.snu.edu.in/</span></u></a><span style="line-height:150%;font-family:Cambria;font-size:16px;">&nbsp;</span></li>
                                </ul>`;
                                verifyprocessFormats =`<ul style="list-style-type: decimal; margin-left: 26px;">
                                <li><span style="font-family:Cambria;font-size:16px;">&nbsp;</span><span style="line-height:150%;font-family:Cambria;font-size:16px;">Click on the logo or upload the JSON file on&nbsp;</span><a href="https://verification.snu.edu.in/"><u><span style="line-height:150%;font-family:Cambria;font-size:16px;color:rgb(17,85,204);">https://verification.snu.edu.in/</span></u></a><span style="line-height:150%;font-family:Cambria;font-size:16px;">&nbsp;</span></li>
                                <li><span style="font-family:Cambria;font-size:16px;">&nbsp;</span><span style="line-height:150%;font-family:Cambria;font-size:16px;">You will be redirected to a secure portal to add your one-time code</span></li>
                                </ul>`;
                                verifierFormats =`<ul style="list-style-type: '-'; margin-left: 18px;">
                                <li><span style="font-family:Cambria;font-size:16px;">&nbsp;&nbsp;&nbsp;</span><span style="line-height:150%;font-family:Cambria;font-size:16px;">Your Verifiers will need to click the logo on the PDF or upload the JSON file on&nbsp;</span><a href="https://verification.snu.edu.in/"><u><span style="line-height:150%;font-family:Cambria;font-size:16px;color:rgb(17,85,204);">https://verification.snu.edu.in/</span></u></a><span style="line-height:150%;font-family:Cambria;font-size:16px;">&nbsp;and proceed to pay a fee of ₹1000, they will receive a one-time code which can be used multiple times during 15 days from the date of receipt.</span></li>
                                <li><span style="font-family:Cambria;font-size:16px;color:rgb(34,34,34);">&nbsp;&nbsp;&nbsp;</span><span style="line-height:132%;font-family:Cambria;font-size:16px;color:rgb(34,34,34);">Your verifiers can also click on the request an official email button after submitting the One-time code to receive an official email from the University confirming your credentials.</span></li>
                                </ul>`;
                            }
                            email_body=`<p style="margin-top:10.0000pt;margin-bottom:10.0000pt;line-height:150%;background:rgb(255,255,255);"><span style="font-family:Cambria;line-height:150%;font-size:16px;">Dear ${fullname},</span></p>
                            <p style="margin-top:10.0000pt;margin-bottom:10.0000pt;line-height:150%;background:rgb(255,255,255);"><span style="font-family:Cambria;line-height:150%;font-size:16px;">Congratulations on successfully graduating at Shiv Nadar (Institution of Eminence Deemed to be University). We are pleased to inform you that your ${certtypetitle} is now available for viewing and verification.</span></p>
                            <p style="margin-top:10.0000pt;margin-bottom:10.0000pt;line-height:150%;background:rgb(255,255,255);"><span style="font-family:Cambria;line-height:150%;font-size:16px;">How to access your ${certtypetitle}:</span></p>
                            <p style="margin-top:10.0000pt;margin-bottom:10.0000pt;line-height:150%;background:rgb(255,255,255);"><span style="font-family:Cambria;line-height:150%;font-size:16px;">You will receive your ${certtypetitle} in ${receiveFormatNum} formats:</span></p>
                            ${receiveFormats}
                            <p style="margin-top:10.0000pt;margin-bottom:10.0000pt;line-height:150%;background:rgb(255,255,255);"><span style="font-family:Cambria;line-height:150%;font-size:16px;">Experience our new verification process</span></p>
                            ${verifyprocessFormats}
                            <p style="margin-top:10.0000pt;margin-bottom:10.0000pt;line-height:150%;background:rgb(255,255,255);"><span style="font-family:Cambria;line-height:150%;font-size:16px;">Please note the one-time code is solely for the purpose of demonstration of the verification and will only be valid for a single access. You will have the opportunity to view and verify the authenticity of your ${certtypetitle} only once on our Blockchain-based verification system.</span></p>
                            <p style="margin-top:10.0000pt;margin-bottom:10.0000pt;line-height:150%;background:rgb(255,255,255);"><span style="font-family:Cambria;line-height:150%;font-size:16px;">Your one-time code:&nbsp;</span><strong><span style="font-family:Cambria;line-height:150%;font-size:16px;">${onetimecode}</span></strong></p>
                            <p style="margin-top:10.0000pt;margin-bottom:10.0000pt;line-height:132%;background:rgb(255,255,255);"><span style="font-family:Cambria;line-height:132%;color:rgb(34,34,34);font-size:16px;">Verifier Verification Process:</span></p>
                            ${verifierFormats}
                            <p style="margin-top:10.0000pt;margin-bottom:10.0000pt;line-height:150%;background:rgb(255,255,255);"><span style="font-family:Cambria;line-height:150%;font-size:16px;">If you encounter any difficulties or have questions regarding the ${certtypetitle} or the process. Please feel free to contact us at 0120-7170638/854/749/811 or registraroffice@snu.edu.in. We hope you find our innovative verification system beneficial.</span></p>
                            <p style="margin-top:10.0000pt;margin-bottom:10.0000pt;line-height:150%;background:rgb(255,255,255);"><span style="font-family:Cambria;line-height:150%;font-size:16px;">Thank you</span></p>
                            <p style="margin-top:10.0000pt;margin-bottom:10.0000pt;line-height:150%;background:rgb(255,255,255);"><span style="font-family:Cambria;line-height:150%;font-size:16px;">Best Regards</span></p>
                            <p style="margin-top:10.0000pt;margin-bottom:10.0000pt;line-height:150%;background:rgb(255,255,255);"><span style="font-family:Cambria;line-height:150%;font-size:16px;">Registrar</span></p>
                            <p style="margin-top:10.0000pt;margin-bottom:10.0000pt;line-height:150%;background:rgb(255,255,255);"><span style="font-family:Cambria;line-height:150%;font-size:16px;">&nbsp;</span></p>
                            <img src="https://www.certonce.com/images/snu/snulogo.png" style="width:300px;" />`;
                        }
                        else if(puserid =="20145") //nicmar
                        { 
                        cert_email_subject = `Your Blockchain Secured Grade card/Provisional Degree and final Degree at NICMAR University, Pune.`;  
                        email_body=`<p style="background-color:white;line-height:150%;margin:10.0pt 0in;"><span style="font-family:&quot;Cambria&quot;,serif;font-size:12.0pt;"><span style="line-height:150%;" lang="EN" dir="ltr">Dear ${fullname},</span></span></p>
                        <p style="background-color:white;line-height:normal;margin:10.0pt 0in;">
                            <meta charset="utf-8">
                        </p>
                        <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:10pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Congratulations on successfully graduating at NICMAR University, Pune. We are pleased to inform you that your Degree is now available for viewing and verification.</span></span></p>
                        <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">How to access your Blockchain Secured Certificates;</span></span></p>
                        <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:10pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">You will receive your Blockchain Secured Grade card/Provisional Degree and final Degree in 3 formats:</span></span></p>
                        <ol style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
                            <li style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Digital Smart PDF: Your digital PDF will have a logo to click and verify. This PDF can be shared with your potential employers, and potential Universities for further education.</span></span></li>
                            <li style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Print Version: Shared with you by the University, scan the QR code, to verify.</span></span></li>
                            <li style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:decimal;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">JSON file: Can be uploaded for verification on&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://certificates.nicmar.ac.in/"><span style="background-color:#ffffff;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://certificates.nicmar.ac.in/</u></span></span></a><span style="background-color:#ffffff;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">.&nbsp;</span></span></li>
                        </ol>
                        <p style="background-color:#ffffff;line-height:1.595;margin-bottom:10pt;margin-top:10pt;" dir="ltr"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Verifier Verification Process:</span></span></p>
                        <ul style="margin-bottom:0;margin-top:0;padding-inline-start:48px;">
                            <li style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your Verifier can&nbsp;</span></span><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">click on the logo, Scan the QR code or upload the JSON file on&nbsp;</span></span><a style="text-decoration:none;" target="_blank" rel="noopener noreferrer" href="https://certificates.nicmar.ac.in/"><span style="background-color:#ffffff;color:#1155cc;font-family:Cambria,serif;font-size:12pt;"><span style="-webkit-text-decoration-skip:none;font-style:normal;font-variant:normal;font-weight:400;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre-wrap;"><u>https://certificates.nicmar.ac.in/</u></span></span></a><span style="background-color:#ffffff;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">&nbsp;</span></span><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">to verify your credentials</span></span></li>
                            <li style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;font-style:normal;font-variant:normal;font-weight:400;list-style-type:disc;text-decoration:none;vertical-align:baseline;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Your verifiers can click on the request an official email button and pay an amount of stipulated amount to receive an official email from&nbsp;</span></span><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">NICMAR University, Pune</span></span><span style="background-color:transparent;color:#222222;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"> for confirming your credentials.</span></span></li>
                        </ul>
                        <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:10pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">If you encounter any difficulties or have questions regarding the Degree or the process, please feel free to contact us at [02066859154] or [coe@nicmar.ac.in]. We hope you find our innovative verification system beneficial.</span></span></p>
                        <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Thank you</span></span></p>
                        <p style="background-color:#ffffff;line-height:1.7999999999999998;margin-bottom:0pt;margin-top:0pt;padding:0pt 0pt 10pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Best Regards</span></span></p>
                        <p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">Controller of Examinations</span></span></p>
                        <p style="line-height:1.2;margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;color:#000000;font-family:Cambria,serif;font-size:12pt;"><span style="font-style:normal;font-variant:normal;font-weight:400;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">NICMAR University, Pune</span></span></p>
                        <p><img class="image_resized" style="width:200px;" src="https://www.certonce.com/images/nicmar/nicmarlogo.png"></p>
                        <p>&nbsp;</p>`;
                        }
                        else
                        {
                        cert_email_subject = "A Digital credential has been issued by "+organization_name; 
                        email_body=`<p style="color:black;">Hello ${first_name}</p>
                          <p style="color:black;">You have been issued a blockchain secured digital credential by ${organization_name}.</p>                            
                          <p><b>What do you do it?</b></p>
                          <ul>
                            <li type= "none" style="color:black;">  &ndash; This is a <a href="${myip+subwwwurl}">Tamper proof</a> and <a href="${jsonurl}${jsoncollegeid}/${verifyid}">Trusted digital credential</a> that you can share with anyone, a
                          future employer or any authority and they can <a href="${verifier_url_direct}${verifyid}">instantly verify</a> independent of the issuer ${organization_name}.</li>    
                            <li type= "none" style="color:black;">  &ndash; This is a <a href="${pdfurl}${pdfcollegeid}/${pdfid}">Trusted pdf digital credential.</a></li>
                          </ul>

                          <p ><b>How do you share it?</b></p>
                          <ul>
                              <li type= "none" style="color:black;">  &ndash; You can share this ${verifier_url_direct}${verifyid} on any social media or professional platform or forward on Whatsapp or mail.</li>
                          </ul>


                          <p style="color:black;"><b>How the receiver will verify it?</b></p>
                          <ul>
                              <li type= "none" style="color:black;">  &ndash; The receiver can go to <a href="${verifier_url_direct}${verifyid}">this verification link</a> and just post the link shared by you and verify the
                          authenticity of this certificate</li>    
                          </ul>
                          
                          <p style="color:black;">We are excited to have you join as a part of this digital credentialing revolution that is bringing back
                          the trust in digital documents.</p>
                          <p style="color:black;">Read More about advantages of Blockchain Secured Credentials.</p>
                          <p style="color:black;">Warm regards</p>
                          <p style="color:black;">Team CertOnce</p>
                        `;                      
                        if(mail_subject!="" && mail_subject!=null && mail_subject!=="null" && mail_content!="" && mail_content!=null && mail_content!=="null")
                        { 
                          cert_email_subject=mail_subject.replace(/ORGANIZATION_NAME/g, organization_name);

                          email_body=mail_content.replace(/FIRST_NAME/g, first_name);
                          email_body=email_body.replace(/ORGANIZATION_NAME/g, organization_name);
                          email_body=email_body.replace(/BASE_URL/g, myip+subwwwurl);
                          email_body=email_body.replace(/JSON_URL/g, jsonurl+jsoncollegeid+"/"+verifyid);
                          email_body=email_body.replace(/VERIFIER_URL/g, verifier_url_direct+verifyid);
                          email_body=email_body.replace(/PDF_URL/g, pdfurl+pdfcollegeid+"/"+pdfid);
                          email_body=email_body.replace(/QR_CODE/g, qrcode);
                        }
                        }
                        const mailer_sendcertificate = require("../../config/mailer_sendcertificate");
                        let logfilename=logfiledir+req.user.user_id+"/sendcertificate.log";
                        let attachment_files = []; 
                        if(smtpaccount['isoffice365']==undefined || smtpaccount['isoffice365']==null || smtpaccount['isoffice365']==0) {
                            attachment_files.push({path: jsonurl,filename:`${attachment_name}.json`});
                            attachment_files.push({path: pdfurl,filename:`${attachment_name}.pdf`});
                        }
                        else {
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
                        console.log("Before call mailer");
                        let mailer_result = await mailer_sendcertificate(email_body, cert_email_subject, email, smtpaccount, attachment_files, logfilename, cohorttablename, studentid);
                        console.log("After call mailer");
                        if ((puserid == "20122" || puserid == "25") && applicationid != ""){
                            const mailer_certonce = require("../../config/mailer_certonce");
                            let logfilename=logfiledir+puserid+"/sendcertificate.log";
                            mailer_certonce(email_body_university, email_subject_university, universitymail);
                        }
                        if (mailer_result.status == "400"){
                            const mailer_certonce = require("../../config/mailer_certonce");
                            let logfilename=logfiledir+puserid+"/sendcertificate.log";
                            let email_body = `<p style="color: black;">There is an error in sending certificates.</p>
                            <p style="color: black;">Error: ${JSON.stringify(mailer_result.message.response)}</p>`
                            let email_subject = "SendCertificate Result";
                            mailer_certonce(email_body, email_subject, contact_email, logfilename);
                            stop_flag = true;
                        }
                    }
                  }
                }                
                ///////////////////////////////////////////
              }
            }
            else //istotal true
            {
                console.log("@@@@@@@@@@@@ istotal true");
              if(glcohortid=="")
              {       
                const mailer_certonce = require("../../config/mailer_certonce");
                let logfilename=logfiledir+puserid+"/sendcertificate.log";
                let email_body = `<p style="color: black;">Invalid selected students.</p>`
                let email_subject = "SendCertificate Result";
                mailer_certonce(email_body, email_subject, contact_email, logfilename);
              }
              
              //let updateStateQuery = format(`UPDATE ${cohorttablename} b	SET b.certificatesendstate=1	WHERE b.cohortid in (select id from cohort where cohortid='${glcohortid}' and accountid='${puserid}') and b.certificatesendstate!=2;`);
              let updateStateQuery = format(`UPDATE ${cohorttablename} b	SET b.certificatesendstate=1	WHERE b.hold !='y' and b.hold!='yes' and b.cohortid in (select id from cohort where cohortid='${glcohortid}' and accountid='${puserid}');`);
              await pool.query(updateStateQuery);
        
              var whereClause =  "WHERE c.cohortid='"+ glcohortid +"' and c.accountid='"+puserid+"' and e.accountid='"+puserid+"' and b.certificatesendstate!=2;"
              //var whereClause =  "WHERE c.cohortid='"+ glcohortid +"' and c.accountid='"+puserid+"' and e.accountid='"+puserid+"';"
              var studentQuery = format(`SELECT a.*, c.*, b.*, d.*, b.id as studentidentify, c.cohortid as cohortfullid FROM student a 
                                            LEFT JOIN ${cohorttablename} b ON b.studentid=a.id 
                                            LEFT JOIN cohort c ON c.id=b.cohortid 
                                            LEFT JOIN cohort_group e ON e.cohortid=c.cohortid 
                                            LEFT JOIN certtemplate d ON d.id=e.certtemplateid ${whereClause}
                                            `);
                        
              
            }
                
          } 
          catch (err) {
            console.log("@@@@@@@@@@@@ is error");
            console.log(err.message);
            const mailer_certonce = require("../../config/mailer_certonce");
            let logfilename=logfiledir+puserid+"/sendcertificate.log";
            let email_body = `<p style="color: black;">${err.message }</p>`
            let email_subject = "SendCertificate Result";
            mailer_certonce(email_body, email_subject, contact_email, logfilename);
          }
    },
    template_replace_3 : async function (stringcontents, cohortid, main_std_id, rollnumber, serialnumber, fullname) { // NDIM PGDM-2018-2020
        try {
            fullname = fullname.toString().replace("Ms.", "").replace("Mr.", "").trim().toUpperCase();
            stringcontents = stringcontents.replace("COHORT_ID", cohortid);
            stringcontents = stringcontents.replace("STD_ID", main_std_id);
            stringcontents = stringcontents.replace("ENROLL_NO", rollnumber);
            stringcontents = stringcontents.replace("SERIAL_NO", serialnumber);
            stringcontents = stringcontents.replace("STD_NAME", fullname);
            if (rollnumber == "NDIM/PGDM/M/18006/1-7225891154" || rollnumber == "NDIM/PGDM/G/18212/1-9445595241" ) {
                stringcontents = stringcontents.replace(/idr6\\" style=\\"/g, 'idr6\\" style=\\"display: none;');
            }
            return stringcontents;
        }
        catch(err) {
            console.log(err.message);
            return stringcontents;
        }
    },
    template_replace_98 : async function (stringcontents, rollnumber, certificationcategory, competency_name, competencystartdate, competencyenddate, marks, signatureimage, logoimage, signaturename, signername){
        try{
            if (certificationcategory.toLowerCase().indexOf("participation") !== -1){
                stringcontents = stringcontents.replace(/CERTIFICATION_CATEGORY/g, "Participation");
                stringcontents = stringcontents.replace(/CERTIFICATION_SUB/g, "participated in the");
                stringcontents = stringcontents.replace(/CATEGORY_SUB/g, "");
                stringcontents = stringcontents.replace(/CATEGORY_REPLACE/g, "<br/>");
            }
            else if (certificationcategory.toLowerCase().indexOf("completion") !== -1){
                stringcontents = stringcontents.replace(/CERTIFICATION_CATEGORY/g, "Completion");
                stringcontents = stringcontents.replace(/CERTIFICATION_SUB/g, "successfully completed the");
                // stringcontents = stringcontents.replace(/CATEGORY_SUB/g, category_sub_replace);
                if (marks == "") stringcontents = stringcontents.replace(/CATEGORY_SUB/g, "");
                else stringcontents = stringcontents.replace(/CATEGORY_SUB/g, `and is awarded ${marks} PDUs`);
                stringcontents = stringcontents.replace(/CATEGORY_REPLACE/g, "");   
            }
            stringcontents = stringcontents.replace(/STD_ID/g, rollnumber);
            stringcontents = stringcontents.replace(/COMPETENCY_NAME/g, competency_name);
            stringcontents = stringcontents.replace(/COMPETENCY_START_DATE/g, competencystartdate);
            stringcontents = stringcontents.replace(/COMPETENCY_END_DATE/g, competencyenddate);
            stringcontents = stringcontents.replace("SIGNATUREIMAGE_REPLACE", signatureimage);
            stringcontents = stringcontents.replace("LOGOIMAGE_REPLACE", logoimage);
            stringcontents = stringcontents.replace("SIGNATURE_NAME", signaturename);
            stringcontents = stringcontents.replace("SIGNER_NAME", signername);
            // stringcontents = stringcontents.replace("PARTNERCOMPANY_NAME", partnercompanyname);
            return stringcontents;
        }
        catch(err){
        console.log(err.message);
        return stringcontents;
        }
    },
    template_replace_121 : async function (stringcontents, baseurl, cohortid, rollnumber, other6, other7, certtype) {
        try{
            let frontimgdata = `${baseurl}/backgroundimage/${cohortid}_${certtype}/${rollnumber}_1`;
            let backimgdata = `${baseurl}/backgroundimage/${cohortid}_${certtype}/${rollnumber}_2`;
            stringcontents = stringcontents.replace(/FRONT_IMAGE/g, frontimgdata);
            stringcontents = stringcontents.replace(/BACK_IMAGE/g, backimgdata);
            return stringcontents;
        }
        catch(err){
            console.log(err.message);
            return stringcontents;
        } 
    },
    template_replace_124 : async function (stringcontents, cohortid, rollnumber, student, student_uuid) {
        try{   
            let secondpage = student['secondpage'];
            if (secondpage == null || secondpage == undefined || secondpage == "") secondpage="BG";
            // let frontimgdata = `https://certification.ljku.edu.in/image/${cohortid}_${rollnumber}`;
            //console.log(frontimgdata);
            let backimgdata = "";
            console.log("student['subother2'] = : ", student['subother2']);
            if(student['subother2']=="current" || student['subother2']=="alumni"){
                backimgdata = `${myip}/images/LJKU/template124secondpage${secondpage}current.png`;
                stringcontents = stringcontents.replace(/BACK_IMAGE/g, backimgdata);
                stringcontents = stringcontents.replace("display: none;", "display: block;");
                console.log("backimgdata = : ", backimgdata);
                let printfrontimage = fs.readFileSync(`/home/ubuntu/download/${student_uuid}_temp.png`, { encoding: 'base64' });
                stringcontents = stringcontents.replace(/FRONT_PRINT_IMAGE/g, `data:image/png;base64,${printfrontimage}`);
            }
            await IMAGES(`${wwwdir}/images/LJKU/template124background.png`)
            .draw(IMAGES(`/home/ubuntu/download/${student_uuid}_temp.png`).resize(3150,4455), 0, 0)
            .save(`/home/ubuntu/download/${student_uuid}.png`);
            let frontimage = fs.readFileSync(`/home/ubuntu/download/${student_uuid}.png`, { encoding: 'base64' });
            stringcontents = stringcontents.replace(/FRONT_IMAGE/g, `data:image/png;base64,${frontimage}`);
            if (student['subother2']=="alumni") {
                stringcontents = stringcontents.replace("151mm; display: none;", "151mm; display: block;");
            }
            if (fs.existsSync(`/home/ubuntu/download/${student_uuid}_temp.png`)) {
                fs.unlinkSync(`/home/ubuntu/download/${student_uuid}_temp.png`);
            }
            if (fs.existsSync(`/home/ubuntu/download/${student_uuid}.png`)) {
                fs.unlinkSync(`/home/ubuntu/download/${student_uuid}.png`);
            }
            return stringcontents;
        }
        catch(err){
          console.log(err.message);
          return stringcontents;
        }
    },
    template_replace_128 : async function (stringcontents, student){
        try{
            var main_content = student['content'];
            stringcontents = stringcontents.replace("MAIN_REPLACE_PART", main_content.replace(/"/g,'\\"'));
            return stringcontents;
        }
        catch(err){
        console.log(err.message);
        return stringcontents;
        }
    },
    template_replace_133 : async function (stringcontents, fullname, competency_name, coursename, rollnumber, department, student){
        try{
            stringcontents = stringcontents.replace("ENROLL_NO", rollnumber);
            stringcontents = stringcontents.replace("STD_NAME", fullname);
            stringcontents = stringcontents.replace("COMPETENCY_NAME", competency_name);
            if (coursename !== ""){
                let temp = `<p style=\\"font-size: 21pt; color: #232378; font-family: clarendon; margin-top: -25px;\\">in</p>
                <p style=\\"width: 85%; text-align: center; font-size: 21pt; color: #232378; font-family: clarendon; margin-top: -25px;\\">${coursename}</p>`;
                stringcontents = stringcontents.replace("REPLACE_PART", temp);
            }
            else {
                stringcontents = stringcontents.replace("REPLACE_PART", "");
            }
            if (student["subother7"] == "diploma") {
                stringcontents = stringcontents.replace(/ degree of/g, "");
                stringcontents = stringcontents.replace(/The degree/g, "The diploma certificate");
            }
            stringcontents = stringcontents.replace("DEPARTMENT", department);
            return stringcontents;
        }
        catch(err){
            console.log(err.message);
            return stringcontents
        }
    },
    template_replace_140 : async function (stringcontents, fullname, certificationcategory, competency_name, coursename, rollnumber, serialnumber, coursecompletiondate, student){
        try{
            let main_content = "";
            let course_content = "";
            let grade_content = "";
            let line_height1 = "22px";
            if (coursename != "") course_content = `<tr style="line-height: 17pt;"><td style="text-align: center; font-size: 16pt; font-family: alegreya; color: #500210; font-weight: bold;">${coursename}</td></tr>`;
            if (student['subother2'] == "") grade_content = `<tr><td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210;">Grade: <span style="font-weight: bold;">${student['subother1']}</td></tr>`;
            else grade_content = `<tr><td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210;">Grade: <span style="font-weight: bold;">${student['subother1']}</span> CGPA: <span style="font-weight: bold;">${student['subother2']}</span></td></tr>`;
            let internship_content = "";
            if (certificationcategory.toString().toLowerCase().trim() == "ugbachelorinternship") {
                internship_content = `<tr style="line-height: ${line_height1};"><td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210;">Compulsory rotatory internship completed on ${student['subother8']}</td></tr>`;
            }
            if (certificationcategory.toString().toLowerCase().trim() == "degree" || certificationcategory.toString().toLowerCase().trim() == "diploma" || certificationcategory.toString().toLowerCase().trim() == "pgmaster" || certificationcategory.toString().toLowerCase().trim() == "ugbachelor" || certificationcategory.toString().toLowerCase().trim() == "ugbachelorinternship" ) {
                main_content = `<img src="${myip}/images/GCU/vc_signature.png" style="position:absolute; left:93mm; top:249mm; height:42px;" id="vcsignatureid" />
                    <table style="width: 160mm; margin-top: 0px;">
                    <tbody>
                        <tr style="line-height: 25pt;">
                        <td style="text-align: center; font-size: 24pt; font-family: alegreya; font-weight: bold; color: #500210;">${fullname}</td>
                        </tr>
                        <tr style="line-height: ${line_height1};">
                        <td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210;">has been duly admitted to the degree of</td>
                        </tr>
                        <tr style="line-height: 23pt;">
                        <td style="text-align: center; font-size: 22pt; font-family: alegreya; font-weight: bold; color: #500210;">${competency_name}</td>
                        </tr>
                        ${course_content}
                        <tr style="line-height: ${line_height1};">
                        <td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210;">with all rights, honors and privileges thereunto appertaining,</td>
                        </tr>
                        <tr style="line-height: ${line_height1};">
                        <td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210;">in recognition of the fulfilment of requirements</td>
                        </tr>
                        <tr style="line-height: ${line_height1};">
                        <td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210;">for the said degree.</td>
                        </tr>
                        <tr style="line-height: ${line_height1};">
                        <td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210;">Year of Examination: <span style="font-weight: bold;">${coursecompletiondate}</span></td>
                        </tr>
                        ${certificationcategory.toString().toLowerCase().trim() == "ugbachelorinternship" && internship_content ? internship_content : ""}
                        ${grade_content}
                        <tr style="line-height: ${line_height1};">
                        <td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210;">In witness whereof, the seal of the University and the signature as</td>
                        </tr>
                        <tr style="line-height: ${line_height1};">
                        <td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210;">authorised by the Statutes, is hereunto affixed, on this</td>
                        </tr>
                        <tr style="line-height: ${line_height1};">
                        <td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210;">${student['subother5'].trim()}, in the year ${student['subother6']}</td>
                        </tr>
                        <tr style="line-height: ${line_height1};">
                        <td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210;">(${student['subother7']}).</td>
                        </tr>            
                    </tbody>
                    </table>`;
                stringcontents = stringcontents.replace("MAIN_CONTENT", main_content.replace(/"/g,'\\"'));
            }    
            else if (certificationcategory.toString().toLowerCase().trim() == "phd") {
                let temp_completiondate = coursecompletiondate.split(" ");
                temp_completiondate[0] = temp_completiondate[0].replace("st", `<sup style="font-size: 8pt;">st</sup>`).replace("nd", `<sup style="font-size: 8pt;">nd</sup>`).replace("rd", `<sup style="font-size: 8pt;">rd</sup>`).replace("th", `<sup style="font-size: 8pt;">th</sup>`);
                coursecompletiondate = temp_completiondate.join(" ");
                line_height1 = "20px";
                let signature = `<img src="${myip}/images/GCU/vc_signature.png" style="position:absolute; left:93mm; top:249mm; height:42px;" id="vcsignatureid" />`;
                if (rollnumber == '19PAPT103') {
                    signature = `<img src="${myip}/images/GCU/vc_signature.png" style="position:absolute; left:94mm; top:254mm; height:36px;" id="vcsignatureid" />`;
                    coursecompletiondate = coursecompletiondate.replace("September", "August");
                }
                main_content = `${signature}
                    <table style="width: 154mm; margin-top: 0px;">
                    <tbody>
                        <tr style="line-height: 25pt;">
                        <td style="text-align: center; font-size: 24pt; font-family: alegreya; font-weight: bold; color: #500210;">${fullname}</td>
                        </tr>
                        <tr style="line-height: ${line_height1};">
                        <td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210;">has been duly admitted to the degree of</td>
                        </tr>
                        <tr style="line-height: 23pt;">
                        <td style="text-align: center; font-size: 22pt; font-family: alegreya; font-weight: bold; color: #500210;">${competency_name}</td>
                        </tr>
                        <tr style="line-height: ${line_height1};">
                        <td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210;">with all rights, honors and privileges thereunto appertaining,</td>
                        </tr>
                        <tr style="line-height: ${line_height1};">
                        <td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210;">in recognition of the fulfilment of requirements for the said degree.</td>
                        </tr>            
                        <tr style="line-height: ${line_height1};">
                        <td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210;">Date of Examination : <span style="font-weight: bold;">${coursecompletiondate}</span></td>
                        </tr>
                        <tr style="line-height: 23px;">
                        <td style="width: 80%; text-align: center; font-size: 14pt; font-family: alegreya; color: #500210;">Title of the Thesis : <span style="font-weight: bold;">${student['subother3']}</span></td>
                        </tr>
                        <tr style="line-height: ${line_height1};">
                        <td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210;">Subject : <span style="font-weight: bold;">${student['subother4']}</span></td>
                        </tr>
                        <tr style="line-height: ${line_height1};">
                        <td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210;">In witness whereof, the seal of the University and the signature</td>
                        </tr>
                        <tr style="line-height: ${line_height1};">
                        <td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210;">as authorised by the Statutes, is hereunto affixed, on this</td>
                        </tr>
                        <tr style="line-height: ${line_height1};">
                        <td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210; letter-spacing: -1.2px;">${student['subother5'].trim()}, in the year ${student['subother6']}.</td>
                        </tr>
                        <tr style="line-height: ${line_height1};">
                        <td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210; letter-spacing: -1.2px;">(${student['subother7']})</td>
                        </tr>
                        <tr style="line-height: ${line_height1};">
                        <td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210; padding-top: 10px;">The degree has been awarded in compliance with the "UGC, Minimum</td>
                        </tr> 
                        <tr style="line-height: ${line_height1};">
                        <td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210;">Standards and Procedure for Award of M.Phil. / Ph.D. degree</td>
                        </tr>
                        <tr style="line-height: ${line_height1};">
                        <td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210;">Regulations, 2016 and subsequent amendments"</td>
                        </tr>           
                    </tbody>
                    </table>`;
                stringcontents = stringcontents.replace("MAIN_CONTENT", main_content.replace(/"/g,'\\"'));  
            }
            else{
                return stringcontents;
            }
            stringcontents = stringcontents.replace("STD_ID", rollnumber);
            stringcontents = stringcontents.replace("SERIAL_NO", serialnumber);
            stringcontents = stringcontents.replace("IMAGE_REPLACE_ONE", `${myip}/images/backend/empty.png`);
            stringcontents = stringcontents.replace("COMPLETION_DATE", coursecompletiondate);
            if (student["photourl"]) {
                stringcontents = stringcontents.replace("MEMBER_PHOTO",'<img src=\\"' + student['photourl'] + '\\" style=\\"height: 130px; \\">');
            } else {
                stringcontents = stringcontents.replace("MEMBER_PHOTO",'<img src=\\"' + `${myip}/images/nicmar/nicmar_degree_student.png` + '\\" style=\\"height: 130px; \\">');
            }
            return stringcontents;
        }
        catch(err){
            console.log(err.message);
            return stringcontents;
        }  
    },
    template_replace_195 : async function (stringcontents, fullname, certificationcategory, competency_name, coursename, rollnumber, serialnumber, coursecompletiondate, student){
        try{
            let main_content = "";
            let course_content = "";
            let grade_content = "";
            let line_height1 = "22px";
            if (coursename != "") course_content = `<tr><td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210;">Specialization: <span style="font-weight: bold;">${coursename}</td></tr>`;
            if (student['subother2'] == "") grade_content = `<tr><td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210;">Grade: <span style="font-weight: bold;">${student['subother1']}</td></tr>`;
            else grade_content = `<tr><td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210;">Grade: <span style="font-weight: bold;">${student['subother1']}</span> CGPA: <span style="font-weight: bold;">${student['subother2']}</span></td></tr>`;
            let internship_content = "";
            if (certificationcategory.toString().toLowerCase().trim() == "ugbachelorinternship") {
                    internship_content = `<tr style="line-height: ${line_height1};"><td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210;">Compulsory rotatory internship completed on ${student['subother8']}</td></tr>`;
            }
            if (certificationcategory.toString().toLowerCase().trim() == "pgmaster") {
                main_content = `<img src="${myip}/images/GCU/vc_signature.png" style="position:absolute; left:93mm; top:249mm; height:42px;" id="vcsignatureid" />
                    <table style="width: 160mm; margin-top: 0px;">
                    <tbody>
                        <tr style="line-height: 25pt;">
                        <td style="text-align: center; font-size: 24pt; font-family: alegreya; font-weight: bold; color: #500210;">${fullname}</td>
                        </tr>
                        <tr style="line-height: ${line_height1};">
                        <td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210;">has been duly admitted to the degree of</td>
                        </tr>
                        <tr style="line-height: 23pt;">
                        <td style="text-align: center; font-size: 22pt; font-family: alegreya; font-weight: bold; color: #500210;">${competency_name}</td>
                        </tr>
                        <tr style="line-height: ${line_height1};">
                        <td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210;">with all rights, honors and privileges thereunto appertaining,</td>
                        </tr>
                        <tr style="line-height: ${line_height1};">
                        <td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210;">in recognition of the fulfilment of requirements</td>
                        </tr>
                        <tr style="line-height: ${line_height1};">
                        <td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210;">for the said degree.</td>
                        </tr>
                        <tr style="line-height: ${line_height1};">
                        <td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210;">Year of Examination: <span style="font-weight: bold;">${coursecompletiondate}</span></td>
                        </tr>
                        ${certificationcategory.toString().toLowerCase().trim() == "ugbachelorinternship" && internship_content ? internship_content : ""}
                        ${course_content}
                        ${grade_content}
                        <tr style="line-height: ${line_height1};">
                        <td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210;">In witness whereof, the seal of the University and the signature as</td>
                        </tr>
                        <tr style="line-height: ${line_height1};">
                        <td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210;">authorised by the Statutes, is hereunto affixed, on this</td>
                        </tr>
                        <tr style="line-height: ${line_height1};">
                        <td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210;">${student['subother5'].trim()}, in the year ${student['subother6']}</td>
                        </tr>
                        <tr style="line-height: ${line_height1};">
                        <td style="text-align: center; font-size: 14pt; font-family: alegreya; color: #500210;">(${student['subother7']}).</td>
                        </tr>            
                    </tbody>
                    </table>`;
                stringcontents = stringcontents.replace("MAIN_CONTENT", main_content.replace(/"/g,'\\"'));
            }
            else{
                    return stringcontents;
            }
            stringcontents = stringcontents.replace("STD_ID", rollnumber);
            stringcontents = stringcontents.replace("SERIAL_NO", serialnumber);
            stringcontents = stringcontents.replace("IMAGE_REPLACE_ONE", `${myip}/images/backend/empty.png`);
            stringcontents = stringcontents.replace("COMPLETION_DATE", coursecompletiondate);
            if (student["photourl"]) {
                    stringcontents = stringcontents.replace("MEMBER_PHOTO",'<img src=\\"' + student['photourl'] + '\\" style=\\"height: 130px; \\">');
            } else {
                    stringcontents = stringcontents.replace("MEMBER_PHOTO",'<img src=\\"' + `${myip}/images/nicmar/nicmar_degree_student.png` + '\\" style=\\"height: 130px; \\">');
            }
            return stringcontents;
        }
        catch(err){
                console.log(err.message);
                return stringcontents;
        }  
    },
    template_replace_145 : async function (stringcontents, certificationcategory, fullname, competency_name, coursename, rollnumber, student){
        try{            
            let main_content = "";
            let sex_sub1 = "";
            if (student['sex'].toString().toLowerCase() == "m"){
                sex_sub1 = "him";
            }
            else if (student['sex'].toString().toLowerCase() == "f"){
                sex_sub1 = "her";
            }
            else sex_sbu1 = "unknown";
            let course_date = student['subother2'].replace('st', `<sup style="font-size: 10pt; padding-left: 6px;">st</sup>`).replace('nd', `<sup style="font-size: 9pt; padding-left: 6px;">nd</sup>`).replace('rd', `<sup style="font-size: 9pt; padding-left: 6px;">rd</sup>`).replace('th', `<sup style="font-size: 9pt; padding-left: 6px;">th</sup>`);
            // let exam_date = student['subother1'].replace('st', `<sup style="font-size: 10pt; padding-left: 6px;">st</sup>`).replace('nd', `<sup style="font-size: 9pt; padding-left: 6px;">nd</sup>`).replace('rd', `<sup style="font-size: 9pt; padding-left: 6px;">rd</sup>`).replace('th', `<sup style="font-size: 9pt; padding-left: 6px;">th</sup>`);
            let exam_date = student['subother1'];
            if (exam_date.indexOf("st") != -1){
                let temp_result = [];
                let temp_list = exam_date.split(" ");
                temp_list.forEach(ele => {
                    if (ele != ""){
                        if (ele.indexOf("st") != -1){
                            if(ele.toString().toLowerCase().indexOf("august") != -1) temp_result.push(ele);
                            else temp_result.push(ele.replace('st', `<sup style="font-size: 10pt; padding-left: 6px;">st</sup>`))
                        }
                        else temp_result.push(ele.replace('nd', `<sup style="font-size: 9pt; padding-left: 6px;">nd</sup>`).replace('rd', `<sup style="font-size: 9pt; padding-left: 6px;">rd</sup>`).replace('th', `<sup style="font-size: 9pt; padding-left: 6px;">th</sup>`));
                    }                    
                })
                exam_date = temp_result.join(" ");
            }
            else exam_date = student['subother1'].replace('st', `<sup style="font-size: 10pt; padding-left: 6px;">st</sup>`).replace('nd', `<sup style="font-size: 9pt; padding-left: 6px;">nd</sup>`).replace('rd', `<sup style="font-size: 9pt; padding-left: 6px;">rd</sup>`).replace('th', `<sup style="font-size: 9pt; padding-left: 6px;">th</sup>`);
            if (certificationcategory.toLowerCase() == "diploma"){
                let line_height = '29pt';                
                main_content1 = `<center>
                <table style="width: 90%; margin-top: 70px;"><tbody>
                <tr>
                    <td style="width: 80%; text-align: right;"></td>
                    <td style="width: 20%; text-align: center;">
                        <p style="font-size: 10pt; margin-top: 0px; margin-bottom: 5px; font-family: arial;">${rollnumber}</p>
                        MEMBER_PHOTO
                    </td>                
                </tr>
                </tbody></table></center>
                <center>            
                <table style="width: 85%; margin-top: 195px;"><tbody>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 25pt; padding-top: 0px; font-style: italic;">${fullname}</p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 20pt; padding-top: 0px; font-style: italic;">has passed the</p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 28pt; padding-top: 0px; ">${competency_name}</p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: timesnewroman;">
                            <p style="font-size: 15pt; padding-top: 0px;">${coursename}</p>
                        </td>                
                    </tr>
                </tbody></table></center>
                <center>            
                <table style="width: 85%;"><tbody>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 20pt; padding-top: 0px; font-style: italic;">under the faculty of ${student['facultyname']}</p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 20pt; padding-top: 0px; font-style: italic;">Examination in Pass Class held in ${student['subother1']}</p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 20pt; padding-top: 0px; font-style: italic;">The said Degree has been conferred upon ${sex_sub1}</p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 20pt; padding-top: 0px; font-style: italic;">at the convocation held on ${course_date} of the month of</p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 20pt; padding-top: 0px; font-style: italic;">${student['subother4']} in the Year ${student['subother3']}</p>
                        </td>                
                    </tr>
                </tbody></table></center>
                `;
                main_content = `<center>
                <table style="width: 91%; margin-top: 92px;"><tbody>
                <tr>
                    <td style="width: 80%; text-align: right;"></td>
                    <td style="width: 20%; text-align: center;">
                        <p style="font-size: 10pt; margin-top: 0px; margin-bottom: 5px; font-family: arial;">${rollnumber}</p>
                        MEMBER_PHOTO
                    </td>                
                </tr>
                </tbody></table></center>
                <center>            
                <table style="width: 85%; margin-top: 200px;"><tbody>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 25pt; padding-top: 0px; font-style: italic;">${fullname}</p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 20pt; padding-top: 0px; font-style: italic;">has passed the</p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 20pt; padding-top: 0px; font-style: italic;">${competency_name} in ${coursename}</p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 20pt; padding-top: 0px; font-style: italic;">Examination held in ${exam_date} and</p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 20pt; padding-top: 0px; font-style: italic;"> has secured CGPA ${student['subother5']}.</p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 20pt; padding-top: 0px; font-style: italic;">The said Degree has been conferred upon ${sex_sub1} </p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 20pt; padding-top: 0px; font-style: italic;">at the convocation held on ${course_date} of the month of </p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 20pt; padding-top: 0px; font-style: italic;">${student['subother4']} in the Year ${student['subother3']}</p>
                        </td>                
                    </tr>
                </tbody>
                </table>                    
                `;
                stringcontents = stringcontents.replace("BACKGROUND_IMAGE", `${myip}/images/D_Y_Patil/template145backgrounddigital.png`);
                stringcontents = stringcontents.replace("MAIN_REPLACE_PART", main_content.replace(/"/g,'\\"'));
                return stringcontents;
            }
            else if (certificationcategory.toLowerCase() == "bachelor"){
                let line_height = '29pt';
                if (coursename != "") {
                    coursename = ` <tr style="line-height: ${line_height};">
                    <td style="text-align: center; font-family: timesnewroman;">
                        <p style="font-size: 15pt; padding-top: 0px;">(${coursename})</p>
                    </td>                
                </tr>`;
                }

                main_content = `<center>
                <table style="width: 91%; margin-top: 92px;"><tbody>
                <tr>
                    <td style="width: 80%; text-align: right;"></td>
                    <td style="width: 20%; text-align: center;">
                        <p style="font-size: 10pt; margin-top: 0px; margin-bottom: 5px; font-family: arial;">${rollnumber}</p>
                        MEMBER_PHOTO
                    </td>                
                </tr>
                </tbody></table></center>
                <center>            
                <table style="width: 85%; margin-top: 200px;"><tbody>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 25pt; padding-top: 0px; font-style: italic;">${fullname}</p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 20pt; padding-top: 0px; font-style: italic;">has passed the</p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 28pt; padding-top: 0px; ">${competency_name}</p>
                        </td>                
                    </tr>
                    ${coursename}                   
                </tbody></table></center>
                <center>            
                <table style="width: 85%;"><tbody>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 20pt; padding-top: 0px; font-style: italic;">Examination in ${student['subother6']} held in ${exam_date}</p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 20pt; padding-top: 0px; font-style: italic;">The said Degree has been conferred upon ${sex_sub1}</p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 20pt; padding-top: 0px; font-style: italic;">at the convocation held on ${course_date} of the month of</p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 20pt; padding-top: 0px; font-style: italic;">${student['subother4']} in the Year ${student['subother3']}</p>
                        </td>                
                    </tr>
                </tbody></table></center>
                `;
                stringcontents = stringcontents.replace("BACKGROUND_IMAGE", `${myip}/images/D_Y_Patil/template145backgrounddigital.png`);
                stringcontents = stringcontents.replace("MAIN_REPLACE_PART", main_content.replace(/"/g,'\\"'));
                return stringcontents;
            }
            else if (certificationcategory.toLowerCase() == "phd"){
                let line_height = "24pt";
                main_content1 = `<center>
                <table style="width: 90%; margin-top: 85px;"><tbody>
                <tr>
                    <td style="width: 80%; text-align: right;"></td>
                    <td style="width: 20%; text-align: center;">
                        <p style="font-size: 10pt; margin-bottom: 3px; font-family: arial;">${rollnumber}</p>
                        MEMBER_PHOTO
                    </td>                
                </tr>
                </tbody></table></center>
                <center>            
                <table style="width: 85%; margin-top: 155px;"><tbody>
                    <tr">
                        <td style="text-align: center; font-family: cloisterblackbt;">
                            <p style="font-size: 55pt; padding-top: 0px;">${competency_name}</p>
                        </td>                
                    </tr>
                    <tr style="line-height: 40pt;">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 32pt; padding-top: 0px; padding-top: 20px;">(${coursename})</p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 20pt; padding-top: 0px; font-style: italic;">under the faculty of ${student['facultyname']}</p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 23pt; padding-top: 0px;">has been conferred upon her at the convocation held</p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 23pt; padding-top: 0px;">on ${course_date} of the month of ${student['subother4']} in the year</p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 20pt; padding-top: 0px;">${student['subother3']}</p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 23pt; padding-top: 0px;">on</p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 23pt; padding-top: 0px;">${fullname}</p>
                        </td>                
                    </tr>
                </tbody></table></center>
                `;
                main_content = `<center>
                <table style="width: 91%; margin-top: 92px;"><tbody>
                <tr>
                    <td style="width: 80%; text-align: right;"></td>
                    <td style="width: 20%; text-align: center;">
                        <p style="font-size: 10pt; margin-bottom: 3px; font-family: arial;">${rollnumber}</p>
                        MEMBER_PHOTO
                    </td>                
                </tr>
                </tbody></table></center>
                <center>            
                <table style="width: 70%; margin-top: 200px;"><tbody>
                    <tr">
                        <td style="text-align: center; font-family: cloisterblackbt;">
                            <p style="font-size: 55pt; padding-top: 0px;">${competency_name}</p>
                        </td>                
                    </tr>
                    <tr style="line-height: 40pt;">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 32pt; padding-top: 0px; padding-top: 10px;">(${coursename})</p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 20pt; padding-top: 0px; font-style: italic;">has been conferred upon ${sex_sub1} under the Faculty of</p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 20pt; padding-top: 0px; font-style: italic;">${student['facultyname']} at the convocation held on </p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 20pt; padding-top: 0px; font-style: italic;">${course_date} of the month of ${student['subother4']} in the Year </p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 20pt; padding-top: 0px; font-style: italic;">${student['subother3']}</p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 23pt; padding-top: 0px;">on</p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 23pt; padding-top: 0px;">${fullname}</p>
                        </td>                
                    </tr>
                </tbody></table></center>
                `;
                stringcontents = stringcontents.replace("BACKGROUND_IMAGE", `${myip}/images/D_Y_Patil/template145backgrounddigitalphd.png`);
                stringcontents = stringcontents.replace("MAIN_REPLACE_PART", main_content.replace(/"/g,'\\"'));
                return stringcontents;
            }
            else if (certificationcategory.toLowerCase() == "fellowship"){
                let line_height = '37pt';
                main_content = `<center>
                <table style="width: 100%; margin-top: 215px;"><tbody>
                <tr>                    
                    <td style="width: 100%; text-align: center;">
                        <p style="font-size: 10pt; margin-top: 0px; margin-bottom: 5px; font-family: arial;">${rollnumber}</p>
                        MEMBER_PHOTO
                    </td>                
                </tr>
                </tbody></table></center>
                <center>            
                <table style="width: 85%; margin-top: 30px;"><tbody>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 23pt; padding-top: 0px; font-style: italic;">This is to certify that</p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 35pt; padding-top: 0px; font-style: italic;">${fullname}</p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 23pt; padding-top: 0px; font-style: italic;">has passed the</p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 35pt; padding-top: 0px; font-style: italic;">Fellowship Programme</p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 23pt; padding-top: 0px; ">in ${competency_name}</p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 23pt; padding-top: 0px; font-style: italic;">in the month of ${student['subother1']} and</p>
                        </td>                
                    </tr>                    
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center; font-family: english157bt;">
                            <p style="font-size: 23pt; padding-top: 0px; font-style: italic;">has obtained ${student['subother7']} Credit Points</p>
                        </td>                
                    </tr>
                </tbody></table></center>
                `;
                stringcontents = stringcontents.replace("BACKGROUND_IMAGE", `${myip}/images/D_Y_Patil/template145backgrounddigitalfellowship.png`);
                stringcontents = stringcontents.replace("MAIN_REPLACE_PART", main_content.replace(/"/g,'\\"'));
                return stringcontents;
            }
            else return stringcontents;
        }
        catch(err){
            console.log(err);
            return stringcontents;
        }
    },
    template_replace_146 : async function (stringcontents, certificationcategory, fullname, competency_name, coursename, rollnumber, serialnumber,student){
        try{            
            let main_content = "";
            if (certificationcategory.toLowerCase() == "degree"){
                let line_height = '21pt';                
                main_content = `<div style="position: absolute; top: -10px; background-image: url('${myip}/images/CTU/template146digitalfront.png'); background-repeat: no-repeat; background-size: cover; width: 297mm; height: 210mm;">
                <center>
                    <table style="width: 90%; margin-top: 45px;"><tbody>
                        <tr>
                            <td style="width: 50%; text-align: left;">
                                <p style="font-size: 10pt; margin-top: 0px; margin-bottom: 5px; font-family: arial;">Registration No. : ${rollnumber}</p>
                            </td>
                            <td style="width: 50%; text-align: right;">
                                <p style="font-size: 10pt; margin-top: 0px; margin-bottom: 5px; font-family: arial;">Certificate No. : ${serialnumber}</p>
                            </td>                
                        </tr>
                        <tr>
                            <td style="text-align: left;">
                                <img style="padding-top: 40px; height: 70px;" src="PRINT_REPLACE" />
                            </td>
                        </tr>
                    </tbody></table>
                </center>
                <center>            
                    <table style="width: 90%; margin-top: 135px;"><tbody>
                        <tr style="line-height: 25pt;">
                            <td style="text-align: center;">
                                <p style="font-size: 20pt; padding-top: 0px; font-weight: bold; font-family: certificate;padding-bottom: 15px;">${competency_name}</p>
                            </td>                
                        </tr>
                        <tr style="line-height: ${line_height};">
                            <td style="text-align: justify;">
                                <p style="font-size: 14pt; padding-top: 0px; font-family: blkchry;">This is to certify that <span style="border-bottom: 1px solid #000; padding-bottom: 1px;">${fullname}</span> S/D/o <span style="border-bottom: 1px solid #000; padding-bottom: 1px;">${student['fathername']}</span> & <span style="border-bottom: 1px solid #000; padding-bottom: 1px;">${student['mothername']}</span> has been awarded the degree of <span style="border-bottom: 1px solid #000; padding-bottom: 1px;">${competency_name}</span> from CT University after having duly completed ${student['subother1']} of study through ${student['subother5']} mode at School of ${coursename} and passed the examination held in <span style="border-bottom: 1px solid #000; padding-bottom: 1px;">${student['subother2']}</span> with <span style="border-bottom: 1px solid #000; padding-bottom: 1px;">${student['subother3']}</span>.</p>
                            </td>                
                        </tr>
                        <tr style="line-height: 25pt;">
                            <td style="text-align: center;">
                                <p style="font-size: 14pt; padding-top: 10px; font-family: blkchry;">Given under the seal of the University.</p>
                            </td>                
                        </tr>
                    </tbody></table>
                    <p style="position: absolute; top: 726px;left:50px; font-size: 14pt; font-family: blkchry;">Ludhiana, ${student['subother7']}</p>
                </center>
                </div>
                
                `;
                //<div style="position: absolute; top: 785px; background-image: url('${myip}/images/CTU/template146digitalback.png'); background-repeat: no-repeat; background-size: cover; width: 297mm; height: 210mm;"></div>
                stringcontents = stringcontents.replace("MAIN_REPLACE_PART", main_content.replace(/"/g,'\\"'));
                return stringcontents;
            }
            else if (certificationcategory.toLowerCase() == "phd"){
                let line_height = '21pt';                
                main_content = `<div style="position: absolute; top: -10px; background-image: url('${myip}/images/CTU/template146digitalfront.png'); background-repeat: no-repeat; background-size: cover; width: 297mm; height: 210mm;">
                <center>
                    <table style="width: 90%; margin-top: 45px;"><tbody>
                        <tr>
                            <td style="width: 50%; text-align: left;">
                                <p style="font-size: 10pt; margin-top: 0px; margin-bottom: 5px; font-family: arial;">Registration No. : ${rollnumber}</p>
                            </td>
                            <td style="width: 50%; text-align: right;">
                                <p style="font-size: 10pt; margin-top: 0px; margin-bottom: 5px; font-family: arial;">Certificate No. : ${serialnumber}</p>
                            </td>                
                        </tr>
                        <tr>
                            <td style="text-align: left;">
                                <img style="padding-top: 40px; height: 70px;" src="PRINT_REPLACE" />
                            </td>
                        </tr>
                    </tbody></table>
                </center>
                <center>            
                    <table style="width: 90%; margin-top: 135px;"><tbody>
                        <tr style="line-height: 25pt;">
                            <td style="text-align: center;">
                                <p style="font-size: 20pt; padding-top: 0px; font-weight: bold; font-family: certificate;">${competency_name}</p>
                            </td>                
                        </tr>
                        <tr style="line-height: ${line_height};">
                            <td style="text-align: justify;">
                                <p style="font-size: 14pt; padding-top: 0px;  font-family: blkchry;">This is to certify that <span style="border-bottom: 1px solid #000; padding-bottom: 1px;">${fullname}</span> S/D/o <span style="border-bottom: 1px solid #000; padding-bottom: 1px;">${student['fathername']}</span> & <span style="border-bottom: 1px solid #000; padding-bottom: 1px;">${student['mothername']}</span> has been awarded the Degree of ${competency_name} in the Discipline of <span style="border-bottom: 1px solid #000; padding-bottom: 1px;">${student['subother6']}</span> from CT University in the month of ${student['subother2']} in accordance with the provisions of UGC (Minimum Standards and Procedure for Awards of M.Phil./Ph.D. Degree), Regulations,2009.</p>
                            </td>                
                        </tr>
                        <tr style="line-height: 25pt;">
                            <td style="text-align: center;">
                                <p style="font-size: 14pt; padding-top: 10px; font-family: blkchry;">Title of the thesis is: “${student['subother4']}”</p>
                            </td>                
                        </tr>
                        <tr style="line-height: 25pt;">
                            <td style="text-align: center;">
                                <p style="font-size: 14pt; padding-top: 10px; font-family: blkchry;">Given under the seal of the University.</p>
                            </td>                
                        </tr>
                    </tbody></table>
                    <p style="position: absolute; top: 726px;left:50px; font-size: 14pt; font-family: blkchry;">Ludhiana, ${student['subother7']}</p>
                </center>
                </div>
                
                `;
                //<div style="position: absolute; top: 785px; background-image: url('${myip}/images/CTU/template146digitalback.png'); background-repeat: no-repeat; background-size: cover; width: 297mm; height: 210mm;"></div>
                stringcontents = stringcontents.replace("MAIN_REPLACE_PART", main_content.replace(/"/g,'\\"'));
                return stringcontents;
            }
        }
        catch(err){
            console.log(err);
            return stringcontents;
        }
    },
    template_replace_147 : async function (stringcontents, cohortid, rollnumber, temp_filename){
        try{             
            const poppler = new Poppler('/usr/bin');
            const options = {
                pngFile: true,
            transparentPageColor: true,
            };
            const outputFile = `/home/ubuntu/download/${temp_filename}`;
            const res = await poppler.pdfToCairo(`/home/ubuntu/download/${temp_filename}_temp.pdf`, outputFile, options);
            // await IMAGES(`${wwwdir}/images/JAIN/template147_1.png`)
            // .resize(3405, 2863)
            // .draw(IMAGES(IMAGES(`/home/ubuntu/download/${temp_filename}-1.png`).resize(3555, 3013), 100, 65, 3555, 2613), 0, 0).save(`/home/ubuntu/download/${temp_filename}_digital.png`);
            
            // await IMAGES(`${wwwdir}/images/JAIN/template147_1.png`)
            // .resize(1700,1430)
            // .draw(IMAGES(IMAGES(`/home/ubuntu/download/${temp_filename}-1.png`)
            // .resize(1778, 1507), 50, 35, 1778, 1307), 0, 0)
            // .save(`/home/ubuntu/download/${temp_filename}_digital.png`);

            await IMAGES(`${wwwdir}/images/JAIN/template147_1.png`)
            .resize(2270,1908)
            .draw(IMAGES(IMAGES(`/home/ubuntu/download/${temp_filename}-1.png`)
            .resize(2376, 2008), 67, 44, 2276, 1735), 0, 0)
            .save(`/home/ubuntu/download/${temp_filename}_digital.png`);
            let frontimage =  fs.readFileSync(`/home/ubuntu/download/${temp_filename}_digital.png`, { encoding: 'base64' });
            let backimgdata = `${myip}/images/JAIN/template147back.png`;
            stringcontents = stringcontents.replace(/FRONT_IMAGE/g, `data:image/png;base64,${frontimage}`); 
            stringcontents = stringcontents.replace(/BACK_IMAGE/g, backimgdata);
            if (fs.existsSync(`/home/ubuntu/download/${temp_filename}_temp.pdf`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}_temp.pdf`);
            }
            
            if (fs.existsSync(`${wwwdir}/images/JAIN/${temp_filename}_print.png`)) {
                fs.unlinkSync(`${wwwdir}/images/JAIN/${temp_filename}_print.png`);
            }
            // await IMAGES(IMAGES(`/home/ubuntu/download/${temp_filename}-1.png`).resize(3555, 3013), 100, 65, 3555, 2613).save(`${wwwdir}/images/JAIN/${temp_filename}_print.png`);
            if (fs.existsSync(`/home/ubuntu/download/${temp_filename}-1.png`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}-1.png`);
            }
            if (fs.existsSync(`/home/ubuntu/download/${temp_filename}_digital.png`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}_digital.png`);
            }
        return stringcontents;
        }
        catch(err){
            console.log(err);
            return stringcontents;
        }
    },
    template_replace_148 : async function (stringcontents, rollnumber, fullname, competency_name, coursecompletiondate, student){
        try{
            stringcontents = stringcontents.replace("ENROLL_NO", rollnumber);
            stringcontents = stringcontents.replace("STD_NAME", convert_titlecase(student["firstname"]));
            if (student["competencyname"].includes("(Hons.)") || student["competencyname"].includes(" in ")) {
                let competencyname = student["competencyname"].replace("(Hons.)", "COMPETENCY_HONS_");
                competencyname = competencyname.replace(" in ", "COMPETENCY_IN_");
                stringcontents = stringcontents.replace("COMPETENCY_NAME", competencyname.toUpperCase());
                stringcontents = stringcontents.replace("COMPETENCY_HONS_", "(Hons.)");
                stringcontents = stringcontents.replace("COMPETENCY_IN_", " in ");
            } else {
                stringcontents = stringcontents.replace("COMPETENCY_NAME", student["competencyname"].toUpperCase());
            }
            if (coursecompletiondate) {
                stringcontents = stringcontents.replace("COMPLETION_DATE", this.formatDateString(coursecompletiondate, "Month DD, YYYY"));
            } else if (student["subother1"]) {
                stringcontents = stringcontents.replace("COMPLETION_DATE", student["subother1"]);
            } else {
                stringcontents = stringcontents.replace("COMPLETION_DATE", "September 30, 2024");
            }
            if (student["subother10"] && student["subother10"] != "null") {
                stringcontents = stringcontents.replace("SPECIALIZATION", `(${student["subother10"].toUpperCase()})`);
            } else {
                stringcontents = stringcontents.replace("SPECIALIZATION", "");
            }
            stringcontents = stringcontents.replace("IMG_REPLACE_1", `${myip}/images/IILM/iilm_gn_reg.png`);
            stringcontents = stringcontents.replace("IMG_REPLACE_2", `${myip}/images/IILM/iilm_gn_vice.png`);
            stringcontents = stringcontents.replace("IMG_REPLACE_3", `${myip}/images/IILM/controller_exam.png`);
            return stringcontents;
        }
        catch(err){
            console.log(err);
            return stringcontents;
        }
    },
    template_replace_205 : async function (stringcontents, rollnumber, fullname, competency_name, coursecompletiondate, student){
        try{
            stringcontents = stringcontents.replace("ENROLL_NO", rollnumber);
            stringcontents = stringcontents.replace("STD_NAME", convert_titlecase(student["firstname"]));
            if (student["competencyname"].includes("(Hons.)") || student["competencyname"].includes(" in ")) {
                let competencyname = student["competencyname"].replace("(Hons.)", "COMPETENCY_HONS_");
                competencyname = competencyname.replace(" in ", "COMPETENCY_IN_");
                stringcontents = stringcontents.replace("COMPETENCY_NAME", competencyname.toUpperCase());
                stringcontents = stringcontents.replace("COMPETENCY_HONS_", "(Hons.)");
                stringcontents = stringcontents.replace("COMPETENCY_IN_", " in ");
            } else {
                stringcontents = stringcontents.replace("COMPETENCY_NAME", student["competencyname"].toUpperCase());
            }
            if (coursecompletiondate) {
                stringcontents = stringcontents.replace("COMPLETION_DATE", this.formatDateString(coursecompletiondate, "Month DD, YYYY"));
            } else if (student["subother1"]) {
                stringcontents = stringcontents.replace("COMPLETION_DATE", student["subother1"]);
            } else {
                stringcontents = stringcontents.replace("COMPLETION_DATE", "September 30, 2024");
            }
            if (student["subother10"] && student["subother10"] != "null") {
                stringcontents = stringcontents.replace("SPECIALIZATION", `(${student["subother10"].toUpperCase()})`);
            } else {
                stringcontents = stringcontents.replace("SPECIALIZATION", "");
            }
            stringcontents = stringcontents.replace("IMG_REPLACE_1", `${myip}/images/IILM/iilm_gn_reg_new.png`);
            stringcontents = stringcontents.replace("IMG_REPLACE_2", `${myip}/images/IILM/iilm_gn_vice.png`);
            stringcontents = stringcontents.replace("IMG_REPLACE_3", `${myip}/images/IILM/controller_exam.png`);
            return stringcontents;
        }
        catch(err){
            console.log(err);
            return stringcontents;
        }
    },
    template_replace_150 : async function (stringcontents, cohortid, rollnumber, serialnumber, temp_filename){
        try{             
            const poppler = new Poppler('/usr/bin');
            const options = {
                pngFile: true,
            transparentPageColor: true,
            };
            const outputFile = `/home/ubuntu/download/${temp_filename}`;
            const res = await poppler.pdfToCairo(`/home/ubuntu/download/${temp_filename}_temp.pdf`, outputFile, options);
            // /var/www/html/images/Bhopal/template151front.png
            await IMAGES(`${wwwdir}/images/Bhopal/template150front.png`)
            .draw(
                IMAGES(`/home/ubuntu/download/${temp_filename}-1.png`)
                .resize(3225, 2599),0,0)  
            .save(`/home/ubuntu/download/${temp_filename}.png`); 
            console.log("success");

            // await IMAGES(`${wwwdir}/images/JAIN/template147_1.png`)
            // .resize(2270,1908)
            // .draw(IMAGES(IMAGES(`/home/ubuntu/download/${temp_filename}-1.png`)
            // .resize(2376, 2008), 67, 44, 2276, 1735), 0, 0)
            // .save(`/home/ubuntu/download/${temp_filename}_digital.png`);
            let frontimage = await fs.readFileSync(`/home/ubuntu/download/${temp_filename}.png`, { encoding: 'base64' });
            let backimgdata = `${myip}/images/Bhopal/template150back.png`;
            stringcontents = stringcontents.replace(/FRONT_IMAGE/g, `data:image/png;base64,${frontimage}`); 
            stringcontents = stringcontents.replace(/BACK_IMAGE/g, backimgdata);
            if (fs.existsSync(`/home/ubuntu/download/${temp_filename}_temp.pdf`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}_temp.pdf`);
            }            
            if (fs.existsSync(`/home/ubuntu/download/${temp_filename}-1.png`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}-1.png`);
            }
            if (fs.existsSync(`/home/ubuntu/download/${temp_filename}.png`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}.png`);
            }

            stringcontents = stringcontents.replace(/REGISTRAR_REPLACE/g, `${myip}/images/Bhopal/registrar.png`);
            stringcontents = stringcontents.replace(/DIRECTOR_REPLACE/g, `${myip}/images/Bhopal/director.png`);
            stringcontents = stringcontents.replace(/PREPARED_REPLACE/g, `${myip}/images/Bhopal/prepared.png`);
            stringcontents = stringcontents.replace(/CHECKED_REPLACE/g, `${myip}/images/Bhopal/checked.png`);
            stringcontents = stringcontents.replace(/EXAMINATION_REPLACE/g, `${myip}/images/Bhopal/examination.png`);
            stringcontents = stringcontents.replace(/SERIAL_NUMBER/g, serialnumber);
            return stringcontents;
        }
        catch(err){
            console.log(err);
            return stringcontents;
        }
    },
    template_replace_151 : async function (stringcontents, cohortid, rollnumber, serialnumber, temp_filename){
        try{             
            const poppler = new Poppler('/usr/bin');
            const options = {
                pngFile: true,
            transparentPageColor: true,
            };
            const outputFile = `/home/ubuntu/download/${temp_filename}`;
            const res = await poppler.pdfToCairo(`/home/ubuntu/download/${temp_filename}_temp.pdf`, outputFile, options);
            await IMAGES(`${wwwdir}/images/Bhopal/template151front.png`)
            .draw(
                IMAGES(`/home/ubuntu/download/${temp_filename}-1.png`)
                .resize(2481, 3508),0,0)  
            .save(`/home/ubuntu/download/${temp_filename}.png`); 
            console.log("success");
            let frontimage = await fs.readFileSync(`/home/ubuntu/download/${temp_filename}.png`, { encoding: 'base64' });            
            let backimgdata = `${myip}/images/Bhopal/template151back.png`;
            stringcontents = stringcontents.replace(/FRONT_IMAGE/g, `data:image/png;base64,${frontimage}`); 
            stringcontents = stringcontents.replace(/BACK_IMAGE/g, backimgdata);
            if (await fs.existsSync(`/home/ubuntu/download/${temp_filename}_temp.pdf`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}_temp.pdf`);
            }            
            if (await fs.existsSync(`/home/ubuntu/download/${temp_filename}-1.png`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}-1.png`);
            }
            if (await fs.existsSync(`/home/ubuntu/download/${temp_filename}.png`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}.png`);
            }

            stringcontents = stringcontents.replace(/REGISTRAR_REPLACE/g, `${myip}/images/Bhopal/registrar.png`);
            stringcontents = stringcontents.replace(/VERIFIED_REPLACE/g, `${myip}/images/Bhopal/prepared.png`);
            stringcontents = stringcontents.replace(/CHECKED_REPLACE/g, `${myip}/images/Bhopal/checked.png`);
            stringcontents = stringcontents.replace(/EXAMINATION_REPLACE/g, `${myip}/images/Bhopal/examination.png`);
            stringcontents = stringcontents.replace(/SERIAL_NUMBER/g, serialnumber);
            return stringcontents;
        }
        catch(err){
            console.log(err);
            return stringcontents;
        }
    },
    template_replace_152 : async function (stringcontents, cohortid, main_std_id, rollnumber, serialnumber, fullname, student){
        try{
            console.log("parameters:", cohortid, main_std_id, rollnumber, serialnumber, fullname)
            fullname = fullname.toString().replace("Ms.", "").replace("Mr.", "").trim().toUpperCase();
            stringcontents = stringcontents.replace("COHORT_ID", cohortid);
            stringcontents = stringcontents.replace("STD_ID", main_std_id);
            stringcontents = stringcontents.replace("ENROLL_NO", rollnumber);
            stringcontents = stringcontents.replace("SERIAL_NO", serialnumber);
            stringcontents = stringcontents.replace("STD_NAME", fullname);
            stringcontents = stringcontents.replace("SPECIALIZATION_ONE", student['specializationone']);
            stringcontents = stringcontents.replace("SPECIALIZATION_TWO", student['specializationtow']);
            return stringcontents;
          }
          catch(err){
            console.log(err.message);
            return stringcontents;
          }
    },
    template_replace_153 : async function (stringcontents, fullname, enrollnumber){
        try{
            fullname = fullname.toString().replace("Ms.", "").replace("Mr.", "").trim();
            stringcontents = stringcontents.replace("STD_NAME", fullname);
            stringcontents = stringcontents.replace(/ENROLL_NO/g, enrollnumber);
            return stringcontents;
        }
        catch(err){
        console.log(err.message);
        return stringcontents;
        }
    },
    template_replace_154 : async function (stringcontents, fullname, competency_name, rollnumber, coursecompletiondate, coursename, student){
        try{
            // console.log("template_154 = : ", fullname, competency_name, rollnumber, coursecompletiondate, coursename);
            // console.log("student = : ", student);
            // let month_list = ['','January','February','March','April','May','June','July','August','September','October','November','December'];
            // let convocation = student.convocation_date.split("T")[0];
            // let convdate = `${month_list[parseInt(convocation.split("-")[1])]} ${convocation.split("-")[2].trim()}, ${convocation.split("-")[0].trim()}`;
            // coursename = `${coursename.split("-")[0].trim()}-${coursename.split("-")[1].trim().slice(-2)}`;
            stringcontents = stringcontents.replace("STD_NAME", student.firstname);
            stringcontents = stringcontents.replace("STD_ID", student.studentid);
            stringcontents = stringcontents.replace("COMPETENCY_NAME", student.competencyname);
            stringcontents = stringcontents.replace("BATCH_REPLACE", student.subother1);
            stringcontents = stringcontents.replace("CONVOCATION_DATE", student.convocation_date);
            stringcontents = stringcontents.replace("FRONT_IMAGE", `${myip}/images/IILM/template154background.png`);
            stringcontents = stringcontents.replace("DEAN_SIGNATURE", `${myip}/images/IILM/dean_signature.png`);
            stringcontents = stringcontents.replace("DIRECTOR_SIGNATURE", `${myip}/images/IILM/director_signature.png`);
            return stringcontents;
        }
        catch(err){
        console.log(err.message);
        return stringcontents;
        }
    },
    template_replace_155 : async function (stringcontents, temp_filename, student) {
        try{
            /*
            const poppler = new Poppler('/usr/bin');
            const options = {
                pngFile: true,
            transparentPageColor: true,
            };
            */
            let secondpage = student['secondpage'];
            let secondfilename="";
            if (secondpage == null || secondpage == undefined || secondpage == "") return stringcontents;
            if(secondpage.toUpperCase().indexOf("PG")!==-1)
            {
                if(secondpage.toUpperCase()=="PG2016"||secondpage.toUpperCase()=="PG2017"||secondpage.toUpperCase()=="PG2018"||secondpage.toUpperCase()=="PG2019"||secondpage.toUpperCase()=="PG2020"||secondpage.toUpperCase()=="PG2021")
                {
                    secondfilename = "template155secondpagePG2021.png";
                }
                else
                {
                    secondfilename = "template155secondpagePG2022.png";
                }    
            }
            else
            {
                if(secondpage.toUpperCase()=="UG2016"||secondpage.toUpperCase()=="UG2017"||secondpage.toUpperCase()=="UG2018"||secondpage.toUpperCase()=="UG2019"||secondpage.toUpperCase()=="UG2020")
                {
                    secondfilename = "template155secondpageUG2020.png";
                }
                else
                {
                    secondfilename = "template155secondpageUG2021.png";
                }
            }
            // const outputFile = `/home/ubuntu/download/${temp_filename}_temp`;
            // await poppler.pdfToCairo(`/home/ubuntu/download/${temp_filename}_temp.pdf`, outputFile, options);

            var os = new os_func();
            const outputFile = `/home/ubuntu/download/${temp_filename}_temp-1.png`;
            await os.execCommand(`gs -q -sPAPERSIZE=a4 -sDEVICE=pngalpha -dTextAlphaBits=4 -r400x400 -o ${outputFile} -dNOPAUSE -dBATCH  /home/ubuntu/download/${temp_filename}_temp.pdf`);//ghostscript
            await os.execCommand(`convert ${outputFile} -transparent white ${outputFile}`);//imagemagic    
            
            let printfrontimage = fs.readFileSync(`${outputFile}`, { encoding: 'base64' });
            stringcontents = stringcontents.replace(/FRONT_IMAGE_PRINT/g, `data:image/png;base64,${printfrontimage}`); 
            if(secondpage.toUpperCase().indexOf("PG")!==-1)
            {
                await IMAGES(IMAGES(`${wwwdir}/images/RV/template155gradcarddigitalpg.png`).resize(2480, 3508))
                //.draw(IMAGES(`/home/ubuntu/download/${temp_filename}_temp-1.png`), 0, 0 )
                .draw(IMAGES(`${outputFile}`).resize(2480, 3508), 0, 0)
                .save(`/home/ubuntu/download/${temp_filename}.png`);
            }
            else
            {
                await IMAGES(IMAGES(`${wwwdir}/images/RV/template155gradcarddigital.png`).resize(2480, 3508))
                //.draw(IMAGES(`/home/ubuntu/download/${temp_filename}_temp-1.png`), 0, 0 )
                .draw(IMAGES(`${outputFile}`).resize(2480, 3508), 0, 0)
                .save(`/home/ubuntu/download/${temp_filename}.png`);
            }
            let frontimage = fs.readFileSync(`/home/ubuntu/download/${temp_filename}.png`, { encoding: 'base64' });
            let backimgdata = `${myip}/images/RV/${secondfilename}`;
            console.log("backimgdata=", backimgdata);
            stringcontents = stringcontents.replace(/FRONT_IMAGE/g, `data:image/png;base64,${frontimage}`); 
            stringcontents = stringcontents.replace(/BACK_IMAGE/g, backimgdata);

            if (fs.existsSync(`/home/ubuntu/download/${temp_filename}_temp.pdf`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}_temp.pdf`);
            }                
            if (fs.existsSync(`/home/ubuntu/download/${temp_filename}_temp-1.png`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}_temp-1.png`);
            }
            if (fs.existsSync(`/home/ubuntu/download/${temp_filename}.png`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}.png`);
            }
            return stringcontents;
        }
        catch(err){
          console.log(err.message);
          return stringcontents;
        }  
    },
    template_replace_156 : async function (stringcontents, temp_filename, student) {
        try{
            
            let secondpage = student['secondpage'];            
            let secondfilename="";
            if (secondpage == null || secondpage == undefined || secondpage == "") return stringcontents;
            console.log("secondpage", secondpage);
            if(secondpage.toUpperCase().indexOf("PG")!==-1)
            {
                if(secondpage.toUpperCase()=="PG2016"||secondpage.toUpperCase()=="PG2017"||secondpage.toUpperCase()=="PG2018"||secondpage.toUpperCase()=="PG2019"||secondpage.toUpperCase()=="PG2020"||secondpage.toUpperCase()=="PG2021")
                {
                    secondfilename = "template156secondpagePG2021.png";
                }
                else
                {
                    secondfilename = "template156secondpagePG2022.png";
                }    
            }
            else
            {
                if(secondpage.toUpperCase()=="UG2007")
                {
                    secondfilename = "template156secondpageUG2007.png";
                }
                else if(secondpage.toUpperCase()=="UG2008"||secondpage.toUpperCase()=="UG2009"||secondpage.toUpperCase()=="UG2010"||secondpage.toUpperCase()=="UG2011"||secondpage.toUpperCase()=="UG2012"||secondpage.toUpperCase()=="UG2013"||secondpage.toUpperCase()=="UG2014"||secondpage.toUpperCase()=="UG2015")
                {
                    secondfilename = "template156secondpageUG2008.png";
                }
                else if(secondpage.toUpperCase()=="UG2016"||secondpage.toUpperCase()=="UG2017"||secondpage.toUpperCase()=="UG2018"||secondpage.toUpperCase()=="UG2019"||secondpage.toUpperCase()=="UG2020")
                {
                    secondfilename = "template156secondpageUG2020.png";
                }
                else
                {
                    secondfilename = "template156secondpageUG2021.png";
                }
            }
            
            var os = new os_func();
            const outputFile = `/home/ubuntu/download/${temp_filename}_temp-1.png`;           
            await os.execCommand(`gs -q -sPAPERSIZE=a4 -sDEVICE=pngalpha -dTextAlphaBits=4 -r400x400 -o ${outputFile} -dNOPAUSE -dBATCH  /home/ubuntu/download/${temp_filename}_temp.pdf`);//ghostscript
            await os.execCommand(`convert ${outputFile} -transparent white ${outputFile}`);//imagemagic
            
            let printfrontimage = fs.readFileSync(`${outputFile}`, { encoding: 'base64' });
            stringcontents = stringcontents.replace(/FRONT_IMAGE_PRINT/g, `data:image/png;base64,${printfrontimage}`); 
            
            await IMAGES(IMAGES(`${wwwdir}/images/RV/template156transcriptfront.png`).resize(2480, 3508))
            .draw(IMAGES(`${outputFile}`).resize(2480, 3508), 0, 0)
            .save(`/home/ubuntu/download/${temp_filename}.png`);

            let frontimage = fs.readFileSync(`/home/ubuntu/download/${temp_filename}.png`, { encoding: 'base64' });            
            let backimgdata = `${myip}/images/RV/${secondfilename}`;
            console.log("backimgdata=", backimgdata);
            stringcontents = stringcontents.replace(/FRONT_IMAGE/g, `data:image/png;base64,${frontimage}`); 
            stringcontents = stringcontents.replace(/BACK_IMAGE/g, backimgdata);
           
            //*
            if (fs.existsSync(`/home/ubuntu/download/${temp_filename}_temp.pdf`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}_temp.pdf`);
            }                
            if (fs.existsSync(`/home/ubuntu/download/${temp_filename}_temp-1.png`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}_temp-1.png`);
            }
            if (fs.existsSync(`/home/ubuntu/download/${temp_filename}.png`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}.png`);
            } 
            //*/     
            return stringcontents;
        }
        catch(err){
          console.log(err.message);
          return stringcontents;
        }  
    },
    template_replace_188 : async function (stringcontents, temp_filename, student) {
        try{
            
            let secondpage = student['secondpage'];            
            let secondfilename="";
            if (secondpage == null || secondpage == undefined || secondpage == "") return stringcontents;
            console.log("secondpage", secondpage);
            if(secondpage.toUpperCase().indexOf("PG")!==-1)
            {
                if(secondpage.toUpperCase()=="PG2016"||secondpage.toUpperCase()=="PG2017"||secondpage.toUpperCase()=="PG2018"||secondpage.toUpperCase()=="PG2019"||secondpage.toUpperCase()=="PG2020"||secondpage.toUpperCase()=="PG2021")
                {
                    secondfilename = "template156secondpagePG2021.png";
                }
                else
                {
                    secondfilename = "template156secondpagePG2022.png";
                }    
            }
            else
            {
                if(secondpage.toUpperCase()=="UG2007")
                {
                    secondfilename = "template156secondpageUG2007.png";
                }
                else if(secondpage.toUpperCase()=="UG2008"||secondpage.toUpperCase()=="UG2009"||secondpage.toUpperCase()=="UG2010"||secondpage.toUpperCase()=="UG2011"||secondpage.toUpperCase()=="UG2012"||secondpage.toUpperCase()=="UG2013"||secondpage.toUpperCase()=="UG2014"||secondpage.toUpperCase()=="UG2015")
                {
                    secondfilename = "template156secondpageUG2008.png";
                }
                else if(secondpage.toUpperCase()=="UG2016"||secondpage.toUpperCase()=="UG2017"||secondpage.toUpperCase()=="UG2018"||secondpage.toUpperCase()=="UG2019"||secondpage.toUpperCase()=="UG2020")
                {
                    secondfilename = "template156secondpageUG2020.png";
                }
                else
                {
                    secondfilename = "template156secondpageUG2021.png";
                }
            }
            
            var os = new os_func();
            const outputFile = `/home/ubuntu/download/${temp_filename}_temp-1.png`;           
            await os.execCommand(`gs -q -sPAPERSIZE=a4 -sDEVICE=pngalpha -dTextAlphaBits=4 -r400x400 -o ${outputFile} -dNOPAUSE -dBATCH  /home/ubuntu/download/${temp_filename}_temp.pdf`);//ghostscript
            await os.execCommand(`convert ${outputFile} -transparent white ${outputFile}`);//imagemagic
            
            let printfrontimage = fs.readFileSync(`${outputFile}`, { encoding: 'base64' });
            stringcontents = stringcontents.replace(/FRONT_IMAGE_PRINT/g, `data:image/png;base64,${printfrontimage}`); 
            
            await IMAGES(IMAGES(`${wwwdir}/images/RV/template156transcriptfront.png`).resize(2480, 3508))
            .draw(IMAGES(`${outputFile}`).resize(2480, 3508), 0, 0)
            .save(`/home/ubuntu/download/${temp_filename}.png`);

            let frontimage = fs.readFileSync(`/home/ubuntu/download/${temp_filename}.png`, { encoding: 'base64' });            
            let backimgdata = `${myip}/images/RV/${secondfilename}`;
            console.log("backimgdata=", backimgdata);
            stringcontents = stringcontents.replace(/FRONT_IMAGE/g, `data:image/png;base64,${frontimage}`); 
            stringcontents = stringcontents.replace(/BACK_IMAGE/g, backimgdata);
           
            //*
            if (fs.existsSync(`/home/ubuntu/download/${temp_filename}_temp.pdf`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}_temp.pdf`);
            }                
            if (fs.existsSync(`/home/ubuntu/download/${temp_filename}_temp-1.png`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}_temp-1.png`);
            }
            if (fs.existsSync(`/home/ubuntu/download/${temp_filename}.png`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}.png`);
            } 
            //*/     
            return stringcontents;
        }
        catch(err){
          console.log(err.message);
          return stringcontents;
        }  
    },
    template_replace_202 : async function (stringcontents, temp_filename, student) {
        try{
            /*
            const poppler = new Poppler('/usr/bin');
            const options = {
                pngFile: true,
            transparentPageColor: true,
            };
            */
            let secondpage = student['secondpage'];
            let secondfilename="";
            if (secondpage == null || secondpage == undefined || secondpage == "") return stringcontents;
            if(secondpage.toUpperCase().indexOf("PG")!==-1)
            {
                if(secondpage.toUpperCase()=="PG2016"||secondpage.toUpperCase()=="PG2017"||secondpage.toUpperCase()=="PG2018"||secondpage.toUpperCase()=="PG2019"||secondpage.toUpperCase()=="PG2020"||secondpage.toUpperCase()=="PG2021")
                {
                    secondfilename = "template155secondpagePG2021.png";
                }
                else
                {
                    secondfilename = "template155secondpagePG2022.png";
                }    
            }
            else
            {
                if(secondpage.toUpperCase()=="UG2016"||secondpage.toUpperCase()=="UG2017"||secondpage.toUpperCase()=="UG2018"||secondpage.toUpperCase()=="UG2019"||secondpage.toUpperCase()=="UG2020")
                {
                    secondfilename = "template155secondpageUG2020.png";
                }
                else
                {
                    secondfilename = "template155secondpageUG2021.png";
                }
            }
            // const outputFile = `/home/ubuntu/download/${temp_filename}_temp`;
            // await poppler.pdfToCairo(`/home/ubuntu/download/${temp_filename}_temp.pdf`, outputFile, options);

            var os = new os_func();
            const outputFile = `/home/ubuntu/download/${temp_filename}_temp-1.png`;
            await os.execCommand(`gs -q -sPAPERSIZE=a4 -sDEVICE=pngalpha -dTextAlphaBits=4 -r400x400 -o ${outputFile} -dNOPAUSE -dBATCH  /home/ubuntu/download/${temp_filename}_temp.pdf`);//ghostscript
            await os.execCommand(`convert ${outputFile} -transparent white ${outputFile}`);//imagemagic    
            
            let printfrontimage = fs.readFileSync(`${outputFile}`, { encoding: 'base64' });
            stringcontents = stringcontents.replace(/FRONT_IMAGE_PRINT/g, `data:image/png;base64,${printfrontimage}`); 
            if(secondpage.toUpperCase().indexOf("PG")!==-1)
            {
                await IMAGES(IMAGES(`${wwwdir}/images/RV/template155gradcarddigitalpg.png`).resize(2480, 3508))
                //.draw(IMAGES(`/home/ubuntu/download/${temp_filename}_temp-1.png`), 0, 0 )
                .draw(IMAGES(`${outputFile}`).resize(2480, 3508), 0, 0)
                .save(`/home/ubuntu/download/${temp_filename}.png`);
            }
            else
            {
                await IMAGES(IMAGES(`${wwwdir}/images/RV/template155gradcarddigital.png`).resize(2480, 3508))
                //.draw(IMAGES(`/home/ubuntu/download/${temp_filename}_temp-1.png`), 0, 0 )
                .draw(IMAGES(`${outputFile}`).resize(2480, 3508), 0, 0)
                .save(`/home/ubuntu/download/${temp_filename}.png`);
            }
            let frontimage = fs.readFileSync(`/home/ubuntu/download/${temp_filename}.png`, { encoding: 'base64' });
            let backimgdata = `${myip}/images/RV/${secondfilename}`;
            console.log("backimgdata=", backimgdata);
            stringcontents = stringcontents.replace(/FRONT_IMAGE/g, `data:image/png;base64,${frontimage}`); 
            stringcontents = stringcontents.replace(/BACK_IMAGE/g, backimgdata);

            if (fs.existsSync(`/home/ubuntu/download/${temp_filename}_temp.pdf`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}_temp.pdf`);
            }                
            if (fs.existsSync(`/home/ubuntu/download/${temp_filename}_temp-1.png`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}_temp-1.png`);
            }
            if (fs.existsSync(`/home/ubuntu/download/${temp_filename}.png`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}.png`);
            }
            return stringcontents;
        }
        catch(err){
          console.log(err.message);
          return stringcontents;
        }  
    },
    template_replace_203 : async function (stringcontents, temp_filename, student) {
        try{
            
            let secondpage = student['secondpage'];            
            let secondfilename="";
            if (secondpage == null || secondpage == undefined || secondpage == "") return stringcontents;
            console.log("secondpage", secondpage);
            if(secondpage.toUpperCase().indexOf("PG")!==-1)
            {
                if(secondpage.toUpperCase()=="PG2016"||secondpage.toUpperCase()=="PG2017"||secondpage.toUpperCase()=="PG2018"||secondpage.toUpperCase()=="PG2019"||secondpage.toUpperCase()=="PG2020"||secondpage.toUpperCase()=="PG2021")
                {
                    secondfilename = "template156secondpagePG2021.png";
                }
                else
                {
                    secondfilename = "template156secondpagePG2022.png";
                }    
            }
            else
            {
                if(secondpage.toUpperCase()=="UG2007")
                {
                    secondfilename = "template156secondpageUG2007.png";
                }
                else if(secondpage.toUpperCase()=="UG2008"||secondpage.toUpperCase()=="UG2009"||secondpage.toUpperCase()=="UG2010"||secondpage.toUpperCase()=="UG2011"||secondpage.toUpperCase()=="UG2012"||secondpage.toUpperCase()=="UG2013"||secondpage.toUpperCase()=="UG2014"||secondpage.toUpperCase()=="UG2015")
                {
                    secondfilename = "template156secondpageUG2008.png";
                }
                else if(secondpage.toUpperCase()=="UG2016"||secondpage.toUpperCase()=="UG2017"||secondpage.toUpperCase()=="UG2018"||secondpage.toUpperCase()=="UG2019"||secondpage.toUpperCase()=="UG2020")
                {
                    secondfilename = "template156secondpageUG2020.png";
                }
                else
                {
                    secondfilename = "template156secondpageUG2021.png";
                }
            }
            
            var os = new os_func();
            const outputFile = `/home/ubuntu/download/${temp_filename}_temp-1.png`;           
            await os.execCommand(`gs -q -sPAPERSIZE=a4 -sDEVICE=pngalpha -dTextAlphaBits=4 -r400x400 -o ${outputFile} -dNOPAUSE -dBATCH  /home/ubuntu/download/${temp_filename}_temp.pdf`);//ghostscript
            await os.execCommand(`convert ${outputFile} -transparent white ${outputFile}`);//imagemagic
            
            let printfrontimage = fs.readFileSync(`${outputFile}`, { encoding: 'base64' });
            stringcontents = stringcontents.replace(/FRONT_IMAGE_PRINT/g, `data:image/png;base64,${printfrontimage}`); 
            
            await IMAGES(IMAGES(`${wwwdir}/images/RV/template156transcriptfront.png`).resize(2480, 3508))
            .draw(IMAGES(`${outputFile}`).resize(2480, 3508), 0, 0)
            .save(`/home/ubuntu/download/${temp_filename}.png`);

            let frontimage = fs.readFileSync(`/home/ubuntu/download/${temp_filename}.png`, { encoding: 'base64' });            
            let backimgdata = `${myip}/images/RV/${secondfilename}`;
            console.log("backimgdata=", backimgdata);
            stringcontents = stringcontents.replace(/FRONT_IMAGE/g, `data:image/png;base64,${frontimage}`); 
            stringcontents = stringcontents.replace(/BACK_IMAGE/g, backimgdata);
           
            //*
            if (fs.existsSync(`/home/ubuntu/download/${temp_filename}_temp.pdf`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}_temp.pdf`);
            }                
            if (fs.existsSync(`/home/ubuntu/download/${temp_filename}_temp-1.png`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}_temp-1.png`);
            }
            if (fs.existsSync(`/home/ubuntu/download/${temp_filename}.png`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}.png`);
            } 
            //*/     
            return stringcontents;
        }
        catch(err){
          console.log(err.message);
          return stringcontents;
        }  
    },
    template_replace_204 : async function (stringcontents, temp_filename, student) {
        try{
            
            let secondpage = student['secondpage'];            
            let secondfilename="";
            if (secondpage == null || secondpage == undefined || secondpage == "") return stringcontents;
            console.log("secondpage", secondpage);
            if(secondpage.toUpperCase().indexOf("PG")!==-1)
            {
                if(secondpage.toUpperCase()=="PG2016"||secondpage.toUpperCase()=="PG2017"||secondpage.toUpperCase()=="PG2018"||secondpage.toUpperCase()=="PG2019"||secondpage.toUpperCase()=="PG2020"||secondpage.toUpperCase()=="PG2021")
                {
                    secondfilename = "template156secondpagePG2021.png";
                }
                else
                {
                    secondfilename = "template156secondpagePG2022.png";
                }    
            }
            else
            {
                if(secondpage.toUpperCase()=="UG2007")
                {
                    secondfilename = "template156secondpageUG2007.png";
                }
                else if(secondpage.toUpperCase()=="UG2008"||secondpage.toUpperCase()=="UG2009"||secondpage.toUpperCase()=="UG2010"||secondpage.toUpperCase()=="UG2011"||secondpage.toUpperCase()=="UG2012"||secondpage.toUpperCase()=="UG2013"||secondpage.toUpperCase()=="UG2014"||secondpage.toUpperCase()=="UG2015")
                {
                    secondfilename = "template156secondpageUG2008.png";
                }
                else if(secondpage.toUpperCase()=="UG2016"||secondpage.toUpperCase()=="UG2017"||secondpage.toUpperCase()=="UG2018"||secondpage.toUpperCase()=="UG2019"||secondpage.toUpperCase()=="UG2020")
                {
                    secondfilename = "template156secondpageUG2020.png";
                }
                else
                {
                    secondfilename = "template156secondpageUG2021.png";
                }
            }
            
            var os = new os_func();
            const outputFile = `/home/ubuntu/download/${temp_filename}_temp-1.png`;           
            await os.execCommand(`gs -q -sPAPERSIZE=a4 -sDEVICE=pngalpha -dTextAlphaBits=4 -r400x400 -o ${outputFile} -dNOPAUSE -dBATCH  /home/ubuntu/download/${temp_filename}_temp.pdf`);//ghostscript
            await os.execCommand(`convert ${outputFile} -transparent white ${outputFile}`);//imagemagic
            
            let printfrontimage = fs.readFileSync(`${outputFile}`, { encoding: 'base64' });
            stringcontents = stringcontents.replace(/FRONT_IMAGE_PRINT/g, `data:image/png;base64,${printfrontimage}`); 
            
            await IMAGES(IMAGES(`${wwwdir}/images/RV/template156transcriptfront.png`).resize(2480, 3508))
            .draw(IMAGES(`${outputFile}`).resize(2480, 3508), 0, 0)
            .save(`/home/ubuntu/download/${temp_filename}.png`);

            let frontimage = fs.readFileSync(`/home/ubuntu/download/${temp_filename}.png`, { encoding: 'base64' });            
            let backimgdata = `${myip}/images/RV/${secondfilename}`;
            console.log("backimgdata=", backimgdata);
            stringcontents = stringcontents.replace(/FRONT_IMAGE/g, `data:image/png;base64,${frontimage}`); 
            stringcontents = stringcontents.replace(/BACK_IMAGE/g, backimgdata);
           
            //*
            if (fs.existsSync(`/home/ubuntu/download/${temp_filename}_temp.pdf`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}_temp.pdf`);
            }                
            if (fs.existsSync(`/home/ubuntu/download/${temp_filename}_temp-1.png`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}_temp-1.png`);
            }
            if (fs.existsSync(`/home/ubuntu/download/${temp_filename}.png`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}.png`);
            } 
            //*/     
            return stringcontents;
        }
        catch(err){
          console.log(err.message);
          return stringcontents;
        }  
    },
    template_replace_157 : async function (stringcontents, temp_filename) {
        try{
            const poppler = new Poppler('/usr/bin');
            const options = {
                pngFile: true,
            transparentPageColor: true,
            };
            const outputFile = `/home/ubuntu/download/${temp_filename}_temp`;
            await poppler.pdfToCairo(`/home/ubuntu/download/${temp_filename}_temp.pdf`, outputFile, options);
            await IMAGES(`${wwwdir}/images/CUTM/template157background.png`)
            .draw(IMAGES(`/home/ubuntu/download/${temp_filename}_temp-1.png`).resize(3508, 2480), 0, 0)
            .save(`/home/ubuntu/download/${temp_filename}.png`);

            let frontimage = fs.readFileSync(`/home/ubuntu/download/${temp_filename}.png`, { encoding: 'base64' });
            stringcontents = stringcontents.replace(/FRONT_IMAGE/g, `data:image/png;base64,${frontimage}`); 

            if (fs.existsSync(`/home/ubuntu/download/${temp_filename}_temp.pdf`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}_temp.pdf`);
            }                
            if (fs.existsSync(`/home/ubuntu/download/${temp_filename}_temp-1.png`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}_temp-1.png`);
            }
            if (fs.existsSync(`/home/ubuntu/download/${temp_filename}.png`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}.png`);
            }      
            return stringcontents;
        }
        catch(err){
          console.log(err.message);
          return stringcontents;
        }  
    },
    template_replace_158 : async function (stringcontents, cohortid, main_std_id, s_baseurl){
        try{
            console.log("parameters:", cohortid, main_std_id);                       
            var fronturl=`https://certificates-galgotia.s3.ap-south-1.amazonaws.com/backgroundimage/${cohortid}/${main_std_id}_1.png`;
            var backurl=`https://certificates-galgotia.s3.ap-south-1.amazonaws.com/backgroundimage/${cohortid}/${main_std_id}_2.png`;
            
            stringcontents = stringcontents.replace("FRONT_IMAGE", fronturl.replace(/"/g,'\\"')); 
            stringcontents = stringcontents.replace("BACK_IMAGE", backurl.replace(/"/g,'\\"')); 

            stringcontents = stringcontents.replace(/PREPARED_REPLACE/g, `${myip}/images/Galgotias/prepared.png`);
            stringcontents = stringcontents.replace(/CHECKED_REPLACE/g, `${myip}/images/Galgotias/checked.png`);
            stringcontents = stringcontents.replace(/EXAM_REPLACE/g, `${myip}/images/Galgotias/examination.png`);
            
            //stringcontents = stringcontents.replace(/COE_REPLACE/g, `${myip}/images/Galgotias/coesignature.png`);
            stringcontents = stringcontents.replace(/COE_REPLACE/g, `${myip}/images/backend/empty.png`);
            
            stringcontents = stringcontents.replace(/REGISTRAR_REPLACE/g, `${myip}/images/Galgotias/registrar.png`);
            stringcontents = stringcontents.replace(/VICECHANCELLOER_REPLACE/g, `${myip}/images/Galgotias/vicechancellor.png`);

            return stringcontents;
          }
          catch(err){
            console.log(err.message);
            return stringcontents;
          }
    },
    template_replace_160 : async function (stringcontents, certificationcategory, fullname, program_name, specialization_name, minor, convocation_date, rollnumber, member_photo_url, student){
        try{        
            
            let main_content = "";
            
            if (certificationcategory.toLowerCase() == "phd" || certificationcategory.toLowerCase() == "diploma"){
                let line_height = '0pt';
                let line_height1 = '5pt';
                let name_fontsize = '18pt';
                if (rollnumber == '2110110868') name_fontsize = '16pt';
                
                if (specialization_name != "") {
                    specialization_name = ` <tr style="line-height: ${line_height1};">
                        <td style="text-align: center;">
                            <p style="font-size: 13pt; padding-top: 0px;font-family:timesnewroman;margin: 10px;">IN <span style="font-weight:bold;font-size: 18pt; ">${specialization_name}</span></p>
                        </td>                
                    </tr>`;
                }
                if (minor != "") {
                    minor = ` <tr style="line-height: ${line_height1};">
                        <td style="text-align: center;">
                            <p style="font-size: 13pt; padding-top: 0px;font-family:timesnewroman;margin: 10px;">WITH MINOR IN ${minor}</p>
                        </td>                
                    </tr>`;
                }
                let water_mark="";
                water_mark =`
                    <p class="dynamic-text" style="font-size: 8px;padding-top: 0px; font-family:timesnewroman;position:absolute;top:614px;opacity:0.2;letter-spacing: 2px;white-space: nowrap;left: 50%;transform:translateX(-50%);" id="water_mark">${fullname}, ${program_name} ${fullname}, ${program_name} ${fullname}, ${program_name}</p>
                `;
                let snu_logo=`
                  <img style="position:absolute;top:70px;left:413px;width:300px;" src="${myip}/images/snu/snulogo.png" />  
                `;
                main_content = `
                <center>            
                <table style="margin-top: 180px;width: 281mm;"><tbody>
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center;">
                            <p style="font-size: 13pt; padding-top: 0px;  font-family:timesnewroman;margin: 10px;">THE BOARD OF MANAGEMENT</p>
                        </td>                
                    </tr>            
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center;">
                            <p style="font-size: 13pt; padding-top: 0px;  font-family:timesnewroman;margin: 10px;">UPON THE RECOMMENDATION OF THE ACADEMIC COUNCIL</p>
                        </td>                
                    </tr>            
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center;">
                            <p style="font-size: 13pt; padding-top: 0px;  font-family:timesnewroman;margin: 10px;">HEREBY CONFERS ON</p>
                        </td>                
                    </tr>            
                    <tr style="line-height: ${line_height};">
                        <td style="text-align: center;">
                            <p style="font-size: ${name_fontsize}; padding-top: 0px; font-family:timesnewroman;font-weight:bold;">${fullname}</p>
                        </td>                
                    </tr>
                    <tr style="line-height: ${line_height1};">
                        <td style="text-align: center;">
                            <p style="font-size: 13pt; padding-top: 0px; font-family:timesnewroman;margin: 15px;">THE DEGREE OF</p>
                        </td>                
                    </tr>
                    <tr">
                        <td style="text-align: center;">
                            <p style="font-size: 18pt; padding-top: 0px;  font-family:timesnewroman;font-weight:bold;margin: 0px;">${program_name}</p>
                        </td>                
                    </tr>
                    ${specialization_name}
                    ${minor}
                    <tr style="line-height: ${line_height1};">
                        <td style="text-align: center;">
                            <p style="font-size: 13pt; padding-top: 0px;  font-family:timesnewroman;margin: 10px;">ON HAVING SUCCESSFULLY COMPLETED THE PRESCRIBED REQUIREMENTS</p>
                        </td>                
                    </tr>            
                    <tr style="line-height: ${line_height1};">
                        <td style="text-align: center;">
                            <p style="font-size: 13pt; padding-top: 0px;  font-family:timesnewroman;margin: 10px;">GIVEN AT GAUTAM BUDDHA NAGAR</p>
                        </td>                
                    </tr>            
                    <tr style="line-height: ${line_height1};">
                        <td style="text-align: center;">
                            <p style="font-size: 13pt; padding-top: 0px; font-family:timesnewroman;margin: 10px;">ON THIS ${convocation_date}</p>
                        </td>                
                    </tr>            
                </tbody></table>
               
                <img style="height:90px;position:absolute;top:560px;left:516px;" src="${myip}/images/snu/stamp.png" />            
                </center>     
                
                `;

                if(student['subother4'].toLowerCase()=="online")
                {
                    stringcontents = stringcontents.replace(/display: none;/g, "");
                    stringcontents = stringcontents.replace(/892px/g, "840px");
                    stringcontents = stringcontents.replace(/-0.01px/g, "-85px");
                    
                    stringcontents = stringcontents.replace("MODE_OF_DELIVERY", `${student['subother4']}`);
                    stringcontents = stringcontents.replace("DATE_OF_ADMISSION", `${student['subother5']}`);
                    stringcontents = stringcontents.replace("DATEOFCOMPLETION", `${student['subother7']}`);
                    stringcontents = stringcontents.replace("NAMEANDADDRESSOFALLEXAMINATIONCENTRES", `${student['subother6']}`);
                    stringcontents = stringcontents.replace("GOVERNMENT_NUMBER", `${student['subother3']}`);
                }
                stringcontents = stringcontents.replace(/500px/g, "542px");            
                
                stringcontents = stringcontents.replace("WATER_MARK", water_mark.replace(/"/g,'\\"'));
                //stringcontents = stringcontents.replace("MEMBER_PHOTO", `${myip}/images/snu/samplephoto.jpg`);
                console.log("student['photourl']=",student['photourl']);
                if(student['photourl']=="") member_photo_url = "https://www.certonce.com/images/memberphoto.png";
                else member_photo_url = student['photourl'];
                //stringcontents = stringcontents.replace("MEMBER_PHOTO", `${student['photourl']}`);
                stringcontents = stringcontents.replace("MEMBER_PHOTO", member_photo_url);
                stringcontents = stringcontents.replace("ROLL_NUMBER", rollnumber);
                stringcontents = stringcontents.replace("MAIN_CONTENT", main_content.replace(/"/g,'\\"'));
                stringcontents = stringcontents.replace(/STAMP/g, `${myip}/images/snu/stamp.png`);
                stringcontents = stringcontents.replace("REGISTRAR_REPLACE", `${myip}/images/snu/registrar.png`);
                stringcontents = stringcontents.replace("VICE_CHANCELLOR", `${myip}/images/snu/vicechancellor.png`);
                stringcontents = stringcontents.replace("CHANCELLOR", `${myip}/images/snu/chancellor.png`);
                stringcontents = stringcontents.replace("SNU_LOGO", snu_logo.replace(/"/g,'\\"'));
                stringcontents = stringcontents.replace("BACKGROUND_IMAGE", `${myip}/images/snu/watermark.png`);
                
                return stringcontents;
            }
            else return stringcontents;
        }
        catch(err){
            console.log(err);
            return stringcontents;
        }
    },
    template_replace_161: async function (stringcontents, puserid, main_std_id, student){
        try{
            
            var api_base_url = "https://iilm.my.salesforce.com";
            var oauth_base_url = "https://login.salesforce.com";
            var oauth_account = {
            'username': process.env.SALESFORCE_USER,
            'password': process.env.SALESFORCE_PASSWORD,
            'grant_type': 'password',
            'client_id': process.env.SALESFORCE_CLIENT_ID,
            'client_secret': process.env.SALESFORCE_CLIENT_SECRET
            };

            var oauth_login_url = `${oauth_base_url}/services/oauth2/token`;     
            var oauth_result = await axios.post(oauth_login_url, qs.stringify(oauth_account));
            
            if (oauth_result.status == "200")
            {      
                const bearer_config = {
                headers: { Authorization: `Bearer ${oauth_result['data']['access_token']}` }
                };   


                var student_result = await axios.get(`${api_base_url}/services/apexrest/student_result/${student['subother1']}?pdf_type=${student['subother2']}&term_name=${student['subother3']}&offset=${student['subother4']}&limit=10`, bearer_config);
                if (student_result.status == "200")
                {
                    var student_list = student_result['data']['transcriptList'];
                    for (let index = 0; index < student_list.length; index++){
                        if(student_list[index]['studentURN']==main_std_id)
                        {
                            const outputpdf = `/home/ubuntu/download/${student['subother1']}_${main_std_id}.pdf`;
                            const buffer = Buffer.from(student_list[index]['transcriptPDFBase64'], 'base64');
                            fs.writeFileSync(`${outputpdf}`, buffer);
                            const encodedurl = await convertPdf2Png(outputpdf, 400);
                            
                            stringcontents = stringcontents.replace("MAIN_CONTENT", encodedurl.replace(/"/g,'\\"')); 

                            
                            if (fs.existsSync(`${outputpdf}`)) {
                                fs.unlinkSync(`${outputpdf}`);
                            }
                        }
                    }
                }
            } 
            //*/     
            return stringcontents;
        }
        catch(err){
          console.log(err.message);
          return stringcontents;
        }
    },
    template_replace_162 : async function (stringcontents, fullname, main_std_id, student){
        try{        
            var main_content = "";
            var studentidline="";
            var gender="";
            var fatherprefix="";
            var characterassessment="";
            if(student['sex']=="M") {
                gender="Mr."; 
                fatherprefix="S/o";
            } else {
                gender="Ms.";
                fatherprefix="D/o";
            }
            if(student['subother8']!=null && student['subother8']!="" && student['subother8']!=undefined)
            {
                if(student['subother8'].toLowerCase().trim()=="excellent") characterassessment = `<b>${student['subother8']}</b> / Very Good / Good / Satisfactory`;
                if(student['subother8'].toLowerCase().trim()=="very good") characterassessment = `Excellent / <b>${student['subother8']}</b> / Good / Satisfactory`;
                if(student['subother8'].toLowerCase().trim()=="good") characterassessment = `Excellent / Very Good / <b>${student['subother8']}</b> / Satisfactory`;
                if(student['subother8'].toLowerCase().trim()=="satisfactory") characterassessment = ` Excellent  /  Very Good  /  Good  /  <b>${student['subother8']}</b>`;
            }
            let major_content = `<p style="font-size: 28pt; padding-top: 0px; font-family:oldnglishletplain;margin: 0px;margin-top: 17px;">${student['competencyname']}</p>
            <p style="font-size: 22pt; padding-top: 0px; font-family:oldnglishletplain;margin: 0px;">(${student['subother2']} - ${student['subother5']})</p>`;
            if (!student['subother5']) {
                major_content = `<p style="font-size: 28pt; padding-top: 0px; font-family:oldnglishletplain;margin: 0px;margin-top: 17px;">${student['competencyname']} (${student['subother2']})</p>`
            }
            studentidline = `<table style="position:absolute;top:41px;left:15mm;">
                <tbody>
                    <tr>
                        <td style="text-align:left; width: 129mm;">
                            <p style="font-size: 10pt; font-family:timesnewroman;font-weight:bold; margin-left: 8.9mm;">${student['subother10']}</p>
                        </td>
                        <td style="text-align:left">
                            <p style="font-size: 10pt; padding-top: 0px; font-family:timesnewroman;">Registration No. </p>
                        </td>
                        <td style="text-align:left">
                            <p style="font-size: 10pt; padding-top: 0px; font-family:timesnewroman;font-weight:bold">${main_std_id}</p>
                        </td>
                    </tr>
                </tbody>
            </table>`;
            main_content = `${studentidline}
            <center>       
            <table style="margin-top: 300px;width: 200mm;">
                <tbody>
                    <tr>
                        <td style="text-align: center;">
                            <p style="font-size: 16pt; padding-top: 0px; font-family:english111vivace;margin: 0px;">We, the Chancellor, the Vice Chancellor and the members of</p>
                            <p style="font-size: 16pt; padding-top: 0px; font-family:english111vivace;margin: 0px;">the Governing Body, the Board of Management and the Academic Council of</p>
                            <p style="font-size: 16pt; padding-top: 0px; font-family:english111vivace;margin: 0px;">Sri Balaji University, Pune (SBUP) certify that</p>
                            <p style="font-size: 15pt; padding-top: 0px; font-family:helvetica;margin: 0px;margin-top: 12px;">${gender} ${fullname}</p>
                            <p style="font-size: 15pt; padding-top: 0px; font-family:helvetica;margin: 0px;">${fatherprefix} ${student['fathername']}</p>        
                            <p style="font-size: 15pt; padding-top: 0px; font-family:helvetica;margin: 0px;margin-bottom: 10px;">Mother’s Name: ${student['mothername']}</p>
                            <p style="font-size: 16pt; padding-top: 0px; font-family:english111vivace;margin: 0px;margin-top: 10px;width: 160mm; margin: auto; text-align: justify; text-align-last: center">A student of our ${student['subother1'].trim()} ${student['competencyname']} (${student['subother2']}) Programme from the ${student['subother3']} (${student['subother11']}) of the batch ${student['subother4']} having been declared to have passed the prescribed examinations and conditions is hereby conferred with
                            </p>
                            ${major_content}
                            <p style="font-size: 16pt; padding-top: 0px; font-family:english111vivace;margin: 0px;margin-top: 10px;font-weight:bold;">Specialisation: ${student['subother6']}</p>
                            <p style="font-size: 16pt; padding-top: 0px; font-family:english111vivace;margin: 0px;font-weight:bold;">Grading: ${student['subother7']}</p>
                            <p style="font-size: 16pt; padding-top: 0px; font-family:english111vivace;margin: 0px;margin-top: 10px;">Character Assessed Based on Studentship: ${characterassessment}</p>
                            <p style="font-size: 16pt; padding-top: 0px; font-family:english111vivace;margin: 0px;">This ${student['subother2']} degree has been conferred on the student on fulfilment of all the requisite</p>
                            <p style="font-size: 16pt; padding-top: 0px; font-family:english111vivace;margin: 0px;">requirements of the University on this</p>
                            <p style="font-size: 17pt; padding-top: 0px; font-family:cataneo;margin: 0px;font-weight:bold;">${student['subother9']}</p>        
                            <p style="font-size: 16pt; padding-top: 0px; font-family:english111vivace;margin: 0px;">In Testimony whereof is the signatures of the authorised Awarding Body.</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <img src="${myip}/images/sbup/vice_chancellor.png" style="width: 36mm; position: absolute; top: 253mm; left: 25mm; display: block;"/>
            <img src="${myip}/images/sbup/chancellor.png" style="width: 33mm; position: absolute; top: 253mm; left: 139mm; display: block;"/>
            <table style="position: absolute; top: 266mm; left: 13mm">
                <tbody>
                    <tr style="line-height: 14pt;">
                    <td style="text-align: center;">
                        <p style="font-size: 16pt; padding-top: 0px; font-family:english111vivace; margin: 0px;">Prof. (Dr.) G.K. Shirude</p>
                    </td>
                    <td style="text-align: center; width: 45mm"></td>
                    <td style="text-align: center;">
                        <p style="font-size: 16pt; padding-top: 0px; font-family:english111vivace; margin: 0px;">Prof. Paramanandhan Balasubramanian</p>
                    </td>
                    </tr>
                    <tr style="line-height: 14pt;">
                    <td style="text-align: center;">
                        <p style="font-size: 16pt; padding-top: 0px; font-family:english111vivace; margin: 0px;>Vice Chancellor</p>
                    </td>
                    <td style="text-align: center; width: 45mm"></td>
                    <td style="text-align: center;">
                        <p style="font-size: 16pt; padding-top: 0px; font-family:english111vivace; margin: 0px;">Chancellor</p>
                    </td>
                    </tr>
                </tbody>
            </table>
            </center>
            <img src="${myip}/images/sbup/sbup_second.png" style="height: 297mm; width: 210mm; position: absolute; top: 297mm;" />`;
            stringcontents = stringcontents.replace("MAIN_CONTENT", main_content.replace(/"/g,'\\"'));
            stringcontents = stringcontents.replace("BACKGROUND_IMAGE", `${myip}/images/sbup/sbup_background.png`);
            return stringcontents;
        }
        catch(err){
            console.log(err);
            return stringcontents;
        }
    },
    template_replace_163 : async function (stringcontents, fullname, serialnumber, rollnumber, student){
        try{        
            let font_name = student["subother16"];
            let font="timesnewroman";
            if(font_name==null || font_name==undefined || font_name=="") font_name=="normal";
            
           
            let hindi_sub2 = `xyxTOP_DOUBLE_DOTfV;kt+ fo'ofo|ky;] mÙkj çns'k dk;Z ifjTOP_DOUBLE_DOTkn~ dh vuq'kalk ij`;
            let hindi_sub3 = `muds 'kks/k dk foTOP_DOUBLE_DOTk; Fkk`;          
            let hindi_sub5 = `dks fMIyksek dh çkfIr gsrq fofue; fofgrs vis{kkvksa dks`;
            let hindi_sub6 = `dks bl mikf/k dh çkfIr gsrq fofue; fofgr vis{kkvksa dks`;

            
            if(font_name=="krutidev010") font="krutidev010condensed";            
            else
            {
                font="timesnewroman";
                hindi_sub2 = `गलगोटियाज़ विश्‍वविद्यालय, उत्तर प्रदेश कार्य परिषद् की अनुशंसा पर`;
                hindi_sub6 = `को इस उपाधि की प्राप्ति हेतु विनिमय विहित अपेक्षाओं को`;
                hindi_sub3 = "उनके शोध का विषय था";
                hindi_sub5 = `को डिप्लोमा की प्राप्ति हेतु विनिमय विहित अपेक्षाओं को`;
            }

            let firstname = fullname.split(" ")[0].toString().toUpperCase();    
            let main_content = "";
            let hindi_main_content = "";
            let specialization_name = "";
            let hindi_specialization_name = "";
            
            let certificationcategory = student['certificationcategory'];
            let convocation_date = student['subother9'];
            if(convocation_date==null) convocation_date="";
            let dvision = student['subother10'];
            if(dvision==null) dvision="";
            if(dvision.indexOf("division")!==-1)
            {
                let arr = dvision.split("division");
                for(let index=0; index<arr.length; index++)
                {
                    arr[index] = `<b style="font-size: 14pt;font-family:timesnewroman;">${arr[index]}</b>`;
                }
                
                dvision = arr.join(" division ");
            }
            let hindi_dvision = student['subother11'];
            if(hindi_dvision==null) hindi_dvision="";
            if(hindi_dvision.indexOf("श्रेणी")!==-1)
            {
                let arr = hindi_dvision.split("श्रेणी");
                for(let index=0; index<arr.length; index++)
                {
                    arr[index] = `<b style="font-size:14pt;">${arr[index]}</b>`;
                }                
                hindi_dvision = arr.join(" श्रेणी ");
            }
            
            if (certificationcategory.toLowerCase() == "diploma")
            {

                let margintop0="20px";
                
                let margintop1="12px";
                let margintop2="2px";

                let competencynameline="";
                if (student['subother3'] != "") {
                    margintop1="6px";
                    margintop2="2px";
                    specialization_name = `
                            <p style="font-size: 15pt;font-family:timesnewroman;margin-bottom: 0px;margin-top: 1px;color:#ee2b2e;font-style:italic;">in</p>
                            <p style="font-size: 15pt;font-family:timesnewroman;margin-bottom: 0px;margin-top: 1px;color:#ee2b2e;font-style:italic;font-weight:bold;">${student['subother3']}</p>
                       `;
                }
                if (student['subother4'] != "") {
                   
                    if(font_name=="krutidev010")
                     {
                         hindi_specialization_name = `                           
                          <p style="color: #ee2b2e; font-size: 20pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};font-weight:bold;">${student['subother4']}</p>
                          `;
                    
                     }
                     else
                     {
                         hindi_specialization_name = `                           
                         <p style="color: #ee2b2e; font-size: 15pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};font-weight:bold;">${student['subother4']}</p>
                         `;    
                     }
             }

                // margintop1="6px";
                // margintop2="2px";
                // specialization_name = `
                //             <p style="font-size: 15pt;font-family:timesnewroman;margin-bottom: 0px;margin-top: ${margintop1};color:#ee2b2e;font-style:italic;">in</p>
                //             <p style="font-size: 15pt;font-family:timesnewroman;margin-bottom: 0px;margin-top: ${margintop1};color:#ee2b2e;font-style:italic;font-weight:bold;">Computer Science and Engineering (Artificial Intelligence & Machine Learning)</p>
                //        `;
                // hindi_specialization_name = `                           
                // <p style="color: #ee2b2e; font-size: 20pt; font-family:krutidev010condensed; margin-bottom: 0px;margin-top: ${margintop1};font-weight:bold;">dEI;wVj lkbal ,.M bathfu;fjax ¼vkfVZfQf'k;y baVsfytsal ,.M ef'ku yfuaZx½</p>
                // `;
                
                let water_mark1 =`
                    <p class="dynamic-text" style="font-size: 6px;padding-top: 0px; font-family:timesnewroman;position:absolute;top:236px;left:690px;opacity:0.2;letter-spacing: 2px;white-space: nowrap;width:49px;" id="water_mark">${rollnumber}</p>
                `;
                let water_mark2 =`
                    <p class="dynamic-text1" style="font-size: 9px;padding-top: 0px; font-family:timesnewroman;position:absolute;left: 50%;transform:translateX(-50%);top:804px;opacity:0.18;letter-spacing: 3px;white-space: nowrap;" id="water_mark1">${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber}</p>
                `;
                let water_mark3 =`
                    <p class="dynamic-text2" style="font-size: 7px;padding-top: 0px; font-family:timesnewroman;position:absolute;left: 50%;transform:translateX(-50%);top:913px;opacity:0.18;letter-spacing: 3px;white-space: nowrap;" id="water_mark2">${convocation_date.toUpperCase()} ${convocation_date.toUpperCase()} ${convocation_date.toUpperCase()} ${convocation_date.toUpperCase()} ${convocation_date.toUpperCase()} ${convocation_date.toUpperCase()} ${convocation_date.toUpperCase()}</p>
                `;
                
                let competencyname=student['competencyname'];
                if(competencyname!==null && competencyname.toLowerCase().trim().indexOf("pharmacy")==-1)
                {                    
                    competencyname = competencyname.replace("Diploma in", "Diploma in<br>");                    
                }   
                console.log(competencyname);             
                competencynameline = `
                        <p style="font-size: 17pt;font-family:timesnewroman;margin-top: 5px;margin-bottom: 0px;color:#ee2b2e;font-style:italic;font-weight:bold;">${competencyname}</p>
                    `;
                
                let cgpa=student['subother12'];
                if(cgpa==null) cgpa="";
                if(cgpa.indexOf("%")==-1) cgpa = "CGPA " + cgpa;
                let hindi_cgpa=student['subother13'];
                if(hindi_cgpa==null) hindi_cgpa="";
                if(hindi_cgpa.indexOf("%")==-1)
                {
                    if(font_name=="krutidev010")
                    {
                        hindi_cgpa = "lh-th-ih-,- " + hindi_cgpa;
                    }
                    else
                    {
                        hindi_cgpa = "सी.जी.पी.ए. " + hindi_cgpa;
                    }
                }
                     

                main_content = `
                    <center>   
                    <p style="font-size: 1pt;font-family:timesnewroman;margin-bottom: 0px;color:#000000;position: absolute;transform: translateX(-50%);left: 50%;top:218mm;width:200mm;">GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY</p> 
                    <p style="font-size: 10pt;font-family:timesnewroman;margin-top: 145px;margin-bottom: 0px;color:#000000;">(Under the Uttar Pradesh Private Universities Act No. 12 of 2019)</p>    
                    <p style="font-size: 1pt;font-family:timesnewroman;margin-top: 1px;margin-bottom: 0px;color:#000000;">GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY</p>
                    <p style="font-size: 15pt;font-family:timesnewroman;margin-top: 21px;margin-bottom: 0px;color:#000000;font-style:italic;">Upon the recommendation of its Executive Council,</p>
                    <p style="font-size: 15pt;font-family:timesnewroman;margin-top: 5px;margin-bottom: 0px;color:#000000;font-style:italic;">the Galgotias University, Uttar Pradesh hereby confers upon</p>   
                    
                    <p style="font-size: 17pt;font-family:timesnewroman;margin-top: ${margintop1};margin-bottom: 0px;font-weight:bold;color:#ee2b2e;font-style:italic;">${fullname}</p> 
                    <p style="font-size: 15pt;font-family:timesnewroman;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;">the</p>
                    ${competencynameline}
                    ${specialization_name}
                    <p style="font-size: 15pt;font-family:timesnewroman;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;">on having successfully completed ${student['subother14']}</p>
                    <p style="font-size: 15pt;font-family:timesnewroman;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;">for the award of the said Diploma in the</p>
                    <p style="font-size: 15pt;font-family:timesnewroman;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;">${dvision} <b style="font-size: 12pt;font-family:timesnewroman;">(${cgpa})</b> in <b style="font-size: 12pt;font-family:timesnewroman;">${student['subother7']}.</b></p> 
                    <p style="font-size: 1pt;font-family:timesnewroman;margin-top: 1px;margin-bottom: 0px;color:#000000;">${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber}</p>                 
                    </center>
                `;

                

                if(font_name=="krutidev010")
                {
                    hindi_main_content = `
                        <center>   
                        <p style="color: #000000; font-size: 19pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop0};">${hindi_sub2}</p> 
                        <p style="color: #ee2b2e; font-size: 20pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};font-weight:bold;">${student['subother1']}</p> 
                        <p style="color: #000000; font-size: 19pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};">${hindi_sub5}</p>                   
                        <p style="color: #000000; font-size: 19pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};">${student['subother15']} ikBîØe <b>${student['subother8']}</b></p> 

                        <p style="color: #000000; font-size: 19pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};">esa ${hindi_dvision} <b>¼${hindi_cgpa}½</b> esa lQyrkiwoZd iwjk djus ds mijkar</p>                    
                        <p style="color: #ee2b2e; font-size: 20pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};font-weight:bold;">${student['subother2']}</p> 
                        ${hindi_specialization_name}
                        <p style="color: #000000; font-size: 19pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};">dh mikf/k çnku djrk gSA</p>
                        </center>
                        `;
                }
                else
                {
                    hindi_main_content = `
                        <center>   
                        <p style="color: #000000; font-size: 14pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop0};">${hindi_sub2}</p> 
                        <p style="color: #ee2b2e; font-size: 15pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};font-weight:bold;">${student['subother1']}</p> 
                        <p style="color: #000000; font-size: 14pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};">${hindi_sub5}</p>                   
                        <p style="color: #000000; font-size: 14pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};">${student['subother15']} पाठ्यक्रम <b>${student['subother8']}</b></p> 

                        <p style="color: #000000; font-size: 14pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};">में ${hindi_dvision} <b style="font-size:14pt;">(${hindi_cgpa})</b> में सफलतापूर्वक पूरा करने के उपरांत</p>                    
                        <p style="color: #ee2b2e; font-size: 15pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};font-weight:bold;">${student['subother2']}</p> 
                        ${hindi_specialization_name}
                        <p style="color: #000000; font-size: 14pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};">में डिप्लोमा प्रदान करता है।</p>
                        </center>
                        `;
                }
                
               
                stringcontents = stringcontents.replace("MEMBER_PHOTO", `<img src="${student['photourl']}" style="width: 65px;height: 77px;position: absolute;right: 36px;top: 83px;">`.replace(/"/g,'\\"'));
                stringcontents = stringcontents.replace("ENROLL_NO", rollnumber);
                stringcontents = stringcontents.replace("SERIAL_NO", increaseFont(serialnumber).replace(/"/g,'\\"'));
                stringcontents = stringcontents.replace("FIRST_NAME", firstname);
                stringcontents = stringcontents.replace(/MONTH_YEAR_TWO/g, convocation_date);
                stringcontents = stringcontents.replace(/STUDENT_NAME/g, fullname);
                stringcontents = stringcontents.replace("MAIN_CONTENT", `${main_content}${hindi_main_content}${water_mark1}${water_mark2}${water_mark3}`.replace(/"/g,'\\"'));
                stringcontents = stringcontents.replace("BACKGROUND_IMAGE", `${myip}/images/Galgotias/galgotiasbackground.png`);
                stringcontents = stringcontents.replace(/HINDI_CONTROLLER/g,Convert_to_Kritidev("परीक्षा नियंत्रक"));
                
                return stringcontents;
            }
            else if (certificationcategory.toLowerCase() == "phd")
            {
                

                let margintop0="20px";
                
                let margintop1="6px";
                let margintop2="2px";

                if (student['subother3'] != "") {
                    margintop1="2px";
                    margintop2="2px";
                    specialization_name = ` 
                            <p style="font-size: 15pt;font-family:timesnewroman;margin-bottom: 0px;margin-top: 1px;color:#ee2b2e;font-style:italic;">in</p>
                            <p style="font-size: 15pt;font-family:timesnewroman;margin-bottom: 0px;margin-top: 1px;color:#ee2b2e;font-style:italic;font-weight:bold;">${student['subother3']}</p>
                   `;
                }
                if (student['subother4'] != "") {
                   
                    if(font_name=="krutidev010")
                     {
                         hindi_specialization_name = `                           
                          <p style="color: #ee2b2e; font-size: 20pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};font-weight:bold;">${student['subother4']}</p>
                          `;
                    
                     }
                     else
                     {
                         hindi_specialization_name = `                           
                         <p style="color: #ee2b2e; font-size: 15pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};font-weight:bold;">${student['subother4']}</p>
                         `;    
                     }
                 }
                
                // specialization_name="";
                // hindi_specialization_name="";
                // margintop1="6px";
                // margintop2="2px";
                
                let water_mark1 =`
                    <p class="dynamic-text" style="font-size: 6px;padding-top: 0px; font-family:timesnewroman;position:absolute;top:236px;left:690px;opacity:0.2;letter-spacing: 2px;white-space: nowrap;width:49px;" id="water_mark">${rollnumber}</p>
                `;
                let water_mark2 =`
                    <p class="dynamic-text1" style="font-size: 9px;padding-top: 0px; font-family:timesnewroman;position:absolute;left: 50%;transform:translateX(-50%);top:804px;opacity:0.18;letter-spacing: 3px;white-space: nowrap;" id="water_mark1">${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber}</p>
                `;
                let water_mark3 =`
                    <p class="dynamic-text2" style="font-size: 7px;padding-top: 0px; font-family:timesnewroman;position:absolute;left: 50%;transform:translateX(-50%);top:913px;opacity:0.18;letter-spacing: 3px;white-space: nowrap;" id="water_mark2">${convocation_date.toUpperCase()} ${convocation_date.toUpperCase()} ${convocation_date.toUpperCase()} ${convocation_date.toUpperCase()} ${convocation_date.toUpperCase()} ${convocation_date.toUpperCase()} ${convocation_date.toUpperCase()}</p>
                `;
                
                main_content = `
                    <center>   
                    <p style="font-size: 1pt;font-family:timesnewroman;margin-bottom: 0px;color:#000000;position: absolute;transform: translateX(-50%);left: 50%;top:218mm;width:200mm;">GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY</p> 
                    <p style="font-size: 10pt;font-family:timesnewroman;margin-top: 145px;margin-bottom: 0px;color:#000000;">(Under the Uttar Pradesh Private Universities Act No. 12 of 2019)</p>  
                    <p style="font-size: 1pt;font-family:timesnewroman;margin-top: 1px;margin-bottom: 0px;color:#000000;">GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY</p>  
                    <p style="font-size: 15pt;font-family:timesnewroman;margin-top: 21px;margin-bottom: 0px;color:#000000;font-style:italic;">Upon the recommendation of its Executive Council,</p>
                    <p style="font-size: 15pt;font-family:timesnewroman;margin-top: 5px;margin-bottom: 0px;color:#000000;font-style:italic;">the Galgotias University, Uttar Pradesh hereby confers upon</p>   
                    
                    <p style="font-size: 17pt;font-family:timesnewroman;margin-top: ${margintop1};margin-bottom: 0px;font-weight:bold;color:#ee2b2e;font-style:italic;">${fullname}</p> 
                    <p style="font-size: 15pt;font-family:timesnewroman;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;">the Degree of</p>
                    <p style="font-size: 17pt;font-family:timesnewroman;margin-top: ${margintop1};margin-bottom: 0px;font-weight:bold;color:#ee2b2e;font-style:italic;">${student['competencyname']}</p>
                    ${specialization_name}
                    <p style="font-size: 15pt;font-family:timesnewroman;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;">in ${student['subother7']}.</p>
                    <p style="font-size: 15pt;font-family:timesnewroman;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;">The topic of thesis was</p>
                    <p style="font-size: 15pt;font-family:timesnewroman;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;font-weight:bold;">${student['subother5']}</p>       
                    <p style="font-size: 1pt;font-family:timesnewroman;margin-top: 1px;margin-bottom: 0px;color:#000000;">${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber}</p>           
                    </center>
                `;
              
               
                
                if(font_name=="krutidev010")
                {
                    hindi_main_content = `
                        <center>   
                        <p style="color: #000000; font-size: 19pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop0};">${hindi_sub2}</p> 
                        <p style="color: #ee2b2e; font-size: 20pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};font-weight:bold;">${student['subother1']}</p> 
                        <p style="color: #000000; font-size: 19pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};">${hindi_sub6} <b>${student['subother8']}</b> esa</p> 
                        <p style="color: #000000; font-size: 19pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};">lQyrkiwoZd iwjk djus ds mijkr</p> 
                        <p style="color: #ee2b2e; font-size: 20pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};font-weight:bold;">${student['subother2']}</p> 
                        ${hindi_specialization_name}
                        <p style="color: #000000; font-size: 19pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};">dh mikf/k çnku djrk gSA</p>
                        <p style="color: #000000; font-size: 19pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};">${hindi_sub3}</p>
                        <p style="color: #000000; font-size: 19pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};font-weight:bold;">${student['subother6']}</p> 
                        </center>
                        `;
                }
                else
                {
                    hindi_main_content = `
                        <center>   
                        <p style="color: #000000; font-size: 14pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop0};">${hindi_sub2}</p> 
                        <p style="color: #ee2b2e; font-size: 15pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};font-weight:bold;">${student['subother1']}</p> 
                        <p style="color: #000000; font-size: 14pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};">${hindi_sub6} <b>${student['subother8']}</b> में</p> 
                        <p style="color: #000000; font-size: 14pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};">सफलतापूर्वक पूरा करने के उपरात</p> 
                        <p style="color: #ee2b2e; font-size: 15pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};font-weight:bold;">${student['subother2']}</p> 
                        ${hindi_specialization_name}
                        <p style="color: #000000; font-size: 14pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};">की उपाधि प्रदान करता है।</p>
                        <p style="color: #000000; font-size: 14pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};">${hindi_sub3}</p>
                        <p style="color: #000000; font-size: 14pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};font-weight:bold;">${student['subother6']}</p> 
                        </center>
                        `;
                }
               
                stringcontents = stringcontents.replace("MEMBER_PHOTO", `<img src="${student['photourl']}" style="width: 65px;height: 77px;position: absolute;right: 36px;top: 83px;">`.replace(/"/g,'\\"'));
                stringcontents = stringcontents.replace("ENROLL_NO", rollnumber);
                stringcontents = stringcontents.replace("SERIAL_NO", increaseFont(serialnumber).replace(/"/g,'\\"'));
                stringcontents = stringcontents.replace("FIRST_NAME", firstname);
                stringcontents = stringcontents.replace(/MONTH_YEAR_TWO/g, convocation_date);
                stringcontents = stringcontents.replace(/STUDENT_NAME/g, fullname);
                stringcontents = stringcontents.replace("MAIN_CONTENT", `${main_content}${hindi_main_content}${water_mark1}${water_mark2}${water_mark3}`.replace(/"/g,'\\"'));
                stringcontents = stringcontents.replace("BACKGROUND_IMAGE", `${myip}/images/Galgotias/galgotiasbackground.png`);
                stringcontents = stringcontents.replace(/HINDI_CONTROLLER/g,Convert_to_Kritidev("परीक्षा नियंत्रक"));
                
                return stringcontents;
            }
            else //bachelor or master
            {
                let margintop0="20px";
                
                let margintop1="15px";
                let margintop2="2px";
                if (student['subother3'] != "") {
                    margintop1="6px";
                    margintop2="2px";
                    specialization_name = `
                            <p style="font-size: 15pt;font-family:timesnewroman;margin-bottom: 0px;margin-top: ${margintop1};color:#ee2b2e;font-style:italic;">in</p>
                            <p style="font-size: 15pt;font-family:timesnewroman;margin-bottom: 0px;margin-top: ${margintop1};color:#ee2b2e;font-style:italic;font-weight:bold;">${student['subother3']}</p>
                       `;
                }
                if (student['subother4'] != "") {
                   
                       if(font_name=="krutidev010")
                        {
                            hindi_specialization_name = `                           
                             <p style="color: #ee2b2e; font-size: 20pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};font-weight:bold;">${student['subother4']}</p>
                             `;
                       
                        }
                        else
                        {
                            hindi_specialization_name = `                           
                            <p style="color: #ee2b2e; font-size: 15pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};font-weight:bold;">${student['subother4']}</p>
                            `;    
                        }
                }



                let water_mark1 =`
                    <p class="dynamic-text" style="font-size: 6px;padding-top: 0px; font-family:timesnewroman;position:absolute;top:236px;left:690px;opacity:0.2;letter-spacing: 2px;white-space: nowrap;width:49px;" id="water_mark">${rollnumber}</p>
                `;
                let water_mark2 =`
                    <p class="dynamic-text1" style="font-size: 9px;padding-top: 0px; font-family:timesnewroman;position:absolute;left: 50%;transform:translateX(-50%);top:804px;opacity:0.18;letter-spacing: 3px;white-space: nowrap;" id="water_mark1">${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber}</p>
                `;
                let water_mark3 =`
                    <p class="dynamic-text2" style="font-size: 7px;padding-top: 0px; font-family:timesnewroman;position:absolute;left: 50%;transform:translateX(-50%);top:913px;opacity:0.18;letter-spacing: 3px;white-space: nowrap;" id="water_mark2">${convocation_date.toUpperCase()} ${convocation_date.toUpperCase()} ${convocation_date.toUpperCase()} ${convocation_date.toUpperCase()} ${convocation_date.toUpperCase()} ${convocation_date.toUpperCase()} ${convocation_date.toUpperCase()}</p>
                `;

                let cgpa=student['subother12'];
                if(cgpa==null) cgpa="";
                if(cgpa.indexOf("%")==-1) cgpa = "CGPA " + cgpa;
                let hindi_cgpa=student['subother13'];
                if(hindi_cgpa==null) hindi_cgpa="";
                if(hindi_cgpa.indexOf("%")==-1)
                {
                    if(font_name=="krutidev010")
                    {
                        hindi_cgpa = "lh-th-ih-,- " + hindi_cgpa;
                    }
                    else
                    {
                        hindi_cgpa = "सी.जी.पी.ए. " + hindi_cgpa;
                    }
                }
                
                main_content = `
                    <center>  
                    <p style="font-size: 1pt;font-family:timesnewroman;margin-bottom: 0px;color:#000000;position: absolute;transform: translateX(-50%);left: 50%;top:218mm;width:200mm;">GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY</p> 
                    <p style="font-size: 10pt;font-family:timesnewroman;margin-top: 145px;margin-bottom: 0px;color:#000000;">(Under the Uttar Pradesh Private Universities Act No. 12 of 2019)</p>  
                    <p style="font-size: 1pt;font-family:timesnewroman;margin-top: 1px;margin-bottom: 0px;color:#000000;">GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY GALGOTIAS UNIVERSITY</p>   
                    <p style="font-size: 15pt;font-family:timesnewroman;margin-top: 21px;margin-bottom: 0px;color:#000000;font-style:italic;">Upon the recommendation of its Executive Council,</p>
                    <p style="font-size: 15pt;font-family:timesnewroman;margin-top: 5px;margin-bottom: 0px;color:#000000;font-style:italic;">the Galgotias University, Uttar Pradesh hereby confers upon</p>   
                    
                    <p style="font-size: 17pt;font-family:timesnewroman;margin-top: ${margintop1};margin-bottom: 0px;font-weight:bold;color:#ee2b2e;font-style:italic;">${fullname}</p> 
                    <p style="font-size: 15pt;font-family:timesnewroman;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;">the Degree of</p>
                    <p style="font-size: 17pt;font-family:timesnewroman;margin-top: ${margintop1};margin-bottom: 0px;font-weight:bold;color:#ee2b2e;font-style:italic;">${student['competencyname']}</p>
                    ${specialization_name}
                    <p style="font-size: 15pt;font-family:timesnewroman;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;">on having successfully completed the requirements for</p>
                    <p style="font-size: 15pt;font-family:timesnewroman;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;">the award of the said degree in the</p>
                    <p style="font-size: 15pt;font-family:timesnewroman;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;">${dvision} <b style="font-size: 12pt;font-family:timesnewroman;">(${cgpa})</b> in <b style="font-size: 14pt;font-family:timesnewroman;">${student['subother7']}.</b></p>  
                    <p style="font-size: 1pt;font-family:timesnewroman;margin-top: 1px;margin-bottom: 0px;color:#000000;">${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber} ${fullname} ${rollnumber}</p>                
                    </center>
                `;
                if(font_name=="krutidev010")
                {
                    hindi_main_content = `
                    <center>   
                    <p style="color: #000000; font-size: 19pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop0};">${hindi_sub2}</p> 
                    <p style="color: #ee2b2e; font-size: 20pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};font-weight:bold;">${student['subother1']}</p> 
                    <p style="color: #000000; font-size: 19pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};">${hindi_sub6} <b>${student['subother8']}</b></p> 
                    <p style="color: #000000; font-size: 19pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};">esa ${hindi_dvision} <b>¼${hindi_cgpa}½</b> esa lQyrkiwoZd iwjk djus ds mijkar</p>                    
                    <p style="color: #ee2b2e; font-size: 20pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};font-weight:bold;">${student['subother2']}</p> 
                    ${hindi_specialization_name}
                    <p style="color: #000000; font-size: 19pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};">dh mikf/k çnku djrk gSA</p>
                    </center>
                `;    
                }
                else
                {
                    hindi_main_content = `
                    <center>   
                    <p style="color: #000000; font-size: 14pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop0};">${hindi_sub2}</p> 
                    <p style="color: #ee2b2e; font-size: 15pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};font-weight:bold;">${student['subother1']}</p> 
                    <p style="color: #000000; font-size: 14pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};">${hindi_sub6} <b>${student['subother8']}</b></p> 
                    <p style="color: #000000; font-size: 14pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};">में ${hindi_dvision} <b style="font-size:14pt;">(${hindi_cgpa})</b> में सफलतापूर्वक पूरा करने के उपरांत</p>                    
                    <p style="color: #ee2b2e; font-size: 15pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};font-weight:bold;">${student['subother2']}</p> 
                    ${hindi_specialization_name}
                    <p style="color: #000000; font-size: 14pt; font-family:${font}; margin-bottom: 0px;margin-top: ${margintop1};">की उपाधि प्रदान करता है।</p>
                    </center>
                `;    
                }
                
                
               
                stringcontents = stringcontents.replace("MEMBER_PHOTO", `<img src="${student['photourl']}" style="width: 65px;height: 77px;position: absolute;right: 36px;top: 83px;">`.replace(/"/g,'\\"'));
                stringcontents = stringcontents.replace("ENROLL_NO", rollnumber);
                stringcontents = stringcontents.replace("SERIAL_NO", increaseFont(serialnumber).replace(/"/g,'\\"'));
                stringcontents = stringcontents.replace("FIRST_NAME", firstname);
                stringcontents = stringcontents.replace(/MONTH_YEAR_TWO/g, convocation_date);
                stringcontents = stringcontents.replace(/STUDENT_NAME/g, fullname);
                stringcontents = stringcontents.replace("MAIN_CONTENT", `${main_content}${hindi_main_content}${water_mark1}${water_mark2}${water_mark3}`.replace(/"/g,'\\"'));
                stringcontents = stringcontents.replace("BACKGROUND_IMAGE", `${myip}/images/Galgotias/galgotiasbackground.png`);
                stringcontents = stringcontents.replace(/HINDI_CONTROLLER/g,Convert_to_Kritidev("परीक्षा नियंत्रक"));
                
                return stringcontents;
            }            
        }
        catch(err){
            console.log(err);
            return stringcontents;
        }
    },
    template_replace_164 : async function (stringcontents, fullname, rollnumber, member_photo_url, student){
        try{
            let main_content = "";           
            let specialization_name = "";  
            let certificationcategory = student['certificationcategory'];
            if(certificationcategory==null) certificationcategory=="";
            let institutename = student['subother1'];
            if(institutename==null) institutename="";
            let programmename = student['subother2'];
            if(programmename==null) programmename="";
            let specialization = student['subother3'];
            if(specialization==null) specialization="";
            let thesis = student['subother4'];
            if(thesis==null) thesis="";
            let completionyear = student['subother5'];
            if(completionyear==null) completionyear="";
            let convocationdate = student['subother6'];
            if(convocationdate==null) convocationdate="";
            let dvision = student['subother7'];
            if(dvision==null) dvision="";

            console.log("certificationcategory=", certificationcategory);
            if(certificationcategory.toLowerCase() == "phd") //3 signatures
            {
                let margintop0="10px";
                let margintop1="13px";
                let margintop2="2px";
                if (specialization!= "") {
                    margintop1="5px";
                    margintop2="2px";
                    specialization = `<p style="font-size: 19pt;font-family:amazonebt;margin-bottom: 0px;margin-top: 1px;color:#000000;font-style:italic;width:174mm;">${specialization}</p>`;
                }
                if (thesis!= "") {
                    thesis = `<p style="font-size: 13pt;font-family:georgia;margin-top: ${parseInt(margintop1)+3}px;margin-bottom: 0px;color:#000000;width:160mm;">${thesis}</p>`;
                }
                main_content = `
                    <center>   
                    <p style="font-size: 19pt;font-family:amazonebt;margin-top: 115px;margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">The Board of Management of the University</p>    
                    <p style="font-size: 19pt;font-family:amazonebt;margin-top: 0px;margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">on the recommendation of the</p>
                    <p style="font-size: 19pt;font-family:amazonebt;margin-top: 0px;margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">Academic Council</p>   
                    <p style="font-size: 19pt;font-family:amazonebt;margin-top: 0px;margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">has conferred the degree of</p>   
                    
                    <p style="font-size: 23pt;font-family:amazonebt;margin-top: ${margintop0};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">${programmename}</p> 
                    ${specialization}
                    <p style="font-size: 19pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">upon</p>
                    <p style="font-size: 23pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">${fullname}</p>                                
                    <p style="font-size: 19pt;font-family:amazonebt;margin-top: 10px;margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">who has successfully completed all the</p>
                    <p style="font-size: 19pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">Requirements after approval of the thesis entitled</p>
                    ${thesis}
                    <p style="font-size: 19pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">in the year ${completionyear}</p>
                    <p style="font-size: 19pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">Given Under the Seal of Apex University, Jaipur</p>
                    <p style="font-size: 10pt;font-family:georgia;color:#000000;width:174mm;position: absolute;transform: translateX(-50%);left: 50%;top: 224mm;">Jaipur, ${convocationdate.replace("st", `<sup style="font-size: 8pt;">st</sup>`).replace("nd", `<sup style="font-size: 8pt;">nd</sup>`).replace("rd", `<sup style="font-size: 8pt;">rd</sup>`).replace("th", `<sup style="font-size: 8pt;">th</sup>`)}</p>
                    <img src="${myip}/images/apex/register_signature.png" style="width:65px; height:35px; position:absolute; top:239mm; left: 33mm">
                    </center>
                `;
                stringcontents = stringcontents.replace("BACKGROUND_IMAGE", `${myip}/images/apex/diplomabackground1.jpg`);
            }
            else if(certificationcategory.toLowerCase() == "pharmacy")//2 signatures
            {
                let margintop0="21px";   
                let margintop1="19px";
                let margintop2="2px";
                if (specialization!= "") {
                    margintop1="17px";
                    margintop2="2px";
                    specialization = `<p style="font-size: 19pt;font-family:amazonebt;margin-bottom: 0px;margin-top: 1px;color:#000000;font-style:italic;width:174mm;">${specialization}</p>`;
                }
                if(dvision!=="")
                {
                    dvision = `<p style="font-size: 19pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">${dvision}</p>`;
                }
                main_content = `
                    <center>   
                    <p style="font-size: 19pt;font-family:amazonebt;margin-top: 115px;margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">This is to certify that</p>
                    <p style="font-size: 23pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">${fullname}</p>
                    <p style="font-size: 22pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">(Apex Institute of Pharmaceutical Sciences)</p>      
                    <p style="font-size: 19pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">has been conferred the</p>             
                    <p style="font-size: 23pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">${programmename}</p> 
                    ${specialization}
                    <p style="font-size: 19pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">on</p>
                                
                    <p style="font-size: 19pt;font-family:amazonebt;margin-top: 16px;margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">having fulfilled the requirements</p>
                    <p style="font-size: 19pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">as prescribed by the University in</p>
                    <p style="font-size: 19pt;font-family:amazonebt;margin-top: ${parseInt(margintop1)+3}px;margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">the academic year ${completionyear} with</p>                   
                    ${dvision}
                    <p style="font-size: 19pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">Given Under the Seal of Apex University Jaipur</p>
                    <p style="font-size: 10pt;font-family:georgia;color:#000000;width:174mm;position: absolute;transform: translateX(-50%);left: 50%;top: 245mm;">Jaipur, ${convocationdate.replace("st", `<sup style="font-size: 8pt;">st</sup>`).replace("nd", `<sup style="font-size: 8pt;">nd</sup>`).replace("rd", `<sup style="font-size: 8pt;">rd</sup>`).replace("th", `<sup style="font-size: 8pt;">th</sup>`)}</p>
                    <img src="${myip}/images/apex/register_signature.png" style="width:65px; height:35px; position:absolute; top:234mm; left: 33mm">
                    <img src="${myip}/images/apex/president_signature.png" style="width:70px; height:80px; position:absolute; top:225mm; left: 158mm">
                    </center>
                `;
                stringcontents = stringcontents.replace("BACKGROUND_IMAGE", `${myip}/images/apex/diplomabackground.jpg`);
            }
            else //3 signatures
            {
                let margintop0="10px";
                let margintop0_fontsize="23pt";
                let margintop1="10px";
                let margintop2="2px";
                if (specialization!= "") {
                    margintop1="0px";
                    margintop2="2px";
                    specialization = `<p style="font-size: 19pt;font-family:amazonebt;margin-bottom: 0px;margin-top: 1px;color:#000000;font-style:italic;width:174mm;">${specialization}</p>`;
                }
                if(dvision!=="")
                {
                    dvision = `<p style="font-size: 20pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">${dvision}</p>`;
                }
                if(programmename.trim()=="Post Graduate Diploma (Garment Production & Export Management)")
                {
                    margintop0_fontsize="20pt";
                }
                main_content = `
                    <center>   
                    <p style="font-size: 19pt;font-family:amazonebt;margin-top: 115px;margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">The Board of Management of the University</p>    
                    <p style="font-size: 19pt;font-family:amazonebt;margin-top: 1px;margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">on the recommendation of the</p>
                    <p style="font-size: 19pt;font-family:amazonebt;margin-top: 1px;margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">Academic Council</p>   
                    <p style="font-size: 19pt;font-family:amazonebt;margin-top: 1px;margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">has conferred the degree of</p>   
                    
                    <p style="font-size: ${margintop0_fontsize};font-family:amazonebt;margin-top: ${margintop0};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">${programmename}</p> 
                    ${specialization}
                    <p style="font-size: 19pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">upon</p>
                    <p style="font-size: 23pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">${fullname}</p>                                
                    <p style="font-size: 19pt;font-family:amazonebt;margin-top: 14px;margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">having fulfilled the requirements</p>
                    <p style="font-size: 19pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">as prescribed by the University</p>
                    <p style="font-size: 19pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">in the year ${completionyear} with</p>
                    ${dvision}
                    <p style="font-size: 19pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">Given Under the Seal of Apex University, Jaipur</p>
                    <p style="font-size: 10pt;font-family:georgia;color:#000000;width:174mm;position: absolute;transform: translateX(-50%);left: 50%;top: 224mm;">Jaipur, ${convocationdate.replace("st", `<sup style="font-size: 8pt;">st</sup>`).replace("nd", `<sup style="font-size: 8pt;">nd</sup>`).replace("rd", `<sup style="font-size: 8pt;">rd</sup>`).replace("th", `<sup style="font-size: 8pt;">th</sup>`)}</p>
                    <img src="${myip}/images/apex/register_signature.png" style="width:65px; height:35px; position:absolute; top:239mm; left: 33mm">
                    </center>
                `;
                stringcontents = stringcontents.replace("BACKGROUND_IMAGE", `${myip}/images/apex/diplomabackground1.jpg`);
            }
            stringcontents = stringcontents.replace("MEMBER_PHOTO", `<img src="${member_photo_url}" style="width: 85px;height: 100px;position: absolute;right: 90px;top: 98px;">`.replace(/"/g,'\\"'));
            stringcontents = stringcontents.replace("ENROLL_NO", rollnumber);
            stringcontents = stringcontents.replace("MAIN_CONTENT", `${main_content}`.replace(/"/g,'\\"'));
            return stringcontents;
        }
        catch(err){
            console.log(err);
            return stringcontents;
        }
    },
    template_replace_186 : async function (stringcontents, fullname, rollnumber, member_photo_url, student){
        try{
            let main_content = "";           
            let specialization_name = "";  
            let certificationcategory = student['certificationcategory'];
            if(certificationcategory==null) certificationcategory=="";
            let institutename = student['subother1'];
            if(institutename==null) institutename="";
            let programmename = student['subother2'];
            if(programmename==null) programmename="";
            let specialization = student['subother3'];
            if(specialization==null) specialization="";
            let thesis = student['subother4'];
            if(thesis==null) thesis="";
            let completionyear = student['subother5'];
            if(completionyear==null) completionyear="";
            let convocationdate = student['subother6'];
            if(convocationdate==null) convocationdate="";
            let dvision = student['subother7'];
            if(dvision==null) dvision="";

            console.log("certificationcategory=", certificationcategory);
            if(certificationcategory.toLowerCase() == "phd") //3 signatures
            {
                let margintop0="10px";
                let margintop1="12px";
                let margintop2="2px";
                if (specialization!= "") {
                    margintop1="5px";
                    margintop2="2px";
                    specialization = `<p style="font-size: 19pt;font-family:amazonebt;margin-bottom: 0px;margin-top: 1px;color:#000000;font-style:italic;width:174mm;">${specialization}</p>`;
                }
                if (thesis!= "") {
                    thesis = `<p style="font-size: 13pt;font-family:georgia;margin-top: ${parseInt(margintop1)+3}px;margin-bottom: 0px;color:#000000;width:160mm;">${thesis}</p>`;
                }
                main_content = `
                    <center>   
                    <p style="font-size: 19pt;font-family:amazonebt;margin-top: 115px;margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">The Board of Management of the University</p>    
                    <p style="font-size: 19pt;font-family:amazonebt;margin-top: 0px;margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">on the recommendation of the</p>
                    <p style="font-size: 19pt;font-family:amazonebt;margin-top: 0px;margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">Academic Council</p>   
                    <p style="font-size: 19pt;font-family:amazonebt;margin-top: 0px;margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">has conferred the degree of</p>   
                    
                    <p style="font-size: 23pt;font-family:amazonebt;margin-top: ${margintop0};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">${programmename}</p> 
                    ${specialization}
                    <p style="font-size: 19pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">upon</p>
                    <p style="font-size: 23pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">${fullname}</p>                                
                    <p style="font-size: 19pt;font-family:amazonebt;margin-top: 10px;margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">who has successfully completed all the</p>
                    <p style="font-size: 19pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">Requirements after approval of the thesis entitled</p>
                    ${thesis}
                    <p style="font-size: 19pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">in the year ${completionyear}</p>
                    <p style="font-size: 19pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">Given Under the Seal of Apex University, Jaipur</p>
                    <p style="font-size: 10pt;font-family:georgia;color:#000000;width:174mm;position: absolute;transform: translateX(-50%);left: 50%;top: 224mm;">Jaipur, ${convocationdate.replace("st", `<sup style="font-size: 8pt;">st</sup>`).replace("nd", `<sup style="font-size: 8pt;">nd</sup>`).replace("rd", `<sup style="font-size: 8pt;">rd</sup>`).replace("th", `<sup style="font-size: 8pt;">th</sup>`)}</p>
                    <img src="${myip}/images/apex/register_signature.png" style="width:65px; height:35px; position:absolute; top:239mm; left: 33mm">
                    <img src="${myip}/images/apex/president_signature_new.png" style="width:30mm; height:17mm; position:absolute; top:233mm; left: 90mm">
                    </center>
                `;
                stringcontents = stringcontents.replace("BACKGROUND_IMAGE", `${myip}/images/apex/diplomabackground2.jpg`);
            }
            else if(certificationcategory.toLowerCase() == "pharmacy")//2 signatures
            {
                let margintop0="21px";   
                let margintop1="19px";
                let margintop2="2px";
                if (specialization!= "") {
                    margintop1="17px";
                    margintop2="2px";
                    specialization = `<p style="font-size: 19pt;font-family:amazonebt;margin-bottom: 0px;margin-top: 1px;color:#000000;font-style:italic;width:174mm;">${specialization}</p>`;
                }
                if(dvision!=="")
                {
                    dvision = `<p style="font-size: 19pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">${dvision}</p>`;
                }
                main_content = `
                <center>   
                <p style="font-size: 19pt;font-family:amazonebt;margin-top: 115px;margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">This is to certify that</p>
                <p style="font-size: 23pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">${fullname}</p>
                <p style="font-size: 22pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">(Apex Institute of Pharmaceutical Sciences)</p>      
                <p style="font-size: 19pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">has been conferred the</p>             
                <p style="font-size: 23pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">${programmename}</p> 
                ${specialization}
                <p style="font-size: 19pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">on</p>
                                        
                <p style="font-size: 19pt;font-family:amazonebt;margin-top: 16px;margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">having fulfilled the requirements</p>
                <p style="font-size: 19pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">as prescribed by the University in</p>
                <p style="font-size: 19pt;font-family:amazonebt;margin-top: ${parseInt(margintop1)+3}px;margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">the academic year ${completionyear} with</p>                   
                ${dvision}
                <p style="font-size: 19pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">Given Under the Seal of Apex University Jaipur</p>
                <p style="font-size: 10pt;font-family:georgia;color:#000000;width:174mm;position: absolute;transform: translateX(-50%);left: 50%;top: 245mm;">Jaipur, ${convocationdate.replace("st", `<sup style="font-size: 8pt;">st</sup>`).replace("nd", `<sup style="font-size: 8pt;">nd</sup>`).replace("rd", `<sup style="font-size: 8pt;">rd</sup>`).replace("th", `<sup style="font-size: 8pt;">th</sup>`)}</p>
                <img src="${myip}/images/apex/register_signature.png" style="width:65px; height:35px; position:absolute; top:234mm; left: 33mm">
                <img src="${myip}/images/apex/president_signature_new.png" style="width:30mm; height:17mm; position:absolute; top:233mm; left: 158mm">
                </center>
                `;
                stringcontents = stringcontents.replace("BACKGROUND_IMAGE", `${myip}/images/apex/diplomabackground.jpg`);
            }
            else //3 signatures
            {
                let margintop0="10px";
                let margintop0_fontsize="23pt";
                let margintop1="10px";
                let margintop2="2px";
                if (specialization!= "") {
                    margintop1="0px";
                    margintop2="2px";
                    specialization = `<p style="font-size: 19pt;font-family:amazonebt;margin-bottom: 0px;margin-top: 1px;color:#000000;font-style:italic;width:174mm;">${specialization}</p>`;
                }
                if(dvision!=="")
                {
                    dvision = `<p style="font-size: 20pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">${dvision}</p>`;
                }
                if(programmename.trim()=="Post Graduate Diploma (Garment Production & Export Management)")
                {
                    margintop0_fontsize="20pt";
                }
                main_content = `
                <center>   
                <p style="font-size: 19pt;font-family:amazonebt;margin-top: 115px;margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">The Board of Management of the University</p>    
                <p style="font-size: 19pt;font-family:amazonebt;margin-top: 1px;margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">on the recommendation of the</p>
                <p style="font-size: 19pt;font-family:amazonebt;margin-top: 1px;margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">Academic Council</p>   
                <p style="font-size: 19pt;font-family:amazonebt;margin-top: 1px;margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">has conferred the degree of</p>   
                
                <p style="font-size: ${margintop0_fontsize};font-family:amazonebt;margin-top: ${margintop0};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">${programmename}</p> 
                ${specialization}
                <p style="font-size: 19pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">upon</p>
                <p style="font-size: 23pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">${fullname}</p>                                
                <p style="font-size: 19pt;font-family:amazonebt;margin-top: 14px;margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">having fulfilled the requirements</p>
                <p style="font-size: 19pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">as prescribed by the University</p>
                <p style="font-size: 19pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">in the year ${completionyear} with</p>
                ${dvision}
                <p style="font-size: 19pt;font-family:amazonebt;margin-top: ${margintop1};margin-bottom: 0px;color:#000000;font-style:italic;width:174mm;">Given Under the Seal of Apex University, Jaipur</p>
                <p style="font-size: 10pt;font-family:georgia;color:#000000;width:174mm;position: absolute;transform: translateX(-50%);left: 50%;top: 224mm;">Jaipur, ${convocationdate.replace("st", `<sup style="font-size: 8pt;">st</sup>`).replace("nd", `<sup style="font-size: 8pt;">nd</sup>`).replace("rd", `<sup style="font-size: 8pt;">rd</sup>`).replace("th", `<sup style="font-size: 8pt;">th</sup>`)}</p>
                <img src="${myip}/images/apex/register_signature.png" style="width:65px; height:35px; position:absolute; top:239mm; left: 33mm">
                <img src="${myip}/images/apex/president_signature_new.png" style="width:30mm; height:17mm; position:absolute; top:233mm; left: 90mm">
                </center>
                `;
                stringcontents = stringcontents.replace("BACKGROUND_IMAGE", `${myip}/images/apex/diplomabackground2.jpg`);
            }
            stringcontents = stringcontents.replace("MEMBER_PHOTO", `<img src="${member_photo_url}" style="width: 85px;height: 100px;position: absolute;right: 90px;top: 98px;">`.replace(/"/g,'\\"'));
            stringcontents = stringcontents.replace("ENROLL_NO", rollnumber);
            stringcontents = stringcontents.replace("MAIN_CONTENT", `${main_content}`.replace(/"/g,'\\"'));
            return stringcontents;
        }
        catch(err){
            console.log(err);
            return stringcontents;
        }
    },
    template_replace_165 : async function (stringcontents, cohortid, main_std_id, s_baseurl){
        try{
            console.log("parameters:", cohortid, main_std_id);      
            const outputpdf = `/home/ubuntu/download/${main_std_id}_snu_temp.pdf`;
            console.log('wget --user-agent="Mozilla/5.0" --user-agent="Mozilla/5.0" -O '+outputpdf+' "' + s_baseurl + '/image/' +cohortid.replace(/ /g, "_") + '/' + main_std_id+'"');
            var os = new os_func();
            await os.execCommand('wget --user-agent="Mozilla/5.0" --user-agent="Mozilla/5.0" -O '+outputpdf+' "' + s_baseurl + '/image/' +cohortid.replace(/ /g, "_") + '/' + main_std_id+'"');
            const encodedurl = await convertPdf2Png(outputpdf, 400);
            //fs.writeFileSync("/home/ubuntu/convertPdf2Png.html",encodedurl);
            stringcontents = stringcontents.replace("FRONT_IMAGE", encodedurl.replace(/"/g,'\\"')); 
            if (fs.existsSync(`${outputpdf}`)) {
                fs.unlinkSync(`${outputpdf}`);
            }
            return stringcontents;
          }
          catch(err){
            console.log(err.message);
            return stringcontents;
          }
    },
    template_replace_166 : async function (stringcontents, temp_filename, student) {
        try{
            /*
            const poppler = new Poppler('/usr/bin');
            const options = {
                pngFile: true,
            transparentPageColor: true,
            };
            */
            let secondpage = student['secondpage'];
            let secondfilename="";
            if (secondpage == null || secondpage == undefined) secondpage="";
            if(secondpage=="")
            {
                secondfilename = "template166secondpage.png";
            }            
            // const outputFile = `/home/ubuntu/download/${temp_filename}_temp`;
            // await poppler.pdfToCairo(`/home/ubuntu/download/${temp_filename}_temp.pdf`, outputFile, options);

            var os = new os_func();
            const outputFile = `/home/ubuntu/download/${temp_filename}_temp-1.png`;
            await os.execCommand(`gs -q -sPAPERSIZE=a4 -sDEVICE=pngalpha -dTextAlphaBits=4 -r400x400 -o ${outputFile} -dNOPAUSE -dBATCH  /home/ubuntu/download/${temp_filename}_temp.pdf`);//ghostscript
            await os.execCommand(`convert ${outputFile} -transparent white ${outputFile}`);//imagemagic    
            /*
            let printfrontimage = fs.readFileSync(`${outputFile}`, { encoding: 'base64' });
            stringcontents = stringcontents.replace(/FRONT_IMAGE_PRINT/g, `data:image/png;base64,${printfrontimage}`); 
            */
            await IMAGES(IMAGES(`${wwwdir}/images/rvim/template166gradcardpg.png`).resize(2430, 3458))            
            .draw(IMAGES(`${outputFile}`).resize(2303, 3277), 63, 0)
            .save(`/home/ubuntu/download/${temp_filename}.png`);

            let frontimage = fs.readFileSync(`/home/ubuntu/download/${temp_filename}.png`, { encoding: 'base64' });
            let backimgdata = `${myip}/images/rvim/${secondfilename}`;
            console.log("backimgdata=", backimgdata);
            stringcontents = stringcontents.replace(/FRONT_IMAGE/g, `data:image/png;base64,${frontimage}`); 
            stringcontents = stringcontents.replace(/BACK_IMAGE/g, backimgdata);

            if (fs.existsSync(`/home/ubuntu/download/${temp_filename}_temp.pdf`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}_temp.pdf`);
            }                
            if (fs.existsSync(`/home/ubuntu/download/${temp_filename}_temp-1.png`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}_temp-1.png`);
            }
            if (fs.existsSync(`/home/ubuntu/download/${temp_filename}.png`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}.png`);
            }
            return stringcontents;
        }
        catch(err){
          console.log(err.message);
          return stringcontents;
        }  
    },
    template_replace_167 : async function (stringcontents, temp_filename, student) {
        try{
            var secondfilename = "template167gradecardsecondpage.png";
            console.log("--Temp File name->>>", temp_filename);
            console.log("Blank String content", stringcontents);
            var os = new os_func();
            const outputFile = `/home/ubuntu/download/${temp_filename}_temp-1.png`;
            await os.execCommand(`gs -q -sPAPERSIZE=a4 -sDEVICE=pngalpha -dTextAlphaBits=4 -r300x300 -o ${outputFile} -dNOPAUSE -dBATCH  /home/ubuntu/download/${temp_filename}_temp.pdf`);//ghostscript
            await os.execCommand(`convert ${outputFile} -transparent white ${outputFile}`);//imagemagic

            let printfrontimage = fs.readFileSync(`${outputFile}`, { encoding: 'base64' });
            stringcontents = stringcontents.replace(/FRONT_PRINT_IMAGE/g, `data:image/png;base64,${printfrontimage}`); 

            await IMAGES(IMAGES(`${wwwdir}/images/nicmar/template167gradecardfront.png`))
            .draw(IMAGES(`${outputFile}`), 37, 58)
            .save(`/home/ubuntu/download/${temp_filename}.png`);

            await IMAGES(IMAGES(`/home/ubuntu/download/${temp_filename}.png`).resize(1100, 1555))
            .save(`/home/ubuntu/download/${temp_filename}.png`);
            // await IMAGES(IMAGES(`${wwwdir}/images/nicmar/template167gradecardfront.png`).resize(1653, 2337))
            // .draw(IMAGES(`${outputFile}`).resize(1600, 2200), 30, 42)
            // .save(`/home/ubuntu/download/${temp_filename}.png`);
             
            // await IMAGES(IMAGES(`${wwwdir}/images/nicmar/template167gradecardfront.png`).resize(800, 1131))            
            // .draw(IMAGES(`${outputFile}`).resize(774, 1064), 15, 21)
            // .save(`/home/ubuntu/download/${temp_filename}.png`);

            // await IMAGES(IMAGES(`${wwwdir}/images/nicmar/template167gradecardfront.png`).resize(1100, 1556))            
            // .draw(IMAGES(`${outputFile}`).resize(1064, 1464), 20, 28)
            // .save(`/home/ubuntu/download/${temp_filename}.png`);
            /*
            await IMAGES(IMAGES(`${wwwdir}/images/nicmar/template167gradecardfront.png`).resize(950, 1343))            
            .draw(IMAGES(`${outputFile}`).resize(919, 1264), 18, 24)
            .save(`/home/ubuntu/download/${temp_filename}.png`);
            */
            /*
            await IMAGES(IMAGES(`${wwwdir}/images/nicmar/template167gradecardfront.png`).resize(1500, 2121))            
            .draw(IMAGES(`${outputFile}`).resize(1224, 1882), 160, 50)
            .save(`/home/ubuntu/download/${temp_filename}.png`);
            */
            let frontimage = fs.readFileSync(`/home/ubuntu/download/${temp_filename}.png`, { encoding: 'base64' });
            let backimgdata = `${myip}/images/nicmar/${secondfilename}`;
            console.log("backimgdata=", backimgdata);
            stringcontents = stringcontents.replace(/FRONT_IMAGE/g, `data:image/png;base64,${frontimage}`);            
            stringcontents = stringcontents.replace(/BACK_IMAGE/g, backimgdata);

            if (fs.existsSync(`/home/ubuntu/download/${temp_filename}_temp.pdf`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}_temp.pdf`);
            }                
            if (fs.existsSync(`/home/ubuntu/download/${temp_filename}_temp-1.png`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}_temp-1.png`);
            }
            if (fs.existsSync(`/home/ubuntu/download/${temp_filename}.png`)) {
                fs.unlinkSync(`/home/ubuntu/download/${temp_filename}.png`);
            }
            return stringcontents;
        }
        catch(err){
          console.log(err.message);
          return stringcontents;
        }  
    },
    template_replace_168 : async function (stringcontents, fullname, rollnumber, programmename, cgpa, gender, dateofissue){
        try{
            let main_content = "";           
            let name_prefix="Mr.";
            let name_alias="He";
            if( gender == "F" )
            {
                name_prefix="Ms.";
                name_alias="She";
            }
            main_content = `
            <center style="position: absolute;top: 137px;left: 0px;width: 210mm;">
                <p style="font-size: 21pt;font-family:timesnewroman;margin-top: 115px;margin-bottom: 0px;color:#000000;font-weight:bold;width:174mm;letter-spacing: -2px;">PROVISIONAL DEGREE CERTIFICATE</p>
                <img src="${myip}/images/nicmar/arrow.png" style="width: 365px;margin-top: 7px;">
                <p style="font-size: 16pt;font-family: timesnewroman;   
                margin-bottom: 0px;color: #000000;width: 174mm;margin-top: 69px;text-indent: 2em;text-align: justify;line-height: 1.5em;">This is to certify that ${name_prefix} <b>${fullname.toUpperCase()}</b>, PRN No. <b>${rollnumber.toUpperCase()}</b> has appeared for and declared to have passed the <b>${programmename}</b> programme with a <b>CGPA</b> of <b>${cgpa}</b></p>
                
                <p style="font-size: 16pt;font-family:timesnewroman;margin-top: 40px;margin-bottom: 0px;color:#000000;width:174mm;text-indent: 2em;text-align: justify;line-height: 1.5em;">${name_alias} has satisfied all the requirements and is eligible for the aforesaid degree certificate at the ensuing convocation of NICMAR UNIVERSITY, PUNE.</p>
                
                <table style="width:174mm;margin-top: 216px;"><tbody><tr><td style="width: 50%; text-align: left;"></td><td style="width: 50%; text-align: center;"><img style="height: 44px;" src="${myip}/images/nicmar/provisionalcoesignature.png"></td></tr>
                <tr><td style="width: 50%; text-align: left;"><p style="font-size: 16pt;font-family:timesnewroman;margin-top: 0px;margin-bottom: 0px;color:#000000;">Date: ${dateofissue}</p></td><td style="width: 50%; text-align: center;"><p style="font-size: 16pt;font-family:timesnewroman;margin-top: 0px;margin-bottom: 0px;color:#000000;">Controller of Examinations</p></td></tr>
                <tr><td style="width: 50%; text-align: left;"><p style="font-size: 16pt;font-family:timesnewroman;margin-top: 0px;margin-bottom: 0px;color:#000000;">Place: Pune</p></td><td style="width: 50%; text-align: center;"> </td></tr>                            </tbody></table>
            </center>`;
            stringcontents = stringcontents.replace("BACKGROUND_IMAGE", `${myip}/images/nicmar/template168provisionalfront.png`);
            stringcontents = stringcontents.replace("MAIN_CONTENT", `${main_content}`.replace(/"/g,'\\"'));
            return stringcontents;
        }
        catch(err){
            console.log(err);
            return stringcontents;
        }
    },
    template_replace_169 : async function (stringcontents, fullname, competency_name, student){
        try{
            if (student.subother2!==null) {
                student.subother2=student.subother2.replace(/&/g, 'and');
            }
            if (student.subother5) {
                student.subother5 = student.subother5.replace("Thirty Day", "Thirtieth Day");
            }
            main_content = `<p style="font-size:25pt;font-family:timesnewromanbold;margin-top:203px;margin-bottom:0px;color:#1f2f57;">${student.subother1}</p>
                <p style="font-size:18pt;font-family:pristina;margin-top:10px;margin-bottom:0px;">for ${student.subother2}</p>
                <p style="font-size:18pt;font-family:pristina;margin-top:10px;margin-bottom:0px;">in</p>
                <p style="font-size:19pt;font-family:timesnewromanbold;margin-top:10px;margin-bottom:0px;color:#1f2f57">${competency_name}</p>
                <p style="font-size:18pt;font-family:pristina;margin-top:10px;margin-bottom:0px">Awarded to</p>
                <p style="font-size:25pt;font-family:timesnewromanbold;margin-top:10px;margin-bottom:0px;color:#1f2f57">${fullname}</p>
                <p style="font-size:18pt;font-family:pristina;margin-top:10px;margin-bottom:0px">at the Convocation held on the ${student.subother5}</p>
                <p style="font-size:16pt;font-family:pristina;margin-top:10px;margin-bottom:0px">Given under the seal of IILM University.</p>`;
            if (student.subother1.toLowerCase() == "certificate of merit") {
                if (student.subother3 != "") {
                    main_content = `<p style="font-size:25pt;font-family:timesnewromanbold;margin-top:203px;margin-bottom:0px;color:#1f2f57">${student.subother1}</p>
                        <p style="font-size:18pt;font-family:pristina;margin-top:10px;margin-bottom:0px">for ${student.subother2} in</p>
                        <p style="font-size:18pt;font-family:pristina;margin-top:10px;margin-bottom:0px">${student.subother3}</p>
                        <p style="font-size:19pt;font-family:pristina;margin-top:10px;margin-bottom:0px;">in</p>
                        <p style="font-size:18pt;font-family:timesnewromanbold;margin-top:10px;margin-bottom:0px;color:#1f2f57">${competency_name}</p>
                        <p style="font-size:18pt;font-family:pristina;margin-top:10px;margin-bottom:0px">Awarded to</p>
                        <p style="font-size:25pt;font-family:timesnewromanbold;margin-top:10px;margin-bottom:0px;color:#1f2f57">${fullname}</p>
                        <p style="font-size:18pt;font-family:pristina;margin-top:10px;margin-bottom:0px">at the Convocation held on the ${student.subother5}</p>
                        <p style="font-size:18pt;font-family:pristina;margin-top:10px;margin-bottom:0px">Given under the seal of IILM University.</p>`;
                } else {
                    let specialStudents = ["sneha garg", "tanya goyal", "dhruv", "manika sharma", "abhilasha mehta", "payal jindal", "tanvi narayan", "arjun arora", "arjun singh arora", "shyamly choudhary arora"];
                    let newSubother2 = `for ${student.subother2} in the Area of`;
                    if (specialStudents.includes(fullname.trim().toLowerCase())) newSubother2 = `for ${student.subother2}`;
                    main_content = `<p style="font-size:25pt;font-family:timesnewromanbold;margin-top:203px;margin-bottom:0px;color:#1f2f57">${student.subother1}</p>
                        <p style="font-size:18pt;font-family:pristina;margin-top:10px;margin-bottom:0px">${newSubother2}</p>
                        <p style="font-size:18pt;font-family:pristina;margin-top:10px;margin-bottom:0px">${student.subother4}</p>
                        <p style="font-size:18pt;font-family:pristina;margin-top:10px;margin-bottom:0px;">in</p>
                        <p style="font-size:18pt;font-family:timesnewromanbold;margin-top:10px;margin-bottom:0px;color:#1f2f57">${competency_name}</p>
                        <p style="font-size:18pt;font-family:pristina;margin-top:10px;margin-bottom:0px">Awarded to</p>
                        <p style="font-size:25pt;font-family:timesnewromanbold;margin-top:10px;margin-bottom:0px;color:#1f2f57">${fullname}</p>
                        <p style="font-size:18pt;font-family:pristina;margin-top:10px;margin-bottom:0px">at the Convocation held on the ${student.subother5}</p>
                        <p style="font-size:18pt;font-family:pristina;margin-top:10px;margin-bottom:0px">Given under the seal of IILM University.</p>`;
                }
            }
            stringcontents = stringcontents.replace("MAIN_CONTENT", main_content.replace(/"/g,'\\"'));
            stringcontents = stringcontents.replace("IMG_REPLACE_1", `${myip}/images/IILM/registrar.PNG`);
            stringcontents = stringcontents.replace("IMG_REPLACE_2", `${myip}/images/IILM/vicechancellor.PNG`);
            stringcontents = stringcontents.replace("IMG_REPLACE_3", `${myip}/images/IILM/chancellor.PNG`);
            return stringcontents;
        }
        catch(err){
            console.log(err);
            return stringcontents;
        }
    },
    template_replace_208 : async function (stringcontents, fullname, competency_name, student){
        try{
            if (student.subother2!==null) {
                student.subother2=student.subother2.replace(/&/g, 'and');
            }
            if (student.subother5) {
                student.subother5 = student.subother5.replace("Thirty Day", "Thirtieth Day");
            }
            main_content = `<p style="font-size:25pt;font-family:timesnewromanbold;margin-top:203px;margin-bottom:0px;color:#1f2f57;">${student.subother1}</p>
                <p style="font-size:18pt;font-family:pristina;margin-top:10px;margin-bottom:0px;">for ${student.subother2}</p>
                <p style="font-size:18pt;font-family:pristina;margin-top:10px;margin-bottom:0px;">in</p>
                <p style="font-size:19pt;font-family:timesnewromanbold;margin-top:10px;margin-bottom:0px;color:#1f2f57">${competency_name}</p>
                <p style="font-size:18pt;font-family:pristina;margin-top:10px;margin-bottom:0px">Awarded to</p>
                <p style="font-size:25pt;font-family:timesnewromanbold;margin-top:10px;margin-bottom:0px;color:#1f2f57">${fullname}</p>
                <p style="font-size:18pt;font-family:pristina;margin-top:10px;margin-bottom:0px">at the Convocation held on the ${student.subother5}</p>
                <p style="font-size:16pt;font-family:pristina;margin-top:10px;margin-bottom:0px">Given under the seal of IILM University.</p>`;
            if (student.subother1.toLowerCase() == "certificate of merit") {
                if (student.subother3 != "") {
                    main_content = `<p style="font-size:25pt;font-family:timesnewromanbold;margin-top:203px;margin-bottom:0px;color:#1f2f57">${student.subother1}</p>
                        <p style="font-size:18pt;font-family:pristina;margin-top:10px;margin-bottom:0px">for ${student.subother2} in</p>
                        <p style="font-size:18pt;font-family:pristina;margin-top:10px;margin-bottom:0px">${student.subother3}</p>
                        <p style="font-size:19pt;font-family:pristina;margin-top:10px;margin-bottom:0px;">in</p>
                        <p style="font-size:18pt;font-family:timesnewromanbold;margin-top:10px;margin-bottom:0px;color:#1f2f57">${competency_name}</p>
                        <p style="font-size:18pt;font-family:pristina;margin-top:10px;margin-bottom:0px">Awarded to</p>
                        <p style="font-size:25pt;font-family:timesnewromanbold;margin-top:10px;margin-bottom:0px;color:#1f2f57">${fullname}</p>
                        <p style="font-size:18pt;font-family:pristina;margin-top:10px;margin-bottom:0px">at the Convocation held on the ${student.subother5}</p>
                        <p style="font-size:18pt;font-family:pristina;margin-top:10px;margin-bottom:0px">Given under the seal of IILM University.</p>`;
                } else {
                    let specialStudents = ["sneha garg", "tanya goyal", "dhruv", "manika sharma", "abhilasha mehta", "payal jindal", "tanvi narayan", "arjun arora", "arjun singh arora", "shyamly choudhary arora"];
                    let newSubother2 = `for ${student.subother2} in the Area of`;
                    if (specialStudents.includes(fullname.trim().toLowerCase())) newSubother2 = `for ${student.subother2}`;
                    main_content = `<p style="font-size:25pt;font-family:timesnewromanbold;margin-top:203px;margin-bottom:0px;color:#1f2f57">${student.subother1}</p>
                        <p style="font-size:18pt;font-family:pristina;margin-top:10px;margin-bottom:0px">${newSubother2}</p>
                        <p style="font-size:18pt;font-family:pristina;margin-top:10px;margin-bottom:0px">${student.subother4}</p>
                        <p style="font-size:18pt;font-family:pristina;margin-top:10px;margin-bottom:0px;">in</p>
                        <p style="font-size:18pt;font-family:timesnewromanbold;margin-top:10px;margin-bottom:0px;color:#1f2f57">${competency_name}</p>
                        <p style="font-size:18pt;font-family:pristina;margin-top:10px;margin-bottom:0px">Awarded to</p>
                        <p style="font-size:25pt;font-family:timesnewromanbold;margin-top:10px;margin-bottom:0px;color:#1f2f57">${fullname}</p>
                        <p style="font-size:18pt;font-family:pristina;margin-top:10px;margin-bottom:0px">at the Convocation held on the ${student.subother5}</p>
                        <p style="font-size:18pt;font-family:pristina;margin-top:10px;margin-bottom:0px">Given under the seal of IILM University.</p>`;
                }
            }
            stringcontents = stringcontents.replace("MAIN_CONTENT", main_content.replace(/"/g,'\\"'));
            stringcontents = stringcontents.replace("IMG_REPLACE_1", `${myip}/images/IILM/iilm_gn_reg_new.png`);
            stringcontents = stringcontents.replace("IMG_REPLACE_2", `${myip}/images/IILM/vicechancellor.PNG`);
            stringcontents = stringcontents.replace("IMG_REPLACE_3", `${myip}/images/IILM/chancellor.PNG`);
            return stringcontents;
        }
        catch(err){
            console.log(err);
            return stringcontents;
        }
    },
    template_replace_170 : async function (stringcontents, fullname, competency_name, student){
        try{
            let main_content = "";           
            let name_prefix="her";
            let name_alias="Daughter";
            if( student.sex == "M" )
            {
                name_prefix="him";
                name_alias="Son";
            }
            if ( student.convocation_date ) {
                student.convocation_date = student.convocation_date.replace(/(\d+)(st|nd|rd|th)/g, (match, p1, p2) => { return `${p1}<sup>${p2}</sup>` });
            }
            let student_photo_url = student["photourl"];
            if (student_photo_url == "" || student_photo_url == null) {
                student_photo_url = `${myip}/images/nicmar/nicmar_degree_student.jpg`;
            }
            main_content = `
            <center style="position: absolute;top: 3mm;left: 0px;width: 192mm; margin-left: 9mm;font-family: 'Times New Roman Italic';">
                <p style="font-size:10pt; text-align: right; font-family: 'Times New Roman'; position: absolute; right: 9mm; top: 0mm;">Crt. No: ${student.subother7}</p>
                <img style="width:18mm; top:46mm; right:-2mm; position:absolute;" src="${student_photo_url}" />
                <p style="text-align: center; margin-top: 70mm"><em><span style="font-size:15pt;font-style: italic;">We, the President, the Vice Chancellor, members of the Governing Body,</span></em></p>
                <p style="text-align: center;font-size:15pt;font-style: italic;"><em>on the recommendations of the Board of Management and Academic Council</em></p>
                <p style="text-align: center;"><em><span style="font-size:15pt;font-style: italic;">of the NICMAR University, Pune</span></em></p>
                <p style="text-align: center; font-size:15pt; font-style: italic;"><em>Certify that</em></p>
                <p style="text-align: center; 32px; font-family: 'Monotype Corsiva'; "><span style="color:#990000;font-size:24pt;"><strong>${student.firstname}</strong></span></p>
                <p style="text-align: center; font-style: italic;"><em><span style="font-size:15pt;">&nbsp;</span></em><em><span style="font-size:15pt;">(</span></em><em><span style="font-size:15pt;">${name_alias}</span></em><em><span style="font-size:15pt;">&nbsp;of Shri. ${student.fathername} and &nbsp;Smt. ${student.mothername})</span></em></p>
                <p style="text-align: center;"><em><span style="font-size:15pt; font-style: italic;">has been examined and declared to have passed the examination in</span></em></p>
                <p style="text-align: center; font-style: italic;"><em><span style="font-size:15pt;">${student.subother2.toString()} with </span></em><strong><em><span style="font-size:15pt;">CGPA ${student.subother1}</span></em></strong><em><span style="font-size:15pt;">&nbsp;out of ${student.subother3} with&nbsp;</span></em><strong><em><span style="font-size:15pt;">${student.subother4}</span></em></strong><em><span style="font-size:15pt;"></span></em></p>
                <p style="text-align: center;"><em><span style="font-size:15pt; font-style: italic;">and qualified for the degree of&nbsp;</span></em></p>
                <p style="text-align: center;font-family: 'Monotype Corsiva';"><strong><span style="color:#990000;font-size:24pt;">${competency_name}</span></strong></p>
                <p style="text-align: center;font-family: 'Monotype Corsiva';"><strong><span style="color:#990000; font-size:20pt;">(${student.subother5})</span></strong></p>
                <p style="text-align: center;" ><em><span style="font-size:15pt; font-style: italic;">The said degree has been conferred on&nbsp;</span></em><em><span style="font-size:15pt;">${name_prefix}</span></em><em><span style="font-size:15pt;">&nbsp;at Pune,&nbsp;</span></em></p>
                <p style="text-align: center;"><em><span style="font-size:15pt; font-style: italic;">on the ${student.convocation_date} in the year ${student.subother6}</span></em></p>
                <p style="text-align: center;"><em><span style="font-size:15pt; font-style: italic;">In testimony whereof are set the seal of the University and the signature of</span></em></p>
                <p style="text-align: center;"><em><span style="font-size:15pt; font-style: italic;">the Vice Chancellor.</span></em></p>
                <img style="position: absolute; right: 18mm; height:11mm; top:242.5mm" src="${myip}/images/nicmar/vice_chancellor_signature.png">
                <p style="text-align: right; margin-top:23.5mm; margin-right: 11mm; font-family: 'Times New Roman';"><span style="font-size:14pt;">Vice Chancellor</span></p>
            </center>`;
            stringcontents = stringcontents.replace("FRONT_IMAGE", `${myip}/images/nicmar/template170degreefront.png`);
            stringcontents = stringcontents.replace("SECOND_IMAGE", `${myip}/images/nicmar/template170degreesecond.png`);

            stringcontents = stringcontents.replace("IMG_REPLACE_1", `${myip}/images/nicmar/prepared_signature.png`);
            stringcontents = stringcontents.replace("IMG_REPLACE_2", `${myip}/images/nicmar/checked_signature.png`);
            stringcontents = stringcontents.replace("IMG_REPLACE_3", `${myip}/images/nicmar/provisionalcoesignature.png`);

            stringcontents = stringcontents.replace("MAIN_CONTENT", `${main_content}`.replace(/"/g,'\\"'));
            return stringcontents;
        }
        catch(err){
            console.log(err);
            return stringcontents;
        }
    },
    template_replace_176 : async function (stringcontents, main_std_id, student_uuid, student){
        try{
            var os = new os_func();
            const outputFile = `/home/ubuntu/download/${student_uuid}_temp-1.png`;
            await os.execCommand(`gs -q -sPAPERSIZE=a4 -sDEVICE=pngalpha -dTextAlphaBits=4 -r400x400 -o ${outputFile} -dNOPAUSE -dBATCH  /home/ubuntu/download/${student_uuid}_temp.pdf`);//ghostscript
            await os.execCommand(`convert ${outputFile} -transparent white ${outputFile}`);//imagemagic
            await IMAGES(IMAGES(`${wwwdir}/images/sbup/sbup_background.png`)) 
            .draw(IMAGES(`${outputFile}`).resize(1390, 1965), 19, 11)
            .save(`/home/ubuntu/download/${student_uuid}.png`);
            let frontimage = fs.readFileSync(`/home/ubuntu/download/${student_uuid}.png`, { encoding: 'base64' });
            stringcontents = stringcontents.replace(/FRONT_IMAGE/g, `data:image/png;base64,${frontimage}`);
            let main_content = `<center>
                <img src="${myip}/images/sbup/vice_chancellor.png" style="width: 36mm; position: absolute; top: 252mm; left: 25mm; display: block;"/>
                <img src="${myip}/images/sbup/chancellor.png" style="width: 40mm; position: absolute; top: 250mm; left: 137mm; display: block;"/>
            </center>
            <img src="${myip}/images/sbup/sbup_second.png" style="height: 297mm; width: 210mm; position: absolute; top: 297mm;" />`;
            stringcontents = stringcontents.replace("MAIN_CONTENT", main_content.replace(/"/g,'\\"'));
            if (fs.existsSync(`/home/ubuntu/download/${student_uuid}_temp.pdf`)) {
                fs.unlinkSync(`/home/ubuntu/download/${student_uuid}_temp.pdf`);
            }
            if (fs.existsSync(`/home/ubuntu/download/${student_uuid}_temp-1.png`)) {
                fs.unlinkSync(`/home/ubuntu/download/${student_uuid}_temp-1.png`);
            }
            if (fs.existsSync(`/home/ubuntu/download/${student_uuid}.png`)) {
                fs.unlinkSync(`/home/ubuntu/download/${student_uuid}.png`);
            }
            return stringcontents;
        }
        catch(err){
          console.log(err.message);
          return stringcontents;
        }
    },
    template_replace_180 : async function (stringcontents, main_std_id, student_uuid, student) {
        try{
            var os = new os_func();
            const outputFile = `/home/ubuntu/download/${student_uuid}_temp-1.png`;
            await os.execCommand(`gs -q -sPAPERSIZE=a4 -sDEVICE=pngalpha -dTextAlphaBits=4 -r400x400 -o ${outputFile} -dNOPAUSE -dBATCH  /home/ubuntu/download/${student_uuid}_temp.pdf`);//ghostscript
            let frontimage = fs.readFileSync(outputFile, { encoding: 'base64' });
            stringcontents = stringcontents.replace(/FRONT_IMAGE/g, `data:image/png;base64,${frontimage}`);
            let main_content = `<img src="${myip}/images/GBU/gbu_second.png" style="height: 297mm; width: 210mm; position: absolute; top: 297mm;" />`;
            stringcontents = stringcontents.replace("MAIN_CONTENT", main_content.replace(/"/g,'\\"'));
            if (fs.existsSync(`/home/ubuntu/download/${student_uuid}_temp.pdf`)) {
                fs.unlinkSync(`/home/ubuntu/download/${student_uuid}_temp.pdf`);
            }
            if (fs.existsSync(`/home/ubuntu/download/${student_uuid}_temp-1.png`)) {
                fs.unlinkSync(`/home/ubuntu/download/${student_uuid}_temp-1.png`);
            }
            return stringcontents;
        }
        catch(err){
          console.log(err.message);
          return stringcontents;
        }
    },
    template_replace_183 : async function (stringcontents, main_std_id, student_uuid, student) {
        try {
            stringcontents = stringcontents.replace("ENROLL_NO", student["studentid"]);
            stringcontents = stringcontents.replace("IMG_REPLACE_1", `${myip}/images/IILM/iilm_gn_reg.png`);
            stringcontents = stringcontents.replace("IMG_REPLACE_2", `${myip}/images/IILM/iilm_gn_vice.png`);
            stringcontents = stringcontents.replace("IMG_REPLACE_3", `${myip}/images/IILM/controller_exam.png`);
            // let main_content = `<p style="font-size: 16pt; font-family: 'pristina'; margin-top: 170px; margin-bottom: 0px;">Upon the recommendation of the Academic Council</p>
            // <p style="font-size: 16pt; font-family: 'pristina'; margin-top: 10px; margin-bottom: 0px;">hereby confers the Degree of</p>
            // <p style="font-size: 17pt; font-family: 'timesnewromanbold'; margin-top: 10px; color: #1f2f57;">${student["competencyname"]}</p>
            // <p style="font-size: 16pt; font-family: 'pristina'; margin-top: 10px; margin-bottom: 0px;">On <span style="font-size: 29pt; font-family: 'timesnewromanbold'; color: #1f2f57;">${student["firstname"]}</span></p>
            // <p style="font-size: 16pt; font-family: 'pristina'; margin-top: 10px; margin-bottom: 0px;">who has successfully completed in the year ${student["subother11"]} the requirements prescribed</p>
            // <p style="font-size: 16pt; font-family: 'pristina'; margin-top: 10px; margin-bottom: 0px;">under the Ordinance for the award of this degree.</p>
            // <p style="font-size: 16pt; font-family: 'pristina'; margin-top: 10px; margin-bottom: 0px;">Title of Thesis:</p>
            // <p style="font-size: 17pt; font-family: 'timesnewromanbold'; margin-top: 10px; color: #1f2f57; margin-bottom: 0px;">"${student["subother10"].toUpperCase()}"</p>
            // <p style="font-size: 16pt; font-family: 'pristina'; margin-top: 10px; margin-bottom: 0px;">Given this day under the seal of the University at New Delhi in the Republic of India.</p>
            // <p style="font-size: 14pt; font-family: 'pristina'; margin-left: 9mm; margin-top: 35mm; margin-bottom: 0px; text-align: left;">The ${this.formatDateString(student["coursecompletiondate"], "DD Month YYYY")}</p>`;
            let  competencyname = student["competencyname"];
            if (competencyname.includes("(Hons.)") || competencyname.includes(" in ")) {
                competencyname = competencyname.replace("(Hons.)", "COMPETENCY_HONS_");
                competencyname = competencyname.replace(" in ", "COMPETENCY_IN_");
                competencyname = competencyname.toUpperCase();
                competencyname = competencyname.replace("COMPETENCY_HONS_", "(Hons.)");
                competencyname = competencyname.replace("COMPETENCY_IN_", " in ");
            } else {
                competencyname = competencyname.toUpperCase();
            }
            let main_content = `<p style="font-size: 16pt; font-family: 'pristina'; margin-top: 160px; margin-bottom: 0px;">The Governing Body of the University</p>
            <p style="font-size: 16pt; font-family: 'pristina'; margin-top: 8px; margin-bottom: 0px;">on the recommendation of the Academic Council and by virtue of the</p>
            <p style="font-size: 16pt; font-family: 'pristina'; margin-top: 8px; margin-bottom: 0px;">authority vested in them have conferred upon</p>
            <p style="font-size: 16pt; font-family: 'pristina'; margin-top: 6px; margin-bottom: 0px;"><span style="font-size: 29pt; font-family: 'timesnewromanbold'; color: #1f2f57;">${student["firstname"]}</span></p>
            <p style="font-size: 16pt; font-family: 'pristina'; margin-top: 6px; margin-bottom: 0px;">The Degree of</p>
            <p style="font-size: 17pt; font-family: 'timesnewromanbold'; margin-top: 12px; margin-bottom: 0px; color: #1f2f57;">${competencyname}</p>
            <p style="font-size: 16pt; font-family: 'pristina'; margin-top: 8px; margin-bottom: 0px;">Who has successfully completed in the year ${student["subother11"]}</p>
            <p style="font-size: 16pt; font-family: 'pristina'; margin-top: 8px; margin-bottom: 0px;">Title of Thesis:</p>
            <p style="font-size: 12pt; font-family: 'timesnewromanbold'; margin-top: 6px; color: #1f2f57; margin-bottom: 0px;">"${student["subother10"]}"</p>
            <p style="font-size: 16pt; font-family: 'pristina'; margin-top: 8px; margin-bottom: 0px;">on testimony whereof, the seal of the University and the signature of</p>
            <p style="font-size: 16pt; font-family: 'pristina'; margin-top: 8px; margin-bottom: 0px;">its officers are hereunto affixed on ${this.formatDateString(student["coursecompletiondate"], "Month DD, YYYY")}</p>`;
            stringcontents = stringcontents.replace("MAIN_CONTENT", `${main_content}`.replace(/"/g,'\\"'));
        } catch (err) {
            console.log("template_183 = : ", err.message);
        }
        return stringcontents;
    },
    template_replace_184 : async function (stringcontents, main_std_id, student_uuid, student) {
        try {
            let pronoun_subject = student["sex"] === "F" ? "She" : "He";
            let pronoun_possessive = student["sex"] === "F" ? "her" : "his";
            let main_content = `<p style="font-size: 20pt; font-family: 'calibri'; margin-top: 55mm; margin-bottom: 0px; margin-left: 95mm; margin-right: 95mm; text-align: center; background-color: #7a7a7a; color: white; padding: 5px; border-radius: 25px;">MERIT CERTIFICATE</p>
                <p style="font-size: 18pt; font-family: 'calibri'; text-align: left; margin-top: 60px; margin-bottom: 30px; margin-left: 5mm; margin-right: 5mm;">Scholar No. : <span style="font-size: 18pt; font-family: 'calibri'; color: red; margin-right: 40%">${student["studentid"]}</span> 
                <span style="float: right;">Batch : <span style="font-size: 18pt; font-family: 'calibri'; color: red;">${student["subother1"]}</span></span></p>
                <p style="font-size: 18pt; font-family: 'calibri'; text-align: left; margin-top: 50px; position: relative;margin-left: 5mm; margin-right: 5mm;">This is to certify that<span style="position: relative; display: inline-block; color: red; font-size: 18pt; font-family: 'calibri'; width: 145.6mm; padding-left: 13mm;">
                <span style="position: absolute; bottom: 0px; left: 0; right: 0; width: 100%; height: 1.5px; background-color: black;"></span>${student["firstname"]}</span><span style="float: right;">has secured</span></p>
                <p style="font-size: 18pt; font-family: 'calibri'; margin-top: 30px; margin-left: 5mm; margin-right: 5mm;">
                <span style="position: relative; display: inline-block; color: red; font-size: 18pt; width: 53mm; text-align: center;">
                <span style="position: absolute; bottom: 0px; left: 0; right: 0; width: 100%; height: 1.5px; background-color: black;"></span>${student["subother2"]}</span>&nbsp;in&nbsp;
                <span style="position: relative; display: inline-block; color: red; font-size: 18pt; width: 181mm; float: right; text-align: center;">
                <span style="position: absolute; bottom: 0px; left: 0; right: 0; width: 100%; height: 1.5px; background-color: black;"></span>${student["competencyname"]}</span></p>
                <p style="font-size: 18pt; font-family: 'calibri'; text-align: left; margin-top: 30px; margin-left: 5mm; margin-right: 5mm;">With
                <span style="position: relative; display: inline-block; color: red; font-size: 18pt; width: 21mm; text-align: center;">
                <span style="position: absolute; bottom: 0px; left: 0; right: 0; width: 100%; height: 1.5px; background-color: black;"></span>${student["cgpa"]}</span>
                <span>GGPA. ${pronoun_subject} has been awarded</span>
                <span style="position: relative; display: inline-block; color: red; font-size: 18pt; width: 82mm; text-align: center;">
                <span style="position: absolute; bottom: 0px; left: 0; right: 0; width: 100%; height: 1.5px; background-color: black;"></span>${student["medaltype"]}</span>
                <span style="float: right;">for ${pronoun_possessive} academic</span></p>
                <p style="font-size: 18pt; font-family: 'calibri'; text-align: left; margin-top: 30px; margin-bottom: 30px; margin-left: 5mm; margin-right: 5mm;">achievement in the 3<sup>rd</sup> Convocation held on 8<sup>th</sup> February, 2025.</p>
                <table style="width: 100%; margin-top: 18mm; margin-left: 5mm; margin-right: 5mm;">
                    <tbody>
                    <tr>
                        <td style="width: 33%;"><img style="height: 13mm; margin-left: 16mm;" src="${myip}/images/Bhopal/examination.png" /></td>
                        <td style="width: 33%; text-align: center; vertical-align: middle;"><img style="height: 13mm; display: block; margin: auto;" src="${myip}/images/Bhopal/academic.png" /></td>
                        <td style="width: 33%;"><img style="height: 11mm; float: right; margin-right:8mm;" src="${myip}/images/Bhopal/director.png" /></td>
                    </tr>
                    <tr>
                        <td style="width: 33%; font-size: 18pt; font-family: 'calibri'">Prof. I/C Examination </td>
                        <td style="width: 33%; font-size: 18pt; font-family: 'calibri'; text-align: center;">Prof. I/C Academic </td>
                        <td style="width: 33%; font-size: 18pt; font-family: 'calibri'; text-align: right;"><span style="margin-right: 21mm;">Director</span></td>
                    </tr>
                    </tbody>
                </table>`;
            stringcontents = stringcontents.replace("MAIN_CONTENT", `${main_content}`.replace(/"/g,'\\"'));
        } catch (err) {
            console.log("template_184 = : ", err.message);
        }
        return stringcontents;
    },
    template_replace_201 : async function (stringcontents, main_std_id, student_uuid, student){
        try{
                var os = new os_func();
                const tempPdfPath = `/home/ubuntu/download/${student_uuid}_temp.pdf`;
                const outputFile1 = `/home/ubuntu/download/${student_uuid}_temp-1.png`;

                // Convert PDF to PNG for both pages
                await os.execCommand(`gs -q -sPAPERSIZE=a4 -sDEVICE=pngalpha -dTextAlphaBits=4 -r400x400 -o ${outputFile1} -dNOPAUSE -dBATCH ${tempPdfPath}`);
                console.log("--xxxx---");
                // Read the first page image and encode it in Base64
                let frontimage = fs.readFileSync(outputFile1, { encoding: 'base64' });
                let frontImageHtml = `<img src="data:image/png;base64,${frontimage}" style="position: absolute; width: 210mm; height: 297mm; top: 0mm; left: 0mm;" alt="Front Image" />`;
                // let frontImageHtml = `<img src="data:image/png;base64,${frontimage}" style="width: 210mm; height: 297mm; top: 0mm; left: 0mm;" alt="Front Image" />`;
                // Read the second page image and encode it in Base64
                let main_content = `<center>
                        ${frontImageHtml}
                </center>`;
                stringcontents = stringcontents.replace("MAIN_CONTENT", main_content.replace(/"/g,'\\"'));
                if (fs.existsSync(`/home/ubuntu/download/${student_uuid}_temp.pdf`)) {
                                fs.unlinkSync(`/home/ubuntu/download/${student_uuid}_temp.pdf`);
                }
                if (fs.existsSync(`/home/ubuntu/download/${student_uuid}_temp-1.png`)) {
                                fs.unlinkSync(`/home/ubuntu/download/${student_uuid}_temp-1.png`);
                }
                return stringcontents;
        }
        catch(err){
                console.log(err.message);
                return stringcontents;
        }
    },
    template_replace_196 : async function (stringcontents, main_std_id, student_uuid, student) {
    try {
        let HoD_sign_name = "";
        switch (student["department"].toLowerCase()) {
            case "artificial intelligence and machine learning": HoD_sign_name = "AIML"; break;
            case "aerospace engineering": HoD_sign_name = "AS"; break;
            case "biotechnology": HoD_sign_name = "BT"; break;
            case "chemical engineering": HoD_sign_name = "CH"; break;
            case "computer science and engineering": HoD_sign_name = "CS"; break;
            case "civil engineering": HoD_sign_name = "CV"; break;
            case "electronics and communication engineering": HoD_sign_name = "EC"; break;
            case "electrical and electronics engineering": HoD_sign_name = "EEE"; break;
            case "electronics and instrumentation engineering": HoD_sign_name = "EI"; break;
            case "electronics and telecommunication engineering": HoD_sign_name = "ET"; break;
            case "industrial engineering and management": HoD_sign_name = "IM"; break;
            case "information science and engineering": HoD_sign_name = "IS"; break;
            case "mechanical engineering": HoD_sign_name = "ME"; break;
        }

        let apaarid_part=""
        if (student["subother3"]!="")
        {
            apaarid_part=`<p style="position: absolute; top: 190mm; left: 158mm; font-size: 14pt; transform: translateX(-50%); font-family: 'roboto'; text-align: center;">APAAR ID-${student["subother3"]} </p>`;
        }
        let studentName = student["firstname"] || "";
        let studentNameFontSize = "18pt"; // Default

        if (studentName.length > 30) {
          studentNameFontSize = "14pt";
        } else if (studentName.length > 25) {
          studentNameFontSize = "16pt";
        }
        let courseName = student["coursename"] || "";
        let courseNameFontSize = "14pt"; // Default

        if (courseName.length > 70) {
          courseNameFontSize = "10pt";
        } else if (courseName.length > 60) {
          courseNameFontSize = "11pt";
        } else if (courseName.length > 48) {
          courseNameFontSize = "12pt";
        } else if (courseName.length > 45) {
          courseNameFontSize = "13pt";
        }
        let main_content = `
          <p style="position: absolute; top: 50mm; left: 158mm; font-size: 18pt; transform: translateX(-50%); font-family: 'playfair'; color: black; text-align: center; white-space: nowrap;">Department of ${student["department"]}</p>
          <span style="position: absolute; top: 108mm; left: 100mm; transform: translateX(-50%); font-size: ${studentNameFontSize}; font-family: 'roboto';">${studentName}</span>
          <span style=" position: absolute; top: 108mm; left: 248mm; transform: translateX(-50%); font-size: 18pt; font-family: 'roboto';">${student["studentid"]}</span>
          <p style="position: absolute; top: 120mm; left: 217mm; transform: translateX(-50%); font-size: ${courseNameFontSize}; font-family: 'roboto'; text-align: center; white-space: nowrap;">${student["coursename"]}</p>

          <p style="position: absolute; top: 129.5mm; left: 50mm; transform: translateX(-50%); font-size: 14pt; font-family: 'roboto'; text-align: center;">${student["subother2"]}</p>
          <p style="position: absolute; top: 129.5mm; left: 180mm; transform: translateX(-50%); font-size: 14pt; font-family: 'roboto'; text-align: center;">${student["subother1"]}</p>

          <p style=" position: absolute; top: 140mm; left: 119mm; transform: translateX(-50%); font-size: 14pt; font-family: 'roboto'; text-align: center;">${student["subother4"]}</p>
          <p style=" position: absolute; top: 140mm; left: 156mm; transform: translateX(-50%); font-size: 14pt; font-family: 'roboto'; text-align: center;">${student["subother5"]}</p>

          ${apaarid_part}
          <div style=" position: absolute; top: 160mm; width: 100%; display: flex; justify-content: space-between; padding: 0 5mm;"> 
            <img style="height: 13mm; width: 28mm; margin-left: 29mm;" src="${myip}/images/RV/Signatures/${HoD_sign_name}.png" />
            <img style="height: 9mm; " src="${myip}/images/RV/Signatures/Dean_CESD.png" />
            <img style="height: 15mm; margin-left: -8mm;" src="${myip}/images/RV/coe_new.png" />
            <img style="height: 13mm; margin-right: 15mm;" src="${myip}/images/RV/Principal_green.png" />
          </div>
        `;
        stringcontents = stringcontents.replace("MAIN_CONTENT", `${main_content}`.replace(/"/g,'\\"'));
        } catch (err) {
            console.log("template_196 = : ", err.message);
        }
        return stringcontents;
    },
}
