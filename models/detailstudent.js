'use strict';
module.exports = function(sequelize, DataTypes) {
  var Detailstudent = sequelize.define('Detailstudent', {
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Detailstudent;
};