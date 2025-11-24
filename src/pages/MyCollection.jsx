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
            <div className="flex justify-center items-center min-h-screen bg-neutral">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral pt-24 pb-16">
            <div className="max-w-[1920px] mx-auto px-8 md:px-16">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">My Collection</h1>
                        <p className="text-gray-400 text-lg">
                            You have added <span className="text-primary font-semibold">{movies.length}</span> movie{movies.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                    <Link to="/add-movie" className="btn btn-primary btn-lg gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Movie
                    </Link>
                </div>

                {movies.length === 0 ? (
                    <div className="text-center py-20 bg-neutral/50 rounded-2xl border border-white/10">
                        <div className="text-8xl mb-6">📚</div>
                        <h2 className="text-3xl font-bold text-white mb-4">Your collection is empty</h2>
                        <p className="text-gray-400 mb-8 text-lg">Start building your movie library today!</p>
                        <Link to="/add-movie" className="btn btn-primary btn-lg gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Your First Movie
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {movies.map((movie) => (
                            <div key={movie._id} className="bg-neutral/50 rounded-xl p-6 border border-white/10 hover:border-primary/30 transition-all group">
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Poster */}
                                    <Link to={`/movies/${movie._id}`} className="flex-shrink-0">
                                        <div className="w-32 h-48 rounded-lg overflow-hidden border border-white/20 group-hover:border-primary/50 transition-colors">
                                            <img
                                                src={movie.posterUrl}
                                                alt={movie.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    </Link>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <Link to={`/movies/${movie._id}`}>
                                            <h3 className="text-2xl font-bold text-white mb-2 hover:text-primary transition-colors">
                                                {movie.title}
                                            </h3>
                                        </Link>

                                        <div className="flex flex-wrap gap-3 mb-4">
                                            <div className="flex items-center gap-2 bg-accent/20 text-accent px-3 py-1 rounded-lg border border-accent/30">
                                                <span>⭐</span>
                                                <span className="font-bold">{movie.rating}</span>
                                            </div>
                                            <div className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-lg font-medium">
                                                {movie.genre}
                                            </div>
                                            <div className="px-3 py-1 bg-white/10 text-white border border-white/20 rounded-lg">
                                                {movie.releaseYear}
                                            </div>
                                            <div className="px-3 py-1 bg-white/10 text-white border border-white/20 rounded-lg">
                                                {movie.duration} min
                                            </div>
                                        </div>

                                        <div className="text-gray-400 mb-4">
                                            <div className="mb-1">
                                                <span className="text-gray-500">Director:</span> <span className="text-white">{movie.director}</span>
                                            </div>
                                            {movie.plotSummary && (
                                                <p className="line-clamp-2">{movie.plotSummary}</p>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-wrap gap-3">
                                            <Link
                                                to={`/movies/${movie._id}`}
                                                className="btn btn-sm bg-white/10 border-white/20 hover:bg-white/20 text-white gap-2"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                View Details
                                            </Link>
                                            <Link
                                                to={`/update-movie/${movie._id}`}
                                                className="btn btn-sm bg-white/10 border-white/20 hover:bg-white/20 text-white gap-2"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => setDeleteId(movie._id)}
                                                className="btn btn-sm btn-error gap-2"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {deleteId && (
                    <div className="modal modal-open">
                        <div className="modal-box bg-neutral border border-white/10">
                            <h3 className="font-bold text-2xl mb-4 text-white">⚠️ Confirm Delete</h3>
                            <p className="py-4 text-lg text-gray-300">
                                Are you sure you want to delete this movie? This action cannot be undone.
                            </p>
                            <div className="modal-action">
                                <button
                                    onClick={() => setDeleteId(null)}
                                    className="btn bg-white/10 border-white/20 hover:bg-white/20 text-white"
                                >
                                    Cancel
                                </button>
                                <button onClick={() => handleDelete(deleteId)} className="btn btn-error gap-2">
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
        </div>
    );
};

export default MyCollection;
