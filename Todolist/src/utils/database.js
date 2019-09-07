const Sequelize = require('sequelize');
const config = require('config');
const info=config.get('port');
const db={}

const sequelize = new Sequelize(
        info.name,
        info.user,
        info.password,{
        host: info.host,
        dialect: 'mysql',
        operatorsAliases: false,
        pool: {
            max: 300,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        define: {
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci',
            timestamps: false,
            freezeTableName: false
        },
        logging: false
    }
)
db.sequelize=sequelize;
db.Sequelize=Sequelize;

db.TodoModel = require('../models/todoModel.js')(sequelize, Sequelize);

module.exports=db;