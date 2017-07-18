var crypto = require('crypto');

function genRandomString(length) {
  //Cara Manual
  // var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ',
  //     setLen = set.length,
  //     salt = '';
  // for (var i = 0; i < len; i++) {
  //   var p = Math.floor(Math.random() * setLen);
  //   salt += set[p];
  // }
  // return salt;

  //cara bawaan dari crypto
  return crypto.randomBytes(Math.ceil(length/2))
          .toString('hex')
          .slice(0,length);
}

function createHash(password, salt) {
  let hash = crypto.createHmac('sha256', salt).update(password).digest('hex');

  return hash;
}

module.exports = {
  genRandomString,
  createHash
};
