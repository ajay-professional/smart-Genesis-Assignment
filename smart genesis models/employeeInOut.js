const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const employeeInOut = sequelize.define('employeeInOut', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    employeeIn: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    employeeOut: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    }
});

module.exports = employeeInOut;