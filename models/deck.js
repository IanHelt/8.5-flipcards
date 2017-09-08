'use strict';
module.exports = function(sequelize, DataTypes) {
  var Deck = sequelize.define('Deck', {
    name: DataTypes.STRING,
    userId: {
     type: DataTypes.INTEGER,
     allowNull: true,
     references: {
       model: "Users",
       key: "id"
     }
  }
});
      Deck.associate = (models) => {
        Deck.belongsTo(models.User, {foreignKey: 'userId'});
        Deck.hasMany(models.Card, {foreignKey: 'deckId'});
  };
  return Deck;
};
