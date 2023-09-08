import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SessionCheck from './components/sessionCheck';
import LoggedCheck from './components/loggedCheck';
import Navigation from './components/navigation';

function EditTask() {
    const [formData, setFormData] = useState({
        user: '',
    });

    const [taskInfo, setTaskInfo] = useState(null);
    const [selectedTeam, setSelectedTeam] = useState('');
    const [members, setMembers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [selectedTeams, setSelectedTeams] = useState([]);
    const router = useRouter();

    // Local storage check
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const { taskTitle } = router.query;

            if (taskTitle) {
                // Fetch and display information about the selected task
                const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
                const selectedTask = allTasks.find((task) => task.title === taskTitle);
                setTaskInfo(selectedTask);

                // Fetch teams where the user (from sessionStorage) is a member
                const loggedInUser = sessionStorage.getItem('username');
                console.log("loggedInUser", loggedInUser)
                const allTeams = JSON.parse(localStorage.getItem('teams')) || [];
                console.log("allTeams", allTeams)
                setTeams(allTeams);
                const userTeams = allTeams.filter((team) => team.user === loggedInUser);
                console.log("userTeams", userTeams)
                setMembers(userTeams);
            }
        }
    }, [router.query]);

    // Handle input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle team selection
    const handleTeamSelect = (e) => {
        const selectedTeam = e.target.value;
        setSelectedTeam(selectedTeam);

        const selectedRows = teams.filter((team) => team.name === selectedTeam);
        setSelectedTeams(selectedRows)
    };

    const handleSubmit = () => {
        const { user } = formData;
    
        // Find the task with title === taskInfo.title
        const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = allTasks.map((task) => {
            if (task.title === taskInfo.title) {
                return {
                    ...task,
                    assignedTo: user, // Assign the user to the task
                };
            }
            return task;
        });
    
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        alert('User assigned to the task successfully.');
    };
    

    return (
        <>
            <LoggedCheck />
            <Navigation/>
            <h2>Edit Task</h2>
            <div>
                <label>Select Team for Assigning Member From:</label>
                <select onChange={handleTeamSelect}>
                    <option value="">Select Team</option>
                    {members.map((team, index) => (
                        <option key={index} value={team.name}>
                            {team.name}
                        </option>
                    ))}
                </select>
            </div>
            {selectedTeam && (
                <div>
                    <label>Select Member:</label>
                    <select name="user" onChange={handleInputChange}>
                        <option value="">Select Member</option>
                        {selectedTeams.map((member, index) => (
                            <option key={index} value={member.user}>
                                {member.user}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            <button onClick={handleSubmit}>Assign User</button>
        </>
    );
}

export default EditTask;
