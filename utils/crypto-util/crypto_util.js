const dotenv = require("dotenv");
const path = require("path");
dotenv.config({path:path.join(__dirname,"/../../enviroment/crypto.env")});
const crypto = require("crypto");
const util = require("util")
const NullPointError = require("../errors/NullPointError")

const SECRET_SALT = process.env.SALT;
const ITERATION = Number(process.env.ITERATION);
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

exports.Encryption = async (password) => {
    if (!password)
        throw new NullPointError("No Password");

    const KEY = await pbkdf2Promise(password, SECRET_SALT, ITERATION, 64, "sha512");
    const hashedPassword = KEY.toString("base64");
    return hashedPassword;
};

exports.Decryption = async (password, comparePassword) => {
    if (!password)
        throw new NullPointError("No Password");
    if (!comparePassword)
        throw new NullPointError("No Compare Password");

    const KEY = await pbkdf2Promise(password, SECRET_SALT, ITERATION, 64, "sha512");
    const hashedPassword = KEY.toString("base64");
    
    if(hashedPassword === comparePassword) 
        return true;
    return false;
};