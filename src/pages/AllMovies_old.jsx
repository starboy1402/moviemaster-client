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
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-6xl font-bold text-primary mb-3">All Movies</h1>
                <p className="text-base-content opacity-70 text-lg">Browse our complete collection of {movies.length} movies</p>
            </div>

            {movies.length === 0 ? (
                <div className="text-center py-20">
                    <div className="text-8xl mb-6">🎬</div>
                    <p className="text-3xl font-bold mb-2">No movies found</p>
                    <p className="text-base-content opacity-70 mb-6">Be the first to add a movie to the collection!</p>
                    <Link to="/add-movie" className="btn btn-primary btn-lg gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add First Movie
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {movies.map((movie) => (
                        <div key={movie._id} className="card bg-base-100 shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-2 group overflow-hidden border border-base-300">
                            <figure className="h-80 relative overflow-hidden">
                                <img
                                    src={movie.posterUrl}
                                    alt={movie.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <Link
                                        to={`/movies/${movie._id}`}
                                        className="btn btn-primary btn-sm w-full gap-2"
                                    >
                                        View Details
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </figure>
                            <div className="card-body p-5">
                                <h2 className="card-title text-xl font-bold line-clamp-1">{movie.title}</h2>

                                <div className="space-y-3 mt-2">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="badge badge-accent gap-1 shadow font-bold">⭐ {movie.rating}</span>
                                        <span className="badge badge-primary badge-outline">{movie.genre}</span>
                                    </div>

                                    <div className="space-y-1 text-sm">
                                        <p className="flex items-center gap-2">
                                            <span className="font-semibold">📅 Year:</span>
                                            <span className="opacity-80">{movie.releaseYear}</span>
                                        </p>

                                        <p className="flex items-center gap-2">
                                            <span className="font-semibold">🎬 Director:</span>
                                            <span className="opacity-80 line-clamp-1">{movie.director}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllMovies;
