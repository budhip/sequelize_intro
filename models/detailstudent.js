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

  Detailstudent.associate = (models) => {
    Detailstudent.belongsTo(models.Subject);
    Detailstudent.belongsTo(models.Student);
  }
  return Detailstudent;
};
