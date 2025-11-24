import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const MovieDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        fetchMovieDetails();
    }, [id]);

    const fetchMovieDetails = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/movies/${id}`);
            setMovie(response.data);
        } catch (error) {
            console.error('Error fetching movie details:', error);
            toast.error('Failed to load movie details');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${API_URL}/api/movies/${id}`);
            toast.success('Movie deleted successfully!');
            navigate('/movies');
        } catch (error) {
            console.error('Error deleting movie:', error);
            toast.error('Failed to delete movie');
        }
        setShowDeleteModal(false);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="text-center py-16">
                <p className="text-2xl text-gray-500">Movie not found</p>
                <Link to="/movies" className="btn btn-primary mt-4">Back to Movies</Link>
            </div>
        );
    }

    const isOwner = user && user.email === movie.addedBy;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="card lg:card-side bg-base-100 shadow-2xl overflow-hidden border border-base-300">
                <figure className="lg:w-2/5 relative group">
                    <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-full h-full object-cover min-h-[600px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </figure>

                <div className="card-body lg:w-3/5 p-8">
                    <h1 className="text-5xl font-bold mb-2 text-primary">{movie.title}</h1>

                    <div className="flex flex-wrap gap-3 mb-6">
                        <span className="badge badge-lg badge-accent gap-1 shadow-lg font-bold">⭐ {movie.rating}</span>
                        <span className="badge badge-lg badge-primary shadow-lg">{movie.genre}</span>
                        <span className="badge badge-lg badge-secondary shadow-lg">{movie.releaseYear}</span>
                        <span className="badge badge-lg badge-outline">🕐 {movie.duration} min</span>
                    </div>

                    <div className="space-y-4 mb-6">
                        <div className="p-4 bg-base-200 rounded-lg">
                            <p className="flex items-center gap-2">
                                <span className="text-2xl">🎬</span>
                                <strong className="text-lg">Director:</strong>
                                <span className="opacity-80">{movie.director}</span>
                            </p>
                        </div>

                        <div className="p-4 bg-base-200 rounded-lg">
                            <p className="flex items-center gap-2">
                                <span className="text-2xl">🎭</span>
                                <strong className="text-lg">Cast:</strong>
                                <span className="opacity-80">{movie.cast}</span>
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-base-200 rounded-lg">
                                <p className="flex items-center gap-2">
                                    <span className="text-2xl">🗣️</span>
                                    <strong>Language:</strong>
                                    <span className="opacity-80">{movie.language}</span>
                                </p>
                            </div>

                            <div className="p-4 bg-base-200 rounded-lg">
                                <p className="flex items-center gap-2">
                                    <span className="text-2xl">🌍</span>
                                    <strong>Country:</strong>
                                    <span className="opacity-80">{movie.country}</span>
                                </p>
                            </div>
                        </div>

                        <div className="p-6 bg-gradient-to-br from-base-200 to-base-300 rounded-xl">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-2xl">📖</span>
                                <strong className="text-xl">Plot Summary</strong>
                            </div>
                            <p className="leading-relaxed opacity-90">{movie.plotSummary}</p>
                        </div>

                        <div className="text-sm opacity-70 flex items-center gap-2">
                            <span className="text-lg">👤</span>
                            <strong>Added by:</strong> {movie.addedBy}
                        </div>
                    </div>

                    {isOwner && (
                        <div className="card-actions justify-end mt-8 gap-3">
                            <Link
                                to={`/update-movie/${movie._id}`}
                                className="btn btn-warning btn-lg gap-2 shadow-xl hover:scale-105 transition-transform"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit Movie
                            </Link>
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="btn btn-error btn-lg gap-2 shadow-xl hover:scale-105 transition-transform"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete Movie
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-md">
                        <h3 className="font-bold text-2xl mb-4">⚠️ Confirm Delete</h3>
                        <p className="py-4 text-lg">Are you sure you want to delete <strong>"{movie.title}"</strong>? This action cannot be undone.</p>
                        <div className="modal-action">
                            <button onClick={() => setShowDeleteModal(false)} className="btn btn-outline">Cancel</button>
                            <button onClick={handleDelete} className="btn btn-error gap-2">
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

export default MovieDetails;
