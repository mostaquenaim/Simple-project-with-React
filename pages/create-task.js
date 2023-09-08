import React, { useState } from 'react';
import SessionCheck from './components/sessionCheck';
import LoggedCheck from './components/loggedCheck';
import Navigation from './components/navigation';

function CreateTask() {

    // initialization
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: '',
        createdBy: '',
        assignedTo: '',
        isCompleted: false,
    });

    //   handle inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        const { title } = formData;
    
        // Check if the title already exists in localStorage tasks
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskExists = tasks.some((task) => task.title === title);
    
        if (taskExists) {
            alert('Task with the same title already exists.');
            return;
        }
    
        // Check if all fields are filled
        if (!title || !formData.description || !formData.dueDate || !formData.priority) {
            alert('All fields are required.');
            return;
        }
    
        const task = {
            ...formData,
            createdBy: sessionStorage.getItem('username'),
            assignedTo: "none",
            isCompleted: false,
        };
    
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        alert('Task added successfully!');
    };
    

    return (
        <>
            <LoggedCheck />
            <Navigation/>
            <div className='container'>
                <h2>Create a new Task</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                />
                <br></br>
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                />
                <br></br>
                <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    required
                />
                <br></br>
                <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    required
                >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                </select>
                <br></br>

                <button type="submit">Create Task</button>
            </form>
            </div>
        </>
    );
}

export default CreateTask;
