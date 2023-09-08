import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SessionCheck from './components/sessionCheck';
import LoggedCheck from './components/loggedCheck';
import Navigation from './components/navigation';

function ShowTasks() {

    const [teamInfo, setTeamInfo] = useState(null);
    const router = useRouter();

    // local storage check 
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const { teamName } = router.query;
            if (teamName) {
                // Fetch and display information about the selected team
                const allTeams = JSON.parse(localStorage.getItem('teams')) || [];
                const selectedTeam = allTeams.find((team) => team.name === teamName);
                setTeamInfo(selectedTeam);

                const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
                

            }
        }
    }, [router.query]);

    
    return (
        <>
            <LoggedCheck />
            <Navigation/>
            <h2>Edit Team</h2>
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
                    <button className='btn-primary'  onClick={handleSubmit}>Add User</button>
                </div>
            ) : (
                <p>Team not found or loading...</p>
            )}
        </>
    );
}

export default ShowTasks;
