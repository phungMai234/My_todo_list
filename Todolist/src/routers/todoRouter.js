const router = require('express').Router();
const Todo = require('../controllers/todoController');

router.post('/add', (req, res, next) => {console.log("oki"); next()}, Todo.addNew);
router.put('/edit/:id', Todo.editTask);
router.get('/todo/:id', Todo.getTask);
router.get('/todolist', Todo.getAllTask);
router.delete('/delete/:id', Todo.del);

module.exports=router;