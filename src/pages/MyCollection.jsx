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
            <div className="flex justify-center items-center min-h-screen bg-base-100">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 pt-24 pb-16 transition-colors duration-300">
            <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-4">My Collection</h1>
                        <p className="text-base-content/60 text-lg">
                            You have added <span className="text-primary font-semibold">{movies.length}</span> movie{movies.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                    <Link to="/add-movie" className="btn btn-primary btn-lg gap-2 shadow-lg shadow-primary/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Movie
                    </Link>
                </div>

                {movies.length === 0 ? (
                    <div className="text-center py-20 bg-base-200/50 backdrop-blur-sm rounded-3xl border border-base-content/10">
                        <div className="text-8xl mb-6">📚</div>
                        <h2 className="text-3xl font-bold text-base-content mb-4">Your collection is empty</h2>
                        <p className="text-base-content/60 mb-8 text-lg">Start building your movie library today!</p>
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
                            <div key={movie._id} className="bg-base-200/50 backdrop-blur-sm rounded-2xl p-6 border border-base-content/10 hover:border-primary/30 transition-all group shadow-sm hover:shadow-md">
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Poster */}
                                    <Link to={`/movies/${movie._id}`} className="flex-shrink-0">
                                        <div className="w-32 h-48 rounded-xl overflow-hidden border border-base-content/10 group-hover:border-primary/50 transition-colors shadow-lg">
                                            <img
                                                src={movie.posterUrl}
                                                alt={movie.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    </Link>

                                    {/* Info */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex flex-wrap justify-between items-start gap-4 mb-2">
                                                <Link to={`/movies/${movie._id}`} className="hover:text-primary transition-colors">
                                                    <h3 className="text-2xl font-bold text-base-content">{movie.title}</h3>
                                                </Link>
                                                <div className="badge badge-primary badge-lg gap-1">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    {movie.rating}
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-3 mb-4 text-sm">
                                                <span className="badge badge-outline text-base-content/70">{movie.genre}</span>
                                                <span className="text-base-content/60">{movie.releaseYear}</span>
                                                <span className="text-base-content/60">{movie.duration} min</span>
                                            </div>

                                            <p className="text-base-content/70 line-clamp-2 mb-4 max-w-3xl">
                                                {movie.plotSummary}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap gap-3 mt-auto">
                                            <Link
                                                to={`/update-movie/${movie._id}`}
                                                className="btn btn-sm btn-outline gap-2 text-base-content hover:bg-base-content hover:text-base-100"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => setDeleteId(movie._id)}
                                                className="btn btn-sm btn-error btn-outline gap-2"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            </div>

            {/* Delete Confirmation Modal */}
            {deleteId && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-base-200 rounded-2xl p-8 max-w-md w-full border border-base-content/10 shadow-2xl transform scale-100 transition-all">
                        <h3 className="text-2xl font-bold text-base-content mb-4">Delete Movie?</h3>
                        <p className="text-base-content/60 mb-8">
                            Are you sure you want to delete this movie? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="btn btn-ghost text-base-content"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(deleteId)}
                                className="btn btn-error text-white"
                            >
                                Delete Movie
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyCollection;
