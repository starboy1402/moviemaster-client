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
                totalUsers: 150 // Mock data - replace with real API
            });
        } catch (error) {
            console.error('Error fetching home data:', error);
            toast.error('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const genres = [
        { name: 'Action', icon: '💥', color: 'bg-red-500' },
        { name: 'Drama', icon: '🎭', color: 'bg-purple-500' },
        { name: 'Comedy', icon: '😂', color: 'bg-yellow-500' },
        { name: 'Sci-Fi', icon: '🚀', color: 'bg-blue-500' },
        { name: 'Horror', icon: '👻', color: 'bg-gray-800' },
        { name: 'Romance', icon: '💕', color: 'bg-pink-500' }
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Hero Carousel Section */}
            <div className="relative h-[500px] md:h-[700px] overflow-hidden shadow-2xl">
                {featuredMovies.map((movie, index) => (
                    <div
                        key={movie._id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <div
                            className="hero min-h-full bg-cover bg-center"
                            style={{
                                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.4)), url(${movie.posterUrl})`
                            }}
                        >
                            <div className="hero-content text-left text-white max-w-7xl w-full px-6">
                                <div className="max-w-2xl">
                                    <h1 className="mb-5 text-5xl md:text-7xl font-bold drop-shadow-lg animate-fade-in">
                                        {movie.title}
                                    </h1>
                                    <p className="mb-5 text-lg md:text-xl leading-relaxed line-clamp-3 drop-shadow-md">
                                        {movie.plotSummary}
                                    </p>
                                    <div className="flex gap-3 flex-wrap mb-6">
                                        <span className="badge badge-accent badge-lg gap-2 shadow-lg font-bold">
                                            ⭐ {movie.rating}
                                        </span>
                                        <span className="badge badge-primary badge-lg shadow-lg font-bold">{movie.genre}</span>
                                        <span className="badge badge-outline badge-lg shadow-lg text-white font-bold">{movie.releaseYear}</span>
                                        <span className="badge badge-ghost badge-lg shadow-lg">🎬 {movie.duration} min</span>
                                    </div>
                                    <Link to={`/movies/${movie._id}`} className="btn btn-primary btn-lg shadow-2xl hover:scale-105 transition-transform gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Play Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Carousel Navigation */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {featuredMovies.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-primary' : 'bg-white bg-opacity-50'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Statistics Section */}
            <div className="stats stats-vertical lg:stats-horizontal shadow-2xl w-full bg-base-200 border border-base-300">
                <div className="stat place-items-center">
                    <div className="stat-figure text-4xl">🎬</div>
                    <div className="stat-title text-base-content opacity-70">Total Movies</div>
                    <div className="stat-value text-5xl text-primary">{stats.totalMovies}</div>
                    <div className="stat-desc text-base-content opacity-60 font-semibold">In our collection</div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-figure text-4xl">👥</div>
                    <div className="stat-title text-base-content opacity-70">Total Users</div>
                    <div className="stat-value text-5xl text-primary">{stats.totalUsers}+</div>
                    <div className="stat-desc text-base-content opacity-60 font-semibold">Active community members</div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-figure text-4xl">⭐</div>
                    <div className="stat-title text-base-content opacity-70">Average Rating</div>
                    <div className="stat-value text-5xl text-accent">8.5</div>
                    <div className="stat-desc text-base-content opacity-60 font-semibold">Quality content</div>
                </div>
            </div>

            {/* Top Rated Movies Section */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-5xl font-bold text-primary">Top Rated Movies</h2>
                        <p className="text-base-content opacity-70 mt-2">Highest rated films in our collection</p>
                    </div>
                    <Link to="/movies" className="btn btn-outline btn-primary gap-2 hover:scale-105 transition-transform">
                        View All
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {topRatedMovies.map((movie, index) => (
                        <div key={movie._id} className="card bg-base-100 shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-2 group overflow-hidden border border-base-300">
                            <figure className="h-72 relative overflow-hidden">
                                <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                <div className="absolute top-3 left-3 bg-primary text-white font-bold px-3 py-1 rounded-lg shadow-lg">
                                    #{index + 1}
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <Link to={`/movies/${movie._id}`} className="btn btn-primary btn-sm w-full">
                                        View Details →
                                    </Link>
                                </div>
                            </figure>
                            <div className="card-body p-4">
                                <h3 className="card-title text-base font-bold line-clamp-1">{movie.title}</h3>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="badge badge-accent gap-1 shadow font-bold">⭐ {movie.rating}</span>
                                    <span className="font-semibold opacity-70">{movie.releaseYear}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Recently Added Section */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="mb-10">
                    <h2 className="text-5xl font-bold text-primary mb-2">Recently Added</h2>
                    <p className="text-base-content opacity-70">Fresh picks just added to our collection</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recentMovies.map((movie) => (
                        <div key={movie._id} className="card lg:card-side bg-base-100 shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden group border border-base-300">
                            <figure className="lg:w-2/5 relative overflow-hidden">
                                <img src={movie.posterUrl} alt={movie.title} className="w-full h-56 lg:h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            </figure>
                            <div className="card-body lg:w-3/5 p-5 relative">
                                <div className="absolute top-3 right-3 badge badge-success gap-1 shadow-lg font-bold">
                                    🆕 New
                                </div>
                                <h3 className="card-title text-lg font-bold">{movie.title}</h3>
                                <p className="text-sm opacity-80 line-clamp-2 flex-grow">{movie.plotSummary}</p>
                                <div className="flex gap-2 flex-wrap mt-2">
                                    <span className="badge badge-outline badge-primary">{movie.genre}</span>
                                    <span className="badge badge-accent font-bold">⭐ {movie.rating}</span>
                                    <span className="badge badge-outline">{movie.releaseYear}</span>
                                </div>
                                <div className="card-actions justify-end mt-3">
                                    <Link to={`/movies/${movie._id}`} className="btn btn-primary btn-sm gap-2 hover:scale-105 transition-transform">
                                        View Details
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Genre Section */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="mb-10">
                    <h2 className="text-5xl font-bold text-primary mb-2">Browse by Genre</h2>
                    <p className="text-base-content opacity-70">Explore movies from your favorite categories</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {genres.map((genre) => (
                        <div key={genre.name} className={`${genre.color} rounded-2xl p-8 text-white text-center cursor-pointer transform transition-all duration-300 hover:scale-110 hover:shadow-2xl group border-2 border-transparent hover:border-white/20`}>
                            <div className="text-5xl mb-3 group-hover:scale-125 transition-transform">{genre.icon}</div>
                            <h3 className="font-bold text-lg">{genre.name}</h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* About Platform Section */}
            <section className="max-w-7xl mx-auto px-4 py-20 bg-gradient-to-br from-neutral via-base-100 to-base-200 text-white rounded-3xl mb-16 shadow-2xl relative overflow-hidden border border-primary/20">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-primary opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>
                
                <div className="text-center max-w-4xl mx-auto relative z-10">
                    <h2 className="text-6xl font-bold mb-6 drop-shadow-lg">About <span className="text-primary">MovieMaster Pro</span></h2>
                    <p className="text-xl mb-4 leading-relaxed opacity-90">
                        MovieMaster Pro is your ultimate companion for managing and discovering movies.
                        Whether you're a casual viewer or a cinema enthusiast, our platform helps you
                        organize your favorite films, discover new releases, and keep track of what to watch next.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        <div className="bg-base-100/40 backdrop-blur-sm rounded-2xl p-8 hover:bg-primary/20 transition-all duration-300 hover:scale-105 shadow-xl border border-white/10">
                            <div className="text-5xl mb-4">📚</div>
                            <h3 className="font-bold text-2xl mb-3">Organize</h3>
                            <p className="text-base leading-relaxed">Manage your personal movie collection effortlessly</p>
                        </div>
                        <div className="bg-base-100/40 backdrop-blur-sm rounded-2xl p-8 hover:bg-primary/20 transition-all duration-300 hover:scale-105 shadow-xl border border-white/10">
                            <div className="text-5xl mb-4">🔍</div>
                            <h3 className="font-bold text-2xl mb-3">Discover</h3>
                            <p className="text-base leading-relaxed">Find new movies based on ratings and genres</p>
                        </div>
                        <div className="bg-base-100/40 backdrop-blur-sm rounded-2xl p-8 hover:bg-primary/20 transition-all duration-300 hover:scale-105 shadow-xl border border-white/10">
                            <div className="text-5xl mb-4">⭐</div>
                            <h3 className="font-bold text-2xl mb-3">Rate</h3>
                            <p className="text-base leading-relaxed">Share your opinions and see what others think</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
