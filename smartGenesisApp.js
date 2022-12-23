const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const sequelize = require('./util/database');

const genesisRoutes = require('./smart genesis routes/empManagmentRoutes.js');
const employeeDetails = require('./smart genesis models/employeeDetails.js');
const employeeInOut = require('./smart genesis models/employeeInOut.js');
const leaveManagement = require('./smart genesis models/leaveManagement.js');
const signupData = require('./smart genesis models/signupData.js');

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(genesisRoutes);

employeeDetails.hasOne(leaveManagement);
leaveManagement.belongsTo(employeeDetails, { constraints: true, onDelete: 'CASCADE' });

employeeDetails.hasOne(employeeInOut);
employeeInOut.belongsTo(employeeDetails, { constraints: true, onDelete: 'CASCADE' });

employeeDetails.belongsTo(signupData, { constraints: true, onDelete: 'CASCADE' });
signupData.hasMany(employeeDetails);

sequelize.sync().then(result => {
    console.log(result);
    app.listen(5511);
}).catch(err => console.log(err));
