const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
    try {
        const task = await Task.find({});
        res.status(200).json({tasks: task});
    } catch (error) {
        res.status(500).json({msg : error});
    }
}

const getTask = async (req, res) =>{
    res.send("Single task will be displayed here");
}

const createTask = async (req, res) =>{
    res.send("New task created!");
}

const deleteTask = async (req, res) => {
    res.send("Task deleted");
}

const updateTask = async (req, res) =>{
    res.send("Task updated");
}


module.exports = {
    getAllTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
}