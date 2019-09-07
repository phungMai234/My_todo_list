module.exports=(sequelize, Sequelize)=>{
    const totdoModel = sequelize.define('todo', {
        id:{
          type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        task: {
            type: Sequelize.STRING
        }},
        {
            freezeTableName: true,
            timestamp: false
        });
    return totdoModel;
};