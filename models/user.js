'use strict';

const genSalt = require('../helpers/generatesalt');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: function(models) {
        let salt = genSalt.genRandomString(8);
        let password = models.password
        models.password = genSalt.createHash(password, salt);
        models.salt = salt;
      }
    }
  });
  return User;
};
