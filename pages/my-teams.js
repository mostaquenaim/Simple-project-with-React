import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SessionCheck from './components/sessionCheck';
import LoggedCheck from './components/loggedCheck';
import Link from 'next/link';
import Navigation from './components/navigation';

function MyTeams() {
    const [userTeams, setUserTeams] = useState([]);
    const [loggedInUsername, setLoggedInUsername] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Check if window is defined (client-side) before using localStorage
        if (typeof window !== 'undefined') {

            const user = sessionStorage.getItem('username');
            setLoggedInUsername(user);

            const allTeams = JSON.parse(localStorage.getItem('teams')) || [];
            console.log("allTeams", allTeams)
            const teamsForUser = allTeams.filter((team) => team.user === loggedInUsername);
            setUserTeams(teamsForUser);
        }
    }, [loggedInUsername]);

    const handleTeamClick = (teamName) => {
        router.push(`/edit-team?teamName=${teamName}`);
    };

    return (
        <>
            <LoggedCheck />
            <Navigation/>
            <h2>Teams for {loggedInUsername}</h2>
            {userTeams.length > 0 ? (
            <ul className='teams-list'>
                {userTeams.map((team, index) => (
                    <li key={index}>
                        <button className='btn-primary'  onClick={() => handleTeamClick(team.name)}>
                            {team.name}
                        </button>
                    </li>
                ))}
            </ul>
            ):(
                <h1><strong>No Team to show</strong></h1>
            )
}
        </>
    );
}

export default MyTeams;
