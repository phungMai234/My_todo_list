
const db = require('../utils/database');


async function addNew(req, res){
    const {task} = req.body;
    try{
        console.log(task);
        if(!task)
            return res.json({success: false});
        const newTask = {
            task:task
        };
        const data=await db.TodoModel.create(newTask);
        return res.json(data)
    }
    catch (e) {
        return res.json(e.message);
    }
}
async function getTask(req, res){
    const {id} = req.params;
    try{
        const data = await db.TodoModel.findOne({where:{id:id}})
        return res.json(data);
    }
    catch (e) {
        return res.json(e.message);
    }
}
async function getAllTask(req, res){
    try{

        const data = await db.TodoModel.findAll();
        return res.json(data);
    }
    catch (e) {
        return res.json(e.message);
    }
}
async function editTask(req, res) {
    const {id} = req.params;
    const {task} = req.body;
    try{

        const user = db.TodoModel.findOne({where:{id}});
        if(!user || !task)
            return res.json('404');
        const data = await db.TodoModel.update(
            {
                task:task
            },
            {
                where:{
                    id:id
                }
            });

        return res.json(data);
    }
    catch (e) {
        res.json(e.message);
    }

}
async function del(req, res) {
    const {id} = req.params;
    try{
        const user = db.TodoModel.findOne({where:{id:id}});
        if(!user)
            return res.json('404');
        await db.TodoModel.destroy({where: {id:id}});
        return res.json('success');
    }
    catch (e) {
        return res.json(e.message);
    }

}
module.exports={
    addNew,
    editTask,
    getTask,
    getAllTask,
    del
}