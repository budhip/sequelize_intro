'use strict';
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      isEmail: true,
      allowNull: false,
      unique: true,
      validate: {
        isUnique: function (value, next) {
          var self = this;
          Student.find({where: {email: value}})
          .then(function (student) {
            // tolak jika ada yang memasukkan email yang sama
            if (student && self.id !== student.id) {
              return next('Email udah ada yang pake om!');
            }
              return next();
            })
            .catch(function (err) {
              return next(err);
              });
            }
          }
        },
    jurusan: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Student;
};
