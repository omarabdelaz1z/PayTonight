const secretKey = require('secret-key');
const {StatusCodes} = require("http-status-codes");
const { createApp } = require("../models/User");
const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require("../utils/responses");
const {ServerError} = require("../utils/error-handler");

const generatePassphrase = ()=>{
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
    return passphrase;
};

const registerApp = async (req,res) => {
    const passphrase = generatePassphrase();
    const keyDetails = secretKey.create(passphrase);
    const { secret, iv, timestamp } = keyDetails;

    try {
        const name = req?.body?.appname;
        const filter = {username: req?.body?.username};
        if (name === null || name === undefined)
            return BAD_REQUEST(res,"Missing app name");

        const newApp = {
            $push: {
                apps: {
                    name,
                    iv,
                    timestamp,
                    passphrase
                }
            }
        };

        const result = await createApp(filter, newApp);
        if (result === null || typeof result === "undefined")
            return BAD_REQUEST(res,"Could not add app");

        const response = {name, secret};
        return res.status(StatusCodes.CREATED).json(response);
    }catch (error) {
        if (error instanceof ServerError) return INTERNAL_SERVER_ERROR(res);
        return res.send(error);
    }
};

module.exports = { registerApp };
