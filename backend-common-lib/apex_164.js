const myip="https://www.certonce.com";
const wwwdir="/var/www/html";
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

module.exports = {
    
}