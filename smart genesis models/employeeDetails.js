const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const employeeDetails = sequelize.define('employeeDetails', {
    employee_firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    employee_lastName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    employee_email:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        },
        primaryKey: true
    },
    employee_post:{
        type: Sequelize.STRING,
        allowNull: false
    },
    employee_salary: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    manager_firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    manager_lastName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    manager_email:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    manager_salary: {
        type: Sequelize.INTEGER,
    },
});

module.exports = employeeDetails;