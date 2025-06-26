const Task = require('../models/Tasks')

const TaskController = {
    async create (req, res) {
        try {
            const task = await Task.create({...req.body, completed: false})
            res.status(201).send(task)
        } catch(err){
        console.error(err)
        }
    },
    async getAll (req, res) {
        try {
            const tasks = await Task.find();
            res.json(tasks);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async updateByTitle (req, res) {
        try{
            const id = req.params._id
            const title = req.body.title
            const updateTitleTask = await Task.findByIdAndUpdate(id, {title})
            res.json(updateTitleTask)
        } catch(err) {
            console.error(err)
        }
    }
}

module.exports = TaskController