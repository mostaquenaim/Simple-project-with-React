import React, { useState, useEffect } from 'react';
import SessionCheck from './components/sessionCheck';
import LoggedCheck from './components/loggedCheck';
import { useRouter } from 'next/router';
import Navigation from './components/navigation';

function AssignedTasks() {
    const router = useRouter();

    const [userTasks, setUserTasks] = useState([]);
    const [loggedInUsername, setLoggedInUsername] = useState(null);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortCriteria, setSortCriteria] = useState('priority'); // 'priority', 'dueDate'
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc', 'desc'

    useEffect(() => {
        // Check if window is defined (client-side) before using localStorage
        if (typeof window !== 'undefined') {

            const user = sessionStorage.getItem('username');
            setLoggedInUsername(user);

            const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const tasksForUser = allTasks.filter((task) => task.assignedTo === loggedInUsername);
            setUserTasks(tasksForUser);

            console.log(tasksForUser)
        }
    }, [loggedInUsername]);

    useEffect(() => {
        // Apply filtering based on the selected status
        let filtered = [...userTasks];

        if (filterStatus === 'completed') {
            filtered = filtered.filter((task) => task.isCompleted);
        } else if (filterStatus === 'notCompleted') {
            filtered = filtered.filter((task) => !task.isCompleted);
        }

        // Apply sorting based on the selected criteria
        if (sortCriteria === 'priority') {
            const priorityValues = {
                'high': 3,
                'medium': 2,
                'low': 1
            };

            filtered.sort((a, b) => {
                const order = sortOrder === 'asc' ? 1 : -1;
                return order * (priorityValues[b.priority] - priorityValues[a.priority]);
            });
        } else if (sortCriteria === 'dueDate') {
            filtered.sort((a, b) => {
                const order = sortOrder === 'asc' ? 1 : -1;
                return order * (new Date(a.dueDate) - new Date(b.dueDate));
            });
        }

        // Update the filtered tasks
        setFilteredTasks(filtered);
    }, [filterStatus, sortCriteria, userTasks, sortOrder]);


    const handleMarking = (taskTitle) => {

        // Find the task with matching title
        const updatedTasks = userTasks.map((task) => {
            if (task.title === taskTitle) {
                return {
                    ...task,
                    isCompleted: true,
                };
            }
            return task;
        });

        localStorage.setItem('tasks', JSON.stringify(updatedTasks));

        setUserTasks(updatedTasks);
    };


    return (
        <>
            <LoggedCheck />
            <Navigation />
            <h2>Tasks for {loggedInUsername}</h2>
            <div>
                <label>Filter by Status:</label>
                <select onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="notCompleted">Not Completed</option>
                </select>
            </div>
            <div>
                <label>Sort by:</label>
                <select onChange={(e) => setSortCriteria(e.target.value)}>
                    <option value="priority">Priority</option>
                    <option value="dueDate">Due Date</option>
                </select>
                <button className='btn-primary' onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                    {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                </button>
            </div>
            {filteredTasks.length > 0 ? (
                <table border="1">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Due Date</th>
                            <th>Priority</th>
                            <th>Created By</th>
                            <th>Assigned to</th>
                            <th>Completed?</th>

                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasks.map((task, index) => (
                            <tr key={index}>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{task.dueDate}</td>
                                <td>{task.priority}</td>
                                <td>{task.createdBy}</td>
                                <td>{task.assignedTo}</td>
                                <td>{task.isCompleted ? "yes" :
                                    <button className='btn-primary' onClick={() => handleMarking(task.title)}>Mark as completed</button>
                                }</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            )
                :
                (
                    <h1><strong>No data to show</strong></h1>
                )
            }
        </>
    );
}

export default AssignedTasks;
