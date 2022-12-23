const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const leaveManagement = sequelize.define('leaveManagement', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    leaves_allotted: {
        type: Sequelize.INTEGER
    },
    leaves_deducted: {
        type: Sequelize.INTEGER
    },
    leaves_left:{
        type: Sequelize.INTEGER
    }
});

module.exports = leaveManagement;