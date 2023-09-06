const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var taskSchema = new Schema(
    {
        title:{
            type: String,
            require: true
        },
        description:{
            type: String,
            require: true
        },
        duedate:{
            type: Date,
            require: false
        },
        status:{
            type:Boolean,
            default: false
        }
    }
)

const Task = mongoose.model("task", taskSchema);
module.exports = Task;