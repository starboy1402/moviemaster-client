import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState('light');

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const navLinks = (
    <>
      <li><NavLink to="/" className={({isActive}) => isActive ? 'text-blue-600 font-bold' : ''}>Home</NavLink></li>
      <li><NavLink to="/movies" className={({isActive}) => isActive ? 'text-blue-600 font-bold' : ''}>All Movies</NavLink></li>
      {user && (
        <>
          <li><NavLink to="/my-collection" className={({isActive}) => isActive ? 'text-blue-600 font-bold' : ''}>My Collection</NavLink></li>
          <li><NavLink to="/add-movie" className={({isActive}) => isActive ? 'text-blue-600 font-bold' : ''}>Add Movie</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <nav className="navbar bg-base-100 shadow-lg px-4 lg:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="text-xl lg:text-2xl font-bold text-blue-600">
          🎬 MovieMaster Pro
        </Link>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {navLinks}
        </ul>
      </div>
      
      <div className="navbar-end gap-2">
        <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.photoURL || 'https://i.ibb.co/2yCP06g/default-avatar.png'} alt={user.displayName} />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li className="menu-title">
                <span>{user.displayName || 'User'}</span>
              </li>
              <li><Link to="/my-collection">My Collection</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
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
