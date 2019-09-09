const express = require('express');
const BodyParser = require('body-parser');
const db = require('./database');
const cors = require('cors');
//const morgan = require("morgan");


const app = express();
app.use(cors());
//app.use(morgan('tiny'));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));

app.use('/api', require('../routers/todoRouter'));

db.sequelize.sync(
    { force: false }
)
    .then(() => {
        console.log("Connect database success");
        app.listen(8080);
    })
    .catch(err => {
        console.log(err.message);
        process.exit();
    });