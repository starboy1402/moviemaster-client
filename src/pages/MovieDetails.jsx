import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        fetchMovieDetails();
        if (user) {
            checkFavoriteStatus();
        }
    }, [id, user]);

    const fetchMovieDetails = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/movies/${id}`);
            console.log('Movie data:', response.data);
            console.log('Poster URL:', response.data.posterUrl);
            console.log('Converted Image URL:', getImageUrl(response.data.posterUrl));
            setMovie(response.data);
        } catch (error) {
            console.error('Error fetching movie:', error);
            toast.error('Failed to load movie details');
        } finally {
            setLoading(false);
        }
    };

    const checkFavoriteStatus = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/movies/my-collection`, {
                params: { userEmail: user.email }
            });
            const favoriteIds = response.data.map(m => m._id);
            setIsFavorite(favoriteIds.includes(id));
        } catch (error) {
            console.error('Error checking favorite:', error);
        }
    };

    const handleAddToFavorites = async () => {
        if (!user) {
            toast.error('Please login to add to watchlist');
            navigate('/login');
            return;
        }

        try {
            await axios.post(`${API_URL}/api/movies/${id}/favorite`, {
                userEmail: user.email
            });
            setIsFavorite(true);
            toast.success('Added to your watchlist!');
        } catch (error) {
            console.error('Error adding to favorites:', error);
            toast.error('Failed to add to watchlist');
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this movie?')) return;

        try {
            await axios.delete(`${API_URL}/api/movies/${id}`);
            toast.success('Movie deleted successfully!');
            navigate('/movies');
        } catch (error) {
            console.error('Error deleting movie:', error);
            toast.error('Failed to delete movie');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-base-100 flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="min-h-screen bg-base-100 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-base-content mb-4">Movie Not Found</h2>
                    <Link to="/movies" className="btn btn-primary">
                        Back to Movies
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 transition-colors duration-300">
            {/* Backdrop */}
            <div
                className="relative h-[70vh] bg-cover bg-center bg-neutral"
                style={getImageUrl(movie.posterUrl) ? {
                    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.8) 70%, var(--tw-gradient-to, #000) 100%), url(${getImageUrl(movie.posterUrl)})`
                } : {}}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16 pb-12">
                    <div className="flex flex-col md:flex-row gap-8 items-end">
                        {/* Poster */}
                        {getImageUrl(movie.posterUrl) ? (
                            <img
                                src={getImageUrl(movie.posterUrl)}
                                alt={movie.title}
                                className="w-64 h-96 object-cover rounded-xl shadow-2xl border-4 border-base-100"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        ) : (
                            <div className="w-64 h-96 bg-base-200 rounded-xl shadow-2xl border-4 border-base-100 flex items-center justify-center">
                                <div className="text-center p-6">
                                    <svg className="w-20 h-20 mx-auto mb-4 text-base-content/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <p className="text-base-content/50 text-sm">No Image</p>
                                </div>
                            </div>
                        )}

                        {/* Info */}
                        <div className="flex-1 pb-4 text-white drop-shadow-md">
                            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                                {movie.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                <div className="badge badge-primary badge-lg gap-2 border-none">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    {movie.rating}/10
                                </div>
                                <span className="text-lg font-medium">{movie.releaseYear}</span>
                                <span className="text-lg font-medium">{movie.duration} min</span>
                                <span className="badge badge-outline badge-lg text-white border-white/50">
                                    {movie.genre}
                                </span>
                            </div>

                            <p className="text-lg mb-6 max-w-3xl leading-relaxed opacity-90">
                                {movie.plotSummary}
                            </p>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-3">
                                {!isFavorite ? (
                                    <button
                                        onClick={handleAddToFavorites}
                                        className="btn btn-primary gap-2 shadow-lg shadow-primary/30 border-none"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Add to Watchlist
                                    </button>
                                ) : (
                                    <button className="btn btn-success gap-2 text-white cursor-default">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        In Watchlist
                                    </button>
                                )}

                                {user && user.email === movie.addedBy && (
                                    <>
                                        <Link
                                            to={`/update-movie/${movie._id}`}
                                            className="btn bg-white/20 border-none hover:bg-white/30 text-white gap-2 backdrop-blur-sm"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Edit Movie
                                        </Link>
                                        <button
                                            onClick={handleDelete}
                                            className="btn bg-red-600/80 hover:bg-red-600 border-none text-white gap-2 backdrop-blur-sm"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Delete
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Details */}
            <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16 py-16">
                <div className="bg-base-200/50 backdrop-blur-sm rounded-3xl p-8 border border-base-content/5 shadow-xl">
                    <h2 className="text-3xl font-bold text-base-content mb-8">Movie Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <p className="text-base-content/60 text-sm mb-1 font-medium uppercase tracking-wide">Title</p>
                                <p className="text-base-content text-xl font-medium">{movie.title}</p>
                            </div>
                            <div>
                                <p className="text-base-content/60 text-sm mb-1 font-medium uppercase tracking-wide">Genre</p>
                                <p className="text-base-content text-xl font-medium">{movie.genre}</p>
                            </div>
                            <div>
                                <p className="text-base-content/60 text-sm mb-1 font-medium uppercase tracking-wide">Release Year</p>
                                <p className="text-base-content text-xl font-medium">{movie.releaseYear}</p>
                            </div>
                            <div>
                                <p className="text-base-content/60 text-sm mb-1 font-medium uppercase tracking-wide">Duration</p>
                                <p className="text-base-content text-xl font-medium">{movie.duration} minutes</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <p className="text-base-content/60 text-sm mb-1 font-medium uppercase tracking-wide">Rating</p>
                                <p className="text-base-content text-xl font-medium flex items-center gap-2">
                                    <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    {movie.rating}/10
                                </p>
                            </div>
                            <div>
                                <p className="text-base-content/60 text-sm mb-1 font-medium uppercase tracking-wide">Added By</p>
                                <p className="text-base-content text-xl font-medium">{movie.addedBy}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 pt-8 border-t border-base-content/10">
                        <p className="text-base-content/60 text-sm mb-3 font-medium uppercase tracking-wide">Summary</p>
                        <p className="text-base-content text-lg leading-relaxed max-w-4xl">{movie.plotSummary}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
