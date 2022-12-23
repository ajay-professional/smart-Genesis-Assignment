const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const userSignUp = sequelize.define('userSignUp', {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = userSignUp;