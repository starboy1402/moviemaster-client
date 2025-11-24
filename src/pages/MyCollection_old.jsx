import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const MyCollection = () => {
    const { user } = useAuth();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        if (user) {
            fetchMyMovies();
        }
    }, [user]);

    const fetchMyMovies = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/movies/user/${user.email}`);
            setMovies(response.data);
        } catch (error) {
            console.error('Error fetching movies:', error);
            toast.error('Failed to load your movies');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/movies/${id}`);
            setMovies(movies.filter(movie => movie._id !== id));
            toast.success('Movie deleted successfully!');
        } catch (error) {
            console.error('Error deleting movie:', error);
            toast.error('Failed to delete movie');
        }
        setDeleteId(null);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
                <div>
                    <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">My Collection</h1>
                    <p className="text-base-content opacity-70 text-lg">You have added {movies.length} movie{movies.length !== 1 ? 's' : ''}</p>
                </div>
                <Link to="/add-movie" className="btn btn-primary btn-lg gap-2 shadow-xl hover:scale-105 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Movie
                </Link>
            </div>

            {movies.length === 0 ? (
                <div className="text-center py-20">
                    <div className="text-9xl mb-6">📚</div>
                    <p className="text-3xl font-bold mb-3">Your collection is empty</p>
                    <p className="text-base-content opacity-70 mb-8 text-lg">Start building your movie library today!</p>
                    <Link to="/add-movie" className="btn btn-primary btn-lg gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Your First Movie
                    </Link>
                </div>
            ) : (
                <div className="overflow-x-auto shadow-2xl rounded-xl">
                    <table className="table table-zebra">
                        <thead className="bg-gradient-to-r from-primary to-secondary text-primary-content">
                            <tr>
                                <th className="text-base">Poster</th>
                                <th className="text-base">Title</th>
                                <th className="text-base">Genre</th>
                                <th className="text-base">Year</th>
                                <th className="text-base">Rating</th>
                                <th className="text-base">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movies.map((movie) => (
                                <tr key={movie._id} className="hover:bg-base-200 transition-colors">
                                    <td>
                                        <div className="avatar">
                                            <div className="w-20 h-28 rounded-lg shadow-lg ring ring-base-300 ring-offset-2">
                                                <img src={movie.posterUrl} alt={movie.title} className="object-cover" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-bold text-lg">{movie.title}</div>
                                        <div className="text-sm opacity-70 flex items-center gap-1"><span>🎬</span>{movie.director}</div>
                                    </td>
                                    <td>
                                        <span className="badge badge-primary badge-lg">{movie.genre}</span>
                                    </td>
                                    <td>
                                        <span className="font-semibold text-base">{movie.releaseYear}</span>
                                    </td>
                                    <td>
                                        <span className="badge badge-warning badge-lg gap-1 shadow">⭐ {movie.rating}</span>
                                    </td>
                                    <td>
                                        <div className="flex gap-2">
                                            <Link
                                                to={`/movies/${movie._id}`}
                                                className="btn btn-sm btn-info gap-1 hover:scale-105 transition-transform"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                View
                                            </Link>
                                            <Link
                                                to={`/update-movie/${movie._id}`}
                                                className="btn btn-sm btn-warning gap-1 hover:scale-105 transition-transform"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => setDeleteId(movie._id)}
                                                className="btn btn-sm btn-error gap-1 hover:scale-105 transition-transform"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteId && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-md">
                        <h3 className="font-bold text-2xl mb-4">⚠️ Confirm Delete</h3>
                        <p className="py-4 text-lg">Are you sure you want to delete this movie? This action cannot be undone.</p>
                        <div className="modal-action">
                            <button onClick={() => setDeleteId(null)} className="btn btn-outline btn-lg">Cancel</button>
                            <button onClick={() => handleDelete(deleteId)} className="btn btn-error btn-lg gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyCollection;
