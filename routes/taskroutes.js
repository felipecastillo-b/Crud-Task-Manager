const express = require("express");
const router = express.Router();

var taskModel = require("../src/task/taskModel");

//Add records

router.post("/task/create", async(req,res)=>{
    try{
        const task = new taskModel(req.body);
        await task.validate();
        await task.save();
        res.status(201).send({
            status: true,
            message: "Task Created"
        })
    }
    catch(error)
    {
        res.status(400).send(error)
    }
});

//get routes
router.get("/task",async(req,res)=>{
    try{
        const task = await taskModel.find({});
        res.send(task);
    }
    catch(error)
    {
        res.send(400).send(error);
    }
});

//update task
router.patch("/task/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        const body = req.body;

        const updatetasks = await taskModel.findByIdAndUpdate(_id,body,{new:true});

        if(!updatetasks){
            return res.status(404).send();
        }
        else{
            res.status(201).send({
                status:true,
                message:"Task Updated"
            });
        }
    }
    catch(error)
    {
        res.send(400).send(error);
    }
});

//delete task
router.put("/task/:id",async(req,res)=>{
    try{
        const _id = req.params.id;

        const deletetasks = await taskModel.findByIdAndDelete(_id);

        if(!deletetasks){
            return res.status(404).send();
        }
        else{
            res.status(201).send({
                status:true,
                message:"Task Deleted"
            });
        }
    }
    catch(error)
    {
        res.send(400).send(error);
    }
});

module.exports = router;