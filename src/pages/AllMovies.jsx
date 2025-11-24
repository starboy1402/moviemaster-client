import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AllMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/movies`);
            setMovies(response.data);
        } catch (error) {
            console.error('Error fetching movies:', error);
            toast.error('Failed to load movies');
        } finally {
            setLoading(false);
        }
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
                <div className="mb-12">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">All Movies</h1>
                    <p className="text-gray-400 text-lg">
                        Browse our complete collection of <span className="text-primary font-semibold">{movies.length}</span> movies
                    </p>
                </div>

                {movies.length === 0 ? (
                    <div className="text-center py-20 bg-neutral/50 rounded-2xl border border-white/10">
                        <div className="text-8xl mb-6">🎬</div>
                        <h2 className="text-3xl font-bold text-white mb-4">No movies found</h2>
                        <p className="text-gray-400 mb-8 text-lg">Be the first to add a movie to the collection!</p>
                        <Link to="/add-movie" className="btn btn-primary btn-lg gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add First Movie
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                        {movies.map((movie) => (
                            <div key={movie._id} className="group">
                                <Link to={`/movies/${movie._id}`}>
                                    <div className="relative overflow-hidden rounded-lg bg-neutral/50 border border-white/10 hover:border-primary/50 transition-all duration-300">
                                        {/* Poster */}
                                        <div className="aspect-[2/3] overflow-hidden">
                                            <img
                                                src={movie.posterUrl}
                                                alt={movie.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                    <p className="text-white text-sm line-clamp-3 mb-3">{movie.summary || 'No summary available'}</p>
                                                    <button className="btn btn-primary btn-sm w-full gap-2">
                                                        View Details
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Rating Badge */}
                                        <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
                                            <span className="text-accent text-lg">⭐</span>
                                            <span className="text-white font-bold text-sm">{movie.rating}</span>
                                        </div>
                                    </div>

                                    {/* Movie Info */}
                                    <div className="mt-3 px-1">
                                        <h3 className="text-white font-semibold text-base line-clamp-1 group-hover:text-primary transition-colors">
                                            {movie.title}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                                            <span>{movie.releaseYear}</span>
                                            <span>•</span>
                                            <span className="line-clamp-1">{movie.genre}</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllMovies;
