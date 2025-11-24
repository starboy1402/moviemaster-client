import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Home = () => {
    const [featuredMovies, setFeaturedMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [recentMovies, setRecentMovies] = useState([]);
    const [stats, setStats] = useState({ totalMovies: 0, totalUsers: 0 });
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        fetchHomeData();
    }, []);

    useEffect(() => {
        if (featuredMovies.length > 0) {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [featuredMovies]);

    const fetchHomeData = async () => {
        try {
            const [moviesRes, topRatedRes, recentRes] = await Promise.all([
                axios.get(`${API_URL}/api/movies`),
                axios.get(`${API_URL}/api/movies/top-rated`),
                axios.get(`${API_URL}/api/movies/recent`)
            ]);

            setFeaturedMovies(moviesRes.data.slice(0, 5));
            setTopRatedMovies(topRatedRes.data);
            setRecentMovies(recentRes.data);
            setStats({
                totalMovies: moviesRes.data.length,
                totalUsers: 150
            });
        } catch (error) {
            console.error('Error fetching home data:', error);
            toast.error('Failed to load data');
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
        <div className="min-h-screen bg-neutral">
            {/* Hero Section */}
            <div className="relative h-[90vh] overflow-hidden -mt-20">
                {featuredMovies.map((movie, index) => (
                    <div
                        key={movie._id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <div className="relative h-full">
                            <img
                                src={movie.posterUrl}
                                alt={movie.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                            <div className="absolute bottom-0 left-0 right-0 pb-32 pt-20 px-8 md:px-16">
                                <div className="max-w-7xl mx-auto">
                                    <div className="max-w-3xl space-y-6">
                                        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                                            {movie.title}
                                        </h1>
                                        <div className="flex items-center gap-4 text-sm md:text-base">
                                            <span className="px-3 py-1 bg-accent text-black font-bold rounded">
                                                ⭐ {movie.rating}
                                            </span>
                                            <span className="text-gray-300">{movie.releaseYear}</span>
                                            <span className="text-gray-300">{movie.genre}</span>
                                            <span className="text-gray-300">{movie.duration} min</span>
                                        </div>
                                        <p className="text-lg md:text-xl text-gray-300 line-clamp-3 leading-relaxed">
                                            {movie.plotSummary}
                                        </p>
                                        <div className="flex gap-4 pt-4">
                                            <Link
                                                to={`/movies/${movie._id}`}
                                                className="btn btn-primary btn-lg border-none text-white font-bold px-10 normal-case hover:bg-primary/80 transition-all"
                                            >
                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                                </svg>
                                                Play Now
                                            </Link>
                                            <Link
                                                to={`/movies/${movie._id}`}
                                                className="btn btn-lg bg-white/20 backdrop-blur-md text-white border-white/40 hover:bg-white/30 px-10 normal-case"
                                            >
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                More Info
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Carousel Indicators */}
                <div className="absolute bottom-8 right-8 flex gap-2">
                    {featuredMovies.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-1 transition-all ${index === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-white/50 hover:bg-white/80'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-[1920px] mx-auto px-8 md:px-16 -mt-24 relative z-10">
                {/* Top Rated Movies */}
                <section className="mb-16">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">Top Rated on MovieMaster</h2>
                        <Link to="/movies" className="text-primary hover:text-primary/80 font-semibold flex items-center gap-2">
                            Explore All
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {topRatedMovies.map((movie, index) => (
                            <Link
                                key={movie._id}
                                to={`/movies/${movie._id}`}
                                className="group relative aspect-[2/3] overflow-hidden rounded-lg bg-base-200 hover:scale-105 transition-transform duration-300"
                            >
                                <img
                                    src={movie.posterUrl}
                                    alt={movie.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="absolute bottom-0 p-4 space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-0.5 bg-accent text-black text-xs font-bold rounded">
                                                #{index + 1}
                                            </span>
                                            <span className="px-2 py-0.5 bg-white/20 text-white text-xs font-semibold rounded">
                                                ⭐ {movie.rating}
                                            </span>
                                        </div>
                                        <h3 className="text-white font-bold text-sm line-clamp-2">{movie.title}</h3>
                                        <p className="text-gray-300 text-xs">{movie.releaseYear}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Recently Added */}
                <section className="mb-16">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">New Arrivals</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {recentMovies.map((movie) => (
                            <Link
                                key={movie._id}
                                to={`/movies/${movie._id}`}
                                className="group bg-neutral/50 border border-white/10 rounded-lg overflow-hidden hover:bg-neutral/70 hover:border-primary/30 transition-all flex"
                            >
                                <div className="w-32 sm:w-40 flex-shrink-0">
                                    <img
                                        src={movie.posterUrl}
                                        alt={movie.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-4 flex flex-col justify-between flex-1">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-2 py-0.5 bg-success text-white text-xs font-bold rounded">NEW</span>
                                            <span className="px-2 py-0.5 bg-accent text-black text-xs font-bold rounded">⭐ {movie.rating}</span>
                                        </div>
                                        <h3 className="text-white font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                                            {movie.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm line-clamp-2 mb-3">{movie.plotSummary}</p>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-gray-400">
                                        <span>{movie.releaseYear}</span>
                                        <span>•</span>
                                        <span>{movie.genre}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Stats Section */}
                <section className="mb-16 py-12 bg-neutral/50 rounded-2xl px-8 border border-white/10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stats.totalMovies}+</div>
                            <div className="text-gray-300 text-sm font-medium uppercase tracking-wide">Movies</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">8.5</div>
                            <div className="text-gray-300 text-sm font-medium uppercase tracking-wide">Avg Rating</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-success mb-2">{stats.totalUsers}+</div>
                            <div className="text-gray-300 text-sm font-medium uppercase tracking-wide">Users</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-info mb-2">24/7</div>
                            <div className="text-gray-300 text-sm font-medium uppercase tracking-wide">Access</div>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section className="mb-20 py-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Your Personal <span className="text-primary">Movie Library</span>
                    </h2>
                    <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-12">
                        Organize, discover, and track your favorite movies all in one place.
                        Join thousands of movie enthusiasts managing their collections effortlessly.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="bg-neutral/50 p-8 rounded-xl hover:bg-neutral/70 transition-all border border-white/10">
                            <div className="text-5xl mb-4">📚</div>
                            <h3 className="text-xl font-bold text-white mb-3">Organize</h3>
                            <p className="text-gray-300">
                                Keep your movie collection organized and easily accessible
                            </p>
                        </div>
                        <div className="bg-neutral/50 p-8 rounded-xl hover:bg-neutral/70 transition-all border border-white/10">
                            <div className="text-5xl mb-4">🔍</div>
                            <h3 className="text-xl font-bold text-white mb-3">Discover</h3>
                            <p className="text-gray-300">
                                Find new favorites based on ratings and genres
                            </p>
                        </div>
                        <div className="bg-neutral/50 p-8 rounded-xl hover:bg-neutral/70 transition-all border border-white/10">
                            <div className="text-5xl mb-4">⭐</div>
                            <h3 className="text-xl font-bold text-white mb-3">Rate & Share</h3>
                            <p className="text-gray-300">
                                Share your opinions and see what others think
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
