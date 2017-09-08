'use strict';
module.exports = function(sequelize, DataTypes) {
  var Card = sequelize.define('Card', {
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    deckId: {
     type: DataTypes.INTEGER,
     allowNull: true,
     references: {
       model: "Deck",
       key: "id"
     }
  }, {
    classMethods: {
      associate: function(models) {
        Card.belongsTo(models.Deck, {foreignKey: 'deckId'});
      }
    }
  });
  return Card;
};
