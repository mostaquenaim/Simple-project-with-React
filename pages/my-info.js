import React, { useState, useEffect } from 'react';
import SessionCheck from './components/sessionCheck';
import LoggedCheck from './components/loggedCheck';
import { useRouter } from 'next/router';
import Navigation from './components/navigation';

function MyInfo() {
    const router = useRouter();

    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if window is defined (client-side) before using localStorage
        if (typeof window !== 'undefined') {

            const loggedUser = sessionStorage.getItem('username');

            const allUsers = JSON.parse(localStorage.getItem('users')) || [];
            const myInfo = allUsers.find((user) => user.username === loggedUser);
            setUser(myInfo);
        }
    }, []);

    return (
        <>
            <LoggedCheck />
            <Navigation />
            {user ? (
                <div>
                    <h2>My Information</h2>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Password:</strong> {user.password}</p>
                    <p><strong>Bio:</strong> {user.bio}</p>
                </div>
            ) : (
                <p>Loading user information...</p>
            )}
        </>
    );
}

export default MyInfo;
