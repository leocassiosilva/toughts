const {DataTypes} = require('sequelize');

const db = require('../db/conn');

const User = require('./User');

const Tought = db.define('Tought', {
    title: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false,
    },
});

//Um usuario pode ter muitos pensamentos, mas um pensamento só pode pertencer a um usuario
Tought.belongsTo(User);
User.hasMany(Tought);

module.exports = Tought;