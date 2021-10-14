const secretKey = require('secret-key');
const { createApp } = require("../models/User");
const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require("../utils/responses");
const {ServerError} = require("../utils/error-handler");

const registerApp = async (req,res) => {
    const appName = req.body.appname;
    const filter = {username: req.body.username}
    const passphraseLen = 28;
    let passphrase = "";
    const validChars = [];

    for (let i=65;i<90;i+=1)
        validChars.push(String.fromCharCode(i));

    for (let i=48;i<57;i+=1)
        validChars.push(String.fromCharCode(i));

    for (let i=0;i<passphraseLen;i+=1) {
        if (i%7 === 0 && i!==0)
            passphrase+="-"

        let randomNum = Math.random() * (validChars.length-1);
        randomNum = Math.ceil(randomNum);
        passphrase += validChars[randomNum];
    }

    const keyDetails = secretKey.create(passphrase);
    const {secret, iv, timestamp } = keyDetails;
    // .secret, keyDetails.iv, keyDetails.timestamp;
    // const iv = ;
    // const timestamp = ;

    try {
        const newApp = {
            $push: {
                apps: {
                    appName,
                    iv,
                    timestamp,
                    passphrase
                }
            }
        };
        const result = await createApp(filter, newApp);
        if (result === null || typeof  result === "undefined")
            return BAD_REQUEST(res,"Could not add app");
    }catch (error) {
        if (error instanceof ServerError) return INTERNAL_SERVER_ERROR(res);
        return res.send(error);
    }
  return res.send(`added app with name: ${appName}, 
  with secretkey:${secret}, please save the key as you won't have access to it again`);
};

// const useApp = async (req,res){
//     let username = req.body.username;
//     let appName = req.body.appName;
//     let secret = req.body.secret;
//     let userFilter = {username: req.body.username};
//     let appFilter = {name:appName};
//     findApp(userfilter,appFilter);
//     secretKey.check(passphrase,secret,iv,timestamp);
//     // make a transaction in app
// }

module.exports = { registerApp };
