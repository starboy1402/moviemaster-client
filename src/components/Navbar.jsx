import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

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
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `font-medium hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-gray-300'}`
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/movies"
                    className={({ isActive }) =>
                        `font-medium hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-gray-300'}`
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
                                `font-medium hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-gray-300'}`
                            }
                        >
                            My Collection
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/watchlist"
                            className={({ isActive }) =>
                                `font-medium hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-gray-300'}`
                            }
                        >
                            Watchlist
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/add-movie"
                            className={({ isActive }) =>
                                `font-medium hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-gray-300'}`
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
        <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral/95 backdrop-blur-md border-b border-white/10">
            <div className="max-w-[1920px] mx-auto px-8 md:px-16">
                <div className="navbar min-h-20 px-0">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-xl bg-neutral rounded-lg w-52 border border-white/20">
                                {navLinks}
                            </ul>
                        </div>
                        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                            <div className="text-3xl">🎬</div>
                            <span className="text-2xl md:text-3xl font-bold text-white">
                                Movie<span className="text-primary">Master</span>
                            </span>
                        </Link>
                    </div>

                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 gap-2">
                            {navLinks}
                        </ul>
                    </div>

                    <div className="navbar-end gap-4">
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
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-2xl bg-neutral rounded-lg w-64 border border-white/20">
                                    <li className="menu-title px-4 py-3">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-base font-bold text-white">{user.displayName || 'User'}</span>
                                            <span className="text-sm text-gray-300 font-normal">{user.email}</span>
                                        </div>
                                    </li>
                                    <div className="divider my-1"></div>
                                    <li>
                                        <Link to="/my-collection" className="text-white hover:text-primary hover:bg-white/10 px-4 py-3 text-base">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                            </svg>
                                            My Collection
                                        </Link>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout} className="text-error hover:bg-error/10 px-4 py-3 text-base font-medium">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="flex gap-3">
                                <Link to="/login" className="btn btn-ghost text-white normal-case font-semibold">
                                    Sign In
                                </Link>
                                <Link to="/register" className="btn btn-primary text-white normal-case font-semibold border-none">
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
