import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { useState } from 'react';

const Navbar = () => {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            toast.success('Logged out successfully!');
        } catch (error) {
            toast.error('Failed to logout');
        }
    };

    const navLinks = (
        <>
            <li><NavLink to="/" className={({ isActive }) => isActive ? 'text-primary font-bold' : ''}>Home</NavLink></li>
            <li><NavLink to="/movies" className={({ isActive }) => isActive ? 'text-primary font-bold' : ''}>All Movies</NavLink></li>
            {user && (
                <>
                    <li><NavLink to="/my-collection" className={({ isActive }) => isActive ? 'text-primary font-bold' : ''}>My Collection</NavLink></li>
                    <li><NavLink to="/add-movie" className={({ isActive }) => isActive ? 'text-primary font-bold' : ''}>Add Movie</NavLink></li>
                </>
            )}
        </>
    );

    return (
        <nav className="navbar bg-base-100 shadow-xl px-4 lg:px-8 sticky top-0 z-50 backdrop-blur-lg bg-opacity-95">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <Link to="/" className="text-xl lg:text-3xl font-bold text-primary hover:scale-105 transition-transform">
                    🎬 MovieMaster Pro
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-1 text-base font-semibold">
                    {navLinks}
                </ul>
            </div>

            <div className="navbar-end gap-3">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar ring ring-primary ring-offset-base-100 ring-offset-2 hover:ring-secondary transition-all">
                            <div className="w-10 lg:w-12 rounded-full">
                                <img src={user.photoURL || 'https://i.ibb.co/2yCP06g/default-avatar.png'} alt={user.displayName} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-box w-60">
                            <li className="menu-title">
                                <span className="text-base font-bold">{user.displayName || 'User'}</span>
                                <span className="text-xs opacity-70">{user.email}</span>
                            </li>
                            <li><Link to="/my-collection" className="gap-2"><span>📚</span> My Collection</Link></li>
                            <li><button onClick={handleLogout} className="gap-2 text-error"><span>🚪</span> Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <>
                        <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
                        <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
