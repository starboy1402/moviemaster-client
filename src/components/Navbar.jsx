import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

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
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `font-medium transition-colors ${isActive ? 'text-primary font-bold' : 'text-base-content/80 hover:text-primary'}`
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/movies"
                    className={({ isActive }) =>
                        `font-medium transition-colors ${isActive ? 'text-primary font-bold' : 'text-base-content/80 hover:text-primary'}`
                    }
                >
                    Movies
                </NavLink>
            </li>
            {user && (
                <>
                    <li>
                        <NavLink
                            to="/my-collection"
                            className={({ isActive }) =>
                                `font-medium transition-colors ${isActive ? 'text-primary font-bold' : 'text-base-content/80 hover:text-primary'}`
                            }
                        >
                            My Collection
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/watchlist"
                            className={({ isActive }) =>
                                `font-medium transition-colors ${isActive ? 'text-primary font-bold' : 'text-base-content/80 hover:text-primary'}`
                            }
                        >
                            Watchlist
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/add-movie"
                            className={({ isActive }) =>
                                `font-medium transition-colors ${isActive ? 'text-primary font-bold' : 'text-base-content/80 hover:text-primary'}`
                            }
                        >
                            Add Movie
                        </NavLink>
                    </li>
                </>
            )}
        </>
    );

    return (
        <nav className="sticky top-0 z-50 bg-base-100/95 backdrop-blur-md border-b border-base-content/10 shadow-sm transition-colors duration-300">
            <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
                <div className="navbar min-h-[4rem] px-0">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden text-base-content">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-xl bg-base-100 rounded-lg w-52 border border-base-content/10">
                                {navLinks}
                            </ul>
                        </div>
                        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                            <span className="text-3xl">🎬</span>
                            <span className="text-2xl font-bold text-base-content tracking-tight">
                                Movie<span className="text-primary">Master</span>
                            </span>
                        </Link>
                    </div>

                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 gap-6 text-base">
                            {navLinks}
                        </ul>
                    </div>

                    <div className="navbar-end gap-3">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="btn btn-ghost btn-circle text-xl text-base-content hover:bg-base-content/10"
                            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        >
                            {theme === 'dark' ? '☀️' : '🌙'}
                        </button>

                        {user ? (
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                                    <div className="w-10 rounded-full">
                                        <img
                                            src={user.photoURL || 'https://i.ibb.co/2yCP06g/default-avatar.png'}
                                            alt={user.displayName}
                                        />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-2xl bg-base-100 rounded-lg w-64 border border-base-content/10">
                                    <li className="menu-title px-4 py-3">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-base font-bold text-base-content">{user.displayName || 'User'}</span>
                                            <span className="text-sm text-base-content/60 font-normal">{user.email}</span>
                                        </div>
                                    </li>
                                    <div className="divider my-1"></div>
                                    <li>
                                        <Link to="/my-collection" className="text-base-content hover:text-primary hover:bg-base-content/5 px-4 py-3 text-base">
                                            My Collection
                                        </Link>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout} className="text-error hover:bg-error/10 px-4 py-3 text-base font-medium">
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="flex gap-3">
                                <Link to="/login" className="btn btn-ghost text-base-content hover:bg-base-content/10 normal-case font-semibold">
                                    Sign In
                                </Link>
                                <Link to="/register" className="btn btn-primary text-white normal-case font-semibold border-none shadow-lg shadow-primary/30 hover:shadow-primary/50">
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
