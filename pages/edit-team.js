import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SessionCheck from './components/sessionCheck';
import LoggedCheck from './components/loggedCheck';
import Navigation from './components/navigation';

function EditTeam() {
    const [formData, setFormData] = useState({
        user: '',
    });

    const [teamInfo, setTeamInfo] = useState(null);
    const [filteredTeams, setFilteredTeams] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    // Local storage check 
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const { teamName } = router.query;
            if (teamName) {
                // Fetch and display information about the selected team
                const allTeams = JSON.parse(localStorage.getItem('teams')) || [];
                const selectedTeam = allTeams.find((team) => team.name === teamName);
                setTeamInfo(selectedTeam);

                const filteredTeams = allTeams.filter((team) => team.name === teamName);
                setFilteredTeams(filteredTeams)

            }
        }
    }, [router.query]);

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        const { user } = formData;

        // Check if the username exists in localStorage users
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some((item) => item.username === user);

        if (!userExists) {
            alert('User does not exist.');
            return;
        }

        // Fetch all the rows where the name is teamInfo.name
        const allTeams = JSON.parse(localStorage.getItem('teams')) || [];
        const relatedRows = allTeams.filter((team) => team.name === teamInfo.name);

        console.log("relatedRows", relatedRows)

        // Check if any related row has the user already in members
        const userAlreadyInTeam = relatedRows.some((team) => team.user === user);

        if (userAlreadyInTeam) {
            alert('User already exists in the team.');
            return;
        }

        const newMember = {
            ...formData,
            name: teamInfo.name,
        };

        const teams = JSON.parse(localStorage.getItem('teams')) || [];
        teams.push(newMember);
        localStorage.setItem('teams', JSON.stringify(teams));
        alert('Member added successful!');

    };

    // Toggle modal visibility
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            <LoggedCheck />
            <Navigation />
            <div className='container'>
                <div className='box-container'>
                    <h2>Edit Team</h2>
                    <button onClick={toggleModal}>View all Members</button>
                    {teamInfo ? (
                        <div>
                            <h3>Team Name: {teamInfo.name}</h3>
                            <input
                                type="text"
                                name="user"
                                placeholder="Enter a user's username"
                                value={formData.user}
                                onChange={handleInputChange}
                                required
                            />
                            <button className='btn-primary' onClick={handleSubmit}>Add User</button>
                        </div>
                    ) : (
                        <p>Team not found or loading...</p>
                    )}
                </div>
            </div>
            {/* Modal */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={toggleModal}>&times;</span>
                        <h3>Team Members</h3>
                        {
                            filteredTeams.length > 0 ? (
                                <ol>
                                    {filteredTeams.map((team, index) => (
                                        <li key={index}>
                                            <strong>Member Username:</strong> {team.user}
                                        </li>
                                    ))}
                                </ol>
                            ) : (
                                <strong>
                                    <h1>No team member</h1>
                                </strong>
                            )
                        }

                    </div>
                </div>
            )}
        </>
    );
}

export default EditTeam;
