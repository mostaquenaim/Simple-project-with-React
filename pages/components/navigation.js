import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
    const router = useRouter();

    const handleLogout = () => {

        //logout
          sessionStorage.removeItem('username');
          router.push('/login');
    
      };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link href='/dashboard'>
                <Image src="/OIP.jpeg" alt="Logo" width={50} height={50} />
                </Link>
            </div>
            <ul className="navbar-links">
                <li>
                    <Link href="/all-tasks">All Tasks</Link>
                </li>
                <li>
                    <Link href="/assigned-tasks">Assigned Tasks</Link>
                </li>
                <li>
                    <Link href="/create-team">Create Team</Link>
                </li>
                <li>
                    <Link href="/create-task">Create Task</Link>
                </li>
                <li>
                    <Link href="/manage-teams">Manage Teams</Link>
                </li>
                <li>
                    <Link href="/manage-tasks">Manage Tasks</Link>
                </li>
            </ul>
            <div>
                <button className='btn-logout' onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
}
