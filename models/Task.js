const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Must provide a name!"],
        maxLength: [20, "Character count exceeded"],
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Task', TaskSchema);