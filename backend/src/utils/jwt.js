const jwt = require('jsonwebtoken');

const getJWT = async (user)=> {
    const jwtToken = await jwt.sign({id: user.id}, "Moonlight", {expiresIn: '1d'});
    return jwtToken
}

module.exports = getJWT;