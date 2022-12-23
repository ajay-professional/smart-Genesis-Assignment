const express = require('express');

const router = express.Router();

const controllerGenesis = require('../smart genesis controllers/controllerGenesis.js');

router.post('/userSignUp', controllerGenesis.addSignUpDetailsInDatabase);

router.post('/userLogIn', controllerGenesis.loginByUser);

router.get('/allEmployee', controllerGenesis.authenticateUser, controllerGenesis.displayAllEmployee);

router.get('/employee/:employeeId', controllerGenesis.displayEmployee);

router.post('/addEmployee', controllerGenesis.addEmployeeData);

router.delete('/removeEmployee/:employeeId', controllerGenesis.removeEmployee);

router.put('/updatePost/:employeeId', controllerGenesis.updatePost);

router.put('/updateSalary/:employeeId', controllerGenesis.updateSalary);

router.post('/leaveManagementIn', controllerGenesis.postLeaveManagement);

router.post('/employeeInOut', controllerGenesis.postEmployeeInOut);

router.get('/leaveManagementOut/:employeeId', controllerGenesis.getLeaveManagement);

router.get('/employeeInOut/:employeeId', controllerGenesis.getEmployeeInOut);

router.get('/singleQuery', controllerGenesis.getEmployeeFullName);

module.exports = router;