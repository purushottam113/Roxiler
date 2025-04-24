const bcrypt = require("bcrypt");

const isPasswordValid = async (hashPassword, inputPassword)=> {
    const passwordCheck = await bcrypt.compare(inputPassword, hashPassword);
    return passwordCheck;
}

module.exports = isPasswordValid;