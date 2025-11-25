import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AllMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [minRating, setMinRating] = useState('');
    const [maxRating, setMaxRating] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const genres = ['Action', 'Drama', 'Comedy', 'Sci-Fi', 'Thriller', 'Romance', 'Horror', 'Adventure', 'Fantasy', 'Animation'];

    useEffect(() => {
        fetchMovies();
    }, [selectedGenres, minRating, maxRating]);

    const fetchMovies = async () => {
        try {
            const params = {};
            if (selectedGenres.length > 0) params.genres = selectedGenres.join(',');
            if (minRating) params.minRating = minRating;
            if (maxRating) params.maxRating = maxRating;

            const response = await axios.get(`${API_URL}/api/movies`, { params });
            setMovies(response.data);
        } catch (error) {
            console.error('Error fetching movies:', error);
            toast.error('Failed to load movies');
        } finally {
            setLoading(false);
        }
    };

    const handleGenreToggle = (genre) => {
        setSelectedGenres(prev =>
            prev.includes(genre)
                ? prev.filter(g => g !== genre)
                : [...prev, genre]
        );
    };

    const clearFilters = () => {
        setSelectedGenres([]);
        setMinRating('');
        setMaxRating('');
        setSearchTerm('');
    };

    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-base-100">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 pt-8 pb-16 transition-colors duration-300">
            <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
                {/* Header & Filters */}
                <div className="flex flex-col xl:flex-row gap-8 mb-12">
                    <div className="flex-shrink-0">
                        <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
                            Explore Movies
                        </h1>
                        <p className="text-base-content/60 text-lg">
                            Discover your next favorite from our collection of <span className="text-primary font-bold">{movies.length}</span> titles
                        </p>
                    </div>

                    {/* Filter Panel */}
                    <div className="flex-grow bg-base-200/50 rounded-2xl p-6 border border-base-content/5 backdrop-blur-sm">
                        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">

                            {/* Search */}
                            <div className="w-full lg:w-64">
                                <label className="input input-bordered flex items-center gap-2 bg-base-100 border-base-content/10 focus-within:border-primary/50">
                                    <input
                                        type="text"
                                        className="grow"
                                        placeholder="Search title..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                                </label>
                            </div>

                            {/* Genres */}
                            <div className="flex-grow">
                                <div className="flex flex-wrap gap-2">
                                    {genres.map(genre => (
                                        <button
                                            key={genre}
                                            onClick={() => handleGenreToggle(genre)}
                                            className={`btn btn-sm rounded-full border-none transition-all ${selectedGenres.includes(genre)
                                                    ? 'bg-primary text-white hover:bg-primary/90'
                                                    : 'bg-base-100 text-base-content/70 hover:bg-base-300'
                                                }`}
                                        >
                                            {genre}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Rating & Clear */}
                            <div className="flex flex-col sm:flex-row gap-4 items-center w-full lg:w-auto">
                                <div className="flex items-center gap-2 bg-base-100 p-2 rounded-lg border border-base-content/10">
                                    <span className="text-xs font-bold text-base-content/50 uppercase">Rating</span>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        className="input input-xs w-12 text-center bg-transparent focus:outline-none"
                                        min="0" max="10"
                                        value={minRating}
                                        onChange={(e) => setMinRating(e.target.value)}
                                    />
                                    <span className="text-base-content/30">-</span>
                                    <input
                                        type="number"
                                        placeholder="10"
                                        className="input input-xs w-12 text-center bg-transparent focus:outline-none"
                                        min="0" max="10"
                                        value={maxRating}
                                        onChange={(e) => setMaxRating(e.target.value)}
                                    />
                                </div>

                                {(selectedGenres.length > 0 || minRating || maxRating || searchTerm) && (
                                    <button
                                        onClick={clearFilters}
                                        className="btn btn-ghost btn-sm text-error hover:bg-error/10"
                                    >
                                        Clear All
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {filteredMovies.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-base-200/30 rounded-3xl border border-base-content/5 text-center">
                        <div className="text-8xl mb-6 opacity-50">🔍</div>
                        <h2 className="text-3xl font-bold text-base-content mb-2">No movies found</h2>
                        <p className="text-base-content/60 mb-8 max-w-md">
                            We couldn't find any movies matching your current filters. Try adjusting them or add a new movie.
                        </p>
                        <Link to="/add-movie" className="btn btn-primary btn-lg gap-2 shadow-lg shadow-primary/20">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add New Movie
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 md:gap-8">
                        {filteredMovies.map((movie) => (
                            <Link
                                key={movie._id}
                                to={`/movies/${movie._id}`}
                                className="group relative bg-base-200 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2"
                            >
                                {/* Poster Container */}
                                <div className="aspect-[2/3] overflow-hidden relative">
                                    <img
                                        src={movie.posterUrl}
                                        alt={movie.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/400x600?text=No+Poster';
                                        }}
                                    />

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-base-300 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                                    {/* Rating Badge */}
                                    <div className="absolute top-3 right-3 bg-base-100/90 backdrop-blur-md px-2 py-1 rounded-lg shadow-sm flex items-center gap-1 border border-base-content/5">
                                        <span className="text-accent text-sm">⭐</span>
                                        <span className="text-base-content font-bold text-xs">{movie.rating}</span>
                                    </div>

                                    {/* Hover Action */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                        <span className="btn btn-primary btn-sm rounded-full px-6 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            View Details
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <h3 className="text-base-content font-bold text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                                        {movie.title}
                                    </h3>
                                    <div className="flex items-center justify-between text-xs text-base-content/60 font-medium">
                                        <span>{movie.releaseYear}</span>
                                        <span className="px-2 py-0.5 bg-base-300 rounded-full text-base-content/80">
                                            {movie.genre}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllMovies;
