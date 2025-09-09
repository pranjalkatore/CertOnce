var commander = require('commander');
var fs = require('fs');
var pngitxt = require('png-itxt');
var https = require('https');

aa();
async function bake(imageToBake, openbadges_content, bakedImage) {

  fs.createReadStream(imageToBake)
        .on('end',async function () {
          console.log("success");
        })
        .pipe(pngitxt.set('openbadges', openbadges_content))
        .pipe(fs.createWriteStream(bakedImage));
}
async function aa()
{
  var filename="cert-image.png";
  var baked_filename="new_baked.png";
  var badge_content={};
  badge_content["@context"]="https://w3id.org/openbadges/v2";
  badge_content["id"]="https://test.certonce.com/aa.json";
  badge_content["type"]="Assertion";
  badge_content["verification"]={};
  badge_content["verification"]["type"]="hosted";
  await bake(filename, JSON.stringify(badge_content), baked_filename)
}