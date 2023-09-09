// eslint-disable-next-line no-unused-vars
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const TaskFrontEnd = () =>
{
    const [_id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duedate, setDuedate] = useState("");
    const [status, setStatus] = useState("");
    const [tasks, setTasks] = useState([]);

useEffect(() => {
    (async () => await Load())();
}, []);

async function Load() {
    const result = await axios.get("http://localhost:7000/task");
    setTasks(result.data);
    console.log(result);
}

async function save(event) {
    event.preventDefault();
    try {
    await axios.post("http://localhost:7000/task/create", {
        title: title,
        description: description,
        duedate: duedate,
        status: status
    });
    alert("Task Registation Successfully");
    setId("");
    setTitle("");
    setDescription("");
    setDuedate("");
    setStatus("");
    Load();
    } catch (err) {
        alert("User Registation Failed");
    }
}
async function editTasks(task) {
    setTitle(task.title);
    setDescription(task.description);
    setDuedate(task.duedate);
    setStatus(task.status);
    setId(task._id);
}

async function DeleteEmployee(_id) {
    try {
        await axios.delete("http://localhost:7000/task/" + _id);
        alert("Tarea eliminada exitosamente");
        Load();
    } catch (error) {
        console.error("Error al eliminar la tarea:", error);
        alert("Error al eliminar la tarea");
    }
}

async function update(event) {
    event.preventDefault();
    try {
        await axios.patch(
            "http://localhost:7000/task/" + _id,
            {
                title: title,
                description: description,
                duedate: duedate,
                status: status,
            }
        );
        alert("Task Updated");
        setId("");
        setTitle("");
        setDescription("");
        setDuedate("");
        setStatus("");
        Load();
    } catch (err) {
        alert(err);
    }
}

return (
    
    <div className="mt-8 p-5 border-2 cursor-pointer border-neutral-900 shadow-2xl">
    <div className="flex justify-between items-center w-full space-x-12">
    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-dark">Task System</h1>

    </div>


        <div className="flex justify-between items-center w-full space-x-12">
        <input type="text" className="w-1/2 border-2 borderzinc-800 py-2 pl-2" placeholder="Task Title"
        id="title"
        value={title}
        onChange={(event) => {
            setTitle(event.target.value);
        }}

        />

        <input type="text" className="w-1/2 border-2 borderzinc-800 py-2 pl-2" placeholder="Task Description"
        id="description"
        value={description}
        onChange={(event) => {
            setDescription(event.target.value);
        }}

        />
        </div>

        <div className="flex justify-between items-center w-full space-x-12">
        <input type="date" className="w-1/2 border-2 borderzinc-800 py-2 pl-2" placeholder="Due Date"
        id="duedate"
        value={duedate}
        onChange={(event) => {
            setDuedate(event.target.value);
        }}

        />



        <select id="status" className="w-1/2 border-2 borderzinc-800 py-2 pl-2"
        value={status}
        onChange={(e) => setStatus(parseInt(e.target.value))}>
            <option value="select">Select</option>
            <option value="1">Completed</option>
            <option value="2">Not Completed</option>
        </select>

        </div>
        
        <div className="mt-8 p-5 border-2 cursor-pointer border-neutral-900 shadow-2xl">


            <div className="flex justify-end items-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={save}>
                Save
            </button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={update}>
                Update
            </button>

            </div>

            </div>


            <div className="mt-8 p-5 border-2 cursor-pointer border-neutral-900 shadow-2xl">


    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Task name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Description
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
        {tasks.map(function fn(task) {
            return (
                // eslint-disable-next-line react/jsx-key
                <tbody>
                    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">

                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{task.title}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{task.description}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{task.duedate}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {task.status === 1 ? (
                            <span style={{ color:"green" ,fontWeight:"Bold"}}>Completed</span>
                        ) : (
                            <span style={{ color:"red", fontWeight:"Bold"}}>Not Completed</span>
                        )}
                    </td>



                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <button className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"


                            onClick={() => editTasks(task)}
                        >
                            Edit
                        </button>
                        <button className="bg-red-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        
                        onClick={() => DeleteEmployee(task._id)}
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
            );
        })}
    </table>
</div>
</div>
</div>

    )
}

export default TaskFrontEnd