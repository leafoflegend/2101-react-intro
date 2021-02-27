const { STRING, Model } = require('sequelize');
const db = require('../db');

class Square extends Model {}

Square.init({
    color: STRING,
}, { sequelize: db, name: 'squares' });

module.exports = Square;
