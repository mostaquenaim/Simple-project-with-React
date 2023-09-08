import React, { useState } from 'react';
import LoggedCheck from './components/loggedCheck';
import Navigation from './components/navigation';

function CreateTeam() {


    // initialization
    const [formData, setFormData] = useState({
        name: '',
        user: '',
    });

    //   handle inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleTeamCreation = () => {
        // Check if the team name already exists
        const existingTeams = JSON.parse(localStorage.getItem('teams')) || [];
        const teamNameExists = existingTeams.some((team) => team.name === formData.name);

        if (teamNameExists) {
            alert('Team name already exists.');
            return;
        }

        // Check if field is filled
        if (!formData.name) {
            alert('Name is required.');
            return;
        }

        const team = {
            ...formData,
            user: sessionStorage.getItem('username'),
        };

        const teams = [...existingTeams, team];
        localStorage.setItem('teams', JSON.stringify(teams));
        alert('Team added successfully!');
    };



    return (
        <div>
            <LoggedCheck />
            <Navigation />
            <div className='container'>
                <div className='box-container'>

                    <h2>Create Team</h2>
                    <input
                        type="text"
                        name="name"
                        placeholder="Team name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                    <button className='btn-primary' onClick={handleTeamCreation}>Create</button>
                </div>
            </div>
        </div>
    );
}

export default CreateTeam;

