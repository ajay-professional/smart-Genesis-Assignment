const SignUp = require('../smart genesis Models/signupData.js');
const employeeDetails = require('../smart genesis models/employeeDetails.js');
const employeeInOut = require('../smart genesis Models/employeeInOut.js');
const leaveManagement = require('../smart genesis Models/leaveManagement.js');
let usermail;
// let myusername;
// let monthNam;
let dotenv = require('dotenv');
dotenv.config();
var jwt = require('jsonwebtoken');
const { QueryTypes } = require('sequelize');
const sequelize = require('../util/database');
exports.addSignUpDetailsInDatabase = (req, res) => {
    const { username, email, phone, password } = req.body;
    SignUp.create({
        username,
        email,
        phone,
        password
    }).then(() => {
        console.log('Added signup details to the database');
        res.json({
            status: "Successfully signed up"
        });
    }).catch(err => {
        console.log(err);
        console.log('Error in controller');
        res.json({
            status: "User already exists, Please Login"
        });
    });
};


exports.loginByUser = (req, res) => {
    const email2 = req.body.email2;
    const password2 = req.body.password2;
    SignUp.findByPk(email2).then((user) => {
        if (user.password == password2) {
            var token = jwt.sign({ username: user.username, email: user.email }, process.env.SECRET_KEY, {
                expiresIn: "2d"
            });
            res.status(200).json({ message: "Login Successful", success: true, userData: { username: user.username, email: user.email, phone: user.phone }, token });
        } else {
            console.log('passwords do not match');
            res.status(401).json({ success: false, message: 'passwords do not match' });
        }
    }).catch(err => {
        console.log(err);
        console.log('Error in controller login');
        res.status(404).json({ success: false, message: 'User does not exists signup first' });
    });
};

exports.addEmployeeData = (req, res) => {
    const { employee_firstName, employee_lastName, employee_email, employee_post, employee_salary, manager_firstName, manager_lastName, manager_email, manager_salary } = req.body;
    employeeDetails.create({
        employee_firstName,
        employee_lastName,
        employee_email,
        employee_post,
        employee_salary,
        manager_firstName,
        manager_lastName,
        manager_email,
        manager_salary
    }).then((respon) => {
        console.log(respon);
        res.json({
            status: "Successfully added employee details into the database."
        });
        console.log('Added employee details to the database');
    }).catch(err => {
        console.log(err);
        console.log('Error in adding employee data');
        res.status(500).json({ success: false, message: 'Error in adding employee data' });
    });
};

exports.authenticateUser = (req, res, next) => {

    try {
        const token = req.header('authorization');
        console.log(token);
        const userDet = jwt.verify(token, process.env.SECRET_KEY);
        console.log(JSON.stringify(userDet));
        // myusername = userDet.username;
        usermail = userDet.email;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ success: false, message: 'user canot be verified' });
    }
};

exports.displayAllEmployee = (req, res) => {
    employeeDetails.findAll({ where: { userSignUpEmail: usermail } }).then(allEmployee => {
        console.log(allEmployee);
        res.json(allEmployee);
    }).catch(err => {
        console.log(err);
        res.status(404).json({ success: false, message: 'Data does not exists' });
    });
};

exports.displayEmployee = (req, res) => {
    const employeeId = req.params.employeeId;
    employeeDetails.findOne({ where: { employee_email: employeeId } }).then(oneEmployee => {
        console.log(oneEmployee);
        res.json(oneEmployee);
    }).catch(err => {
        console.log(err);
        res.status(404).json({ success: false, message: 'Data does not exists' });
    });
};

exports.updatePost = (req, res, next) => {
    const employeeId = req.params.employeeId;
    const employee_post = req.body.employee_post;
    employeeDetails.findOne({ where: { employee_email: employeeId } }).then(oneEmployee => {
        oneEmployee.update({ employee_post: employee_post }).then(() => {
            res.status(201).json({ success: true, message: 'Successfully updated the new post' });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ success: false, message: 'Unable to update the new post' });
        });
        console.log(oneEmployee);
    }).catch(err => {
        console.log(err);
        res.status(404).json({ success: false, message: 'Data does not exists' });
    });
};

exports.updateSalary = (req, res, next) => {
    const employeeId = req.params.employeeId;
    const employee_salary = req.body.employee_salary;
    employeeDetails.findOne({ where: { employee_email: employeeId } }).then(oneEmployee => {
        oneEmployee.update({ employee_salary: employee_salary }).then(() => {
            res.status(201).json({ success: true, message: 'Successfully updated the new salary' });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ success: false, message: 'Unable to update the new salary' });
        });
        console.log(oneEmployee);
    }).catch(err => {
        console.log(err);
        res.status(404).json({ success: false, message: 'Data does not exists' });
    });
};

exports.postLeaveManagement = (req, res) => {
    const { leaves_allotted, leaves_deducted, leaves_left } = req.body;
    leaveManagement.create({
        leaves_allotted,
        leaves_deducted,
        leaves_left
    }).then((respon) => {
        console.log(respon);
        res.json({
            status: "Successfully added employee leave details into the database."
        });
        console.log('Added employee leave details to the database');
    }).catch(err => {
        console.log(err);
        console.log('Error in adding employee data');
        res.status(500).json({ success: false, message: 'Error in adding employee leaves data' });
    });
};

exports.getLeaveManagement = (req, res) => {
    const employeeId = req.params.employeeId;
    leaveManagement.findAll({ where: { id: employeeId } }).then(oneleaveManag => {
        console.log(oneleaveManag);
        res.json(oneleaveManag);
    }).catch(err => {
        console.log(err);
        res.status(404).json({ success: false, message: 'Data does not exists' });
    });
};

exports.getEmployeeInOut = (req, res) => {
    const employeeId = req.params.employeeId;
    employeeInOut.findOne({ where: { id: employeeId } }).then(empInOut => {
        console.log(empInOut);
        res.json(empInOut);
    }).catch(err => {
        console.log(err);
        res.status(404).json({ success: false, message: 'Data does not exists' });
    });
};

exports.postEmployeeInOut = (req, res) => {
    const { employeeIn, employeeOut } = req.body;
    employeeInOut.create({
        employeeIn,
        employeeOut
    }).then((respon) => {
        console.log(respon);
        res.json({
            status: "Successfully added employee in/out details into the database."
        });
        console.log('Added employee in/out details to the database');
    }).catch(err => {
        console.log(err);
        console.log('Error in adding employee data');
        res.status(500).json({ success: false, message: 'Error in adding employee in/out data' });
    });
};

exports.removeEmployee = (req, res, next) => {
    const employeeId = req.params.employeeId;
    employeeDetails.destroy({
        where: {
            employee_email: employeeId
        }
    }).then(() => {
        res.json({ success: true, message: 'employee data deleted' });
    }).catch(err => {
        console.log(err);
        res.status(404).json({ success: false, message: 'Data does not exists...unable to remove employee' });
    });
};

exports.getEmployeeFullName = async (req, res) => {
    const users = await sequelize.query("SELECT employee_firstName, employee_lastName, manager_firstName, manager_lastName, employee_salary, manager_salary FROM `employeeDetails` WHERE employee_lastName is NOT NULL", { type: QueryTypes.SELECT });
    res.status(200).json({ data: users });
};

