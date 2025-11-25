import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Helper function to get actual image URL from Unsplash page URL
const getImageUrl = (url) => {
    if (!url) return null;

    // If it's already a direct image URL, return it
    if (url.includes('images.unsplash.com') || url.includes('.jpg') || url.includes('.png') || url.includes('.jpeg')) {
        return url;
    }

    // If it's an Unsplash photo page URL, extract the photo ID and create proper image URL
    if (url.includes('unsplash.com/photos/')) {
        // Extract the last part after the last hyphen which is the photo ID
        const parts = url.split('/photos/')[1];
        if (parts) {
            // Get the last segment after splitting by '-'
            const segments = parts.split('-');
            const photoId = segments[segments.length - 1];
            if (photoId) {
                // Use Unsplash source URL which is more reliable
                return `https://source.unsplash.com/${photoId}/800x1200`;
            }
        }
    }

    // Return original URL if no conversion needed
    return url;
};

const Watchlist = () => {
    const { user } = useAuth();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchWatchlist();
        }
    }, [user]);

    const fetchWatchlist = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/movies/my-collection`, {
                params: { userEmail: user.email }
            });
            setMovies(response.data);
        } catch (error) {
            console.error('Error fetching watchlist:', error);
            toast.error('Failed to load watchlist');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFromWatchlist = async (movieId) => {
        try {
            await axios.delete(`${API_URL}/api/movies/${movieId}/favorite`, {
                data: { userEmail: user.email }
            });
            setMovies(movies.filter(movie => movie._id !== movieId));
            toast.success('Removed from watchlist!');
        } catch (error) {
            console.error('Error removing from watchlist:', error);
            toast.error('Failed to remove from watchlist');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-base-100">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 pt-24 pb-16">
            <div className="max-w-[1920px] mx-auto px-8 md:px-16">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-5xl md:text-6xl font-bold text-base-content mb-4">My Watchlist</h1>
                        <p className="text-base-content/70 text-lg">
                            You have <span className="text-primary font-semibold">{movies.length}</span> movie{movies.length !== 1 ? 's' : ''} in your watchlist
                        </p>
                    </div>
                    <Link to="/movies" className="btn btn-primary btn-lg gap-2 shadow-lg shadow-primary/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Browse Movies
                    </Link>
                </div>

                {movies.length === 0 ? (
                    <div className="text-center py-20 bg-base-200/50 backdrop-blur-sm rounded-2xl border border-base-content/10">
                        <div className="text-8xl mb-6">🎬</div>
                        <h2 className="text-3xl font-bold text-base-content mb-4">Your watchlist is empty</h2>
                        <p className="text-base-content/70 mb-8 text-lg">Start adding movies you want to watch!</p>
                        <Link to="/movies" className="btn btn-primary btn-lg gap-2 shadow-lg shadow-primary/20">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Browse Movies
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                        {movies.map((movie) => (
                            <div key={movie._id} className="group relative">
                                <div className="bg-base-200/50 backdrop-blur-sm rounded-xl overflow-hidden border border-base-content/10 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
                                    {/* Poster */}
                                    <div className="relative aspect-[2/3] overflow-hidden">
                                        <img
                                            src={getImageUrl(movie.posterUrl)}
                                            alt={movie.title}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-base-300/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                        {/* Remove Button - Shows on hover */}
                                        <button
                                            onClick={() => handleRemoveFromWatchlist(movie._id)}
                                            className="absolute top-2 right-2 btn btn-circle btn-sm bg-error/90 hover:bg-error border-none text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            title="Remove from watchlist"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Info */}
                                    <div className="p-4">
                                        <h3 className="text-base-content font-bold text-base mb-2 line-clamp-2 min-h-[3rem]">
                                            {movie.title}
                                        </h3>

                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-1">
                                                <svg className="w-4 h-4 text-warning" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span className="text-base-content font-semibold text-sm">{movie.rating}</span>
                                            </div>
                                            <span className="text-base-content/60 text-xs">{movie.releaseYear}</span>
                                        </div>

                                        <div className="mb-3">
                                            <span className="badge badge-sm badge-primary/20 text-primary border-primary/30">
                                                {movie.genre}
                                            </span>
                                        </div>

                                        <Link
                                            to={`/movies/${movie._id}`}
                                            className="btn btn-primary btn-sm w-full gap-2"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Watchlist;
