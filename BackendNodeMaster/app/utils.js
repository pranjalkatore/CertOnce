const url = require('url'); // Migration
const aws = require("aws-sdk");
const config = require("../config/config");
const s3 = new aws.S3({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    region: config.region,
});
const mailer_downloadcertificate = require("../config/mailer_downloadcertificate");
const axios = require('axios');
const mailer_certonce = require("../config/mailer_certonce");
const logfiledir = "/home/ubuntu/logs/";
const qs = require("qs")

const sendEmail = async (email_body, email_subject, contact_email, smtpaccount, puserid, emailType, isCertonce = true) => {
    let logfilename = logfiledir + puserid + "/sendcertificate.log";
    if (emailType == "mailer_downloadcertificate") {
        let mailer_result = await mailer_downloadcertificate(email_body, email_subject, contact_email, smtpaccount, logfilename);
        if (isCertonce) {
            if (mailer_result.status == "400") {
                let email_body = `<p style="color: black;">There is an error in uploading students.</p><p style="color: black;">Error: ${JSON.stringify(mailer_result.message.response)}</p>`
                let email_subject = "Upload Students Result";
                mailer_certonce(email_body, email_subject, contact_email, logfilename);
            }
        }
    }
}

const checkStudentDuplication = async (params, contact_email, smtpaccount, puserid) => {
    let duplicateStudents = [];
    let uniqueParams = [];
    let seenStudentIds = new Set();
    let duplicateStudentIds = new Set();
    for (const row of params) {
        if (seenStudentIds.has(row.studentid)) {
            duplicateStudentIds.add(row.studentid);
        } else {
            seenStudentIds.add(row.studentid);
        }
    }
    for (const row of params) {
        if (duplicateStudentIds.has(row.studentid)) {
            duplicateStudents.push(row); // Add to duplicates
        } else {
            uniqueParams.push(row); // Keep unique entries
        }
    }
    params.length = 0;
    params.push(...uniqueParams);
    let email_body = `<p style="color: black;">Uploading Students data has duplication students.</p><br>`;
    for (const row of duplicateStudents) {
        email_body = email_body + `<p style="color: black;">${row["email"]} - ${row["firstname"]} - ${row["studentid"]}</p><br>`;
    }
    let email_subject = "Upload Students Error - Duplication!";
    await sendEmail(email_body, email_subject, contact_email, smtpaccount, puserid, "mailer_downloadcertificate", false);
    return params;
}

const getAccessToken = async (tenantId, clientId, clientSecret) => {
    console.log('getAccessToken: ', tenantId, clientId, clientSecret)
    if (!tenantId || !clientId || !clientSecret) throw new Error("Missing required credentials");
    const scope = 'https://graph.microsoft.com/.default';

    const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret);
    params.append("scope", scope);
    params.append("grant_type", "client_credentials");

    try {
        const response = await axios.post(tokenEndpoint, params);
        return response.data.access_token;
    } catch (err) {
        console.log("ERROR while getting Office token.");
        return null;
    }
}

// ✅ NEW FUNCTION: refresh token flow
const refreshOffice365Token = async (tenantId, clientId, clientSecret, refreshToken) => {
    const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret);
    params.append("refresh_token", refreshToken);
    params.append("grant_type", "refresh_token");
    params.append("scope", "https://graph.microsoft.com/.default offline_access");

    try {
        const response = await axios.post(tokenEndpoint, params);
        return response.data;
    } catch (err) {
        console.error("Failed to refresh Office 365 token:", err.response?.data || err.message);
        throw err;
    }
}

// ✅ NEW FUNCTION: auto refresh logic
const refreshOffice365TokenIfNeeded = async (account, updateDbCallback = null) => {
    const now = Math.floor(Date.now() / 1000);
    const expiresAt = account.office365tokenexpiry || 0;
    const buffer = 300;

    if (!account.office365accesstoken || now > (expiresAt - buffer)) {

        const {
            office365tanentid: tenantId, // spelling on DB table - office365tanentid
            office365clientid: clientId,
            office365clientsecret: clientSecret,
            office365refreshtoken: refreshToken
        } = account;
        
        const refreshed = await refreshOffice365Token(tenantId, clientId, clientSecret, refreshToken);
        account.office365accesstoken = refreshed.access_token;
        // account.office365tokenexpiry = now + refreshed.expires_in;

        if (refreshed.refresh_token) {
            account.office365refreshtoken = refreshed.refresh_token;
        }

        // Optional: persist back to DB
        if (updateDbCallback && typeof updateDbCallback === 'function') {
            await updateDbCallback(account.office365accesstoken, account.office365refreshtoken);
        }

        console.log("Access token refreshed successfully.");
    } else {
        console.log("Access token is still valid.");
    }

    return account.office365accesstoken;
}

const sendEmailIdeaBizViaAPI = async (account, mailOptions) => {
    const apiUrl = 'https://emailidea.biz/api/SendEmail';

    const data = qs.stringify({
        ApiKey: account.password,
        To: mailOptions.to,
        From: account.from,
        ReplyTo: account.from,
        Subject: mailOptions.subject,
        Body: mailOptions.html
    });
    const result = {};

    try {
        const response = await axios.post(apiUrl, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        console.log('Response:', response.data);

        result.status = 200;
        result.message = response.data.message
        return result;
    } catch (error) {
        console.error('Error sending email:', error.response?.data || error.message);
        result.status = 400;
        result.message = "Something went wrong."
        return result;
    }
};

// Migration
function parseS3Url(s3Url) {
    const { hostname, pathname } = url.parse(s3Url);
    const bucket = hostname.split('.')[0];
    const key = pathname.substring(1);
    return { Bucket: bucket, Key: key };
}

async function uploadJsonToS3(BUCKET_NAME, S3_KEY, fileContent) {
    try {
        const params = {
            Bucket: BUCKET_NAME,
            Key: S3_KEY,
            Body: fileContent,
            ContentType: 'application/json',
        };

        const result = await s3.upload(params).promise();
        console.log('File uploaded successfully:', result.Location);
        return `https://${BUCKET_NAME}.s3.us-east-2.amazonaws.com/${S3_KEY}`;
    } catch (error) {
        console.error('S3 Upload failed:', error.message);
        throw error;
    }
}

module.exports = {
    sendEmail,
    checkStudentDuplication,
    getAccessToken,
    sendEmailIdeaBizViaAPI,
    parseS3Url,
    uploadJsonToS3,
    refreshOffice365TokenIfNeeded, // ✅ export the new function
};
