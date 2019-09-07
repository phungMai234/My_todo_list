const express = require('express');
const BodyParser = require('body-parser');
const db = require('./database');

const app = express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.use('/', require('../routers/todoRouter'));

db.sequelize.sync(
    //{ force: true }
)
    .then(() => {
        console.log("Connect database success");
        app.listen(8080, (err) => {
            if(!err){
                console.log("server is running on 8080");
            }
        });
    })
    .catch(err => {
        console.log(err.message);
        process.exit();
    });